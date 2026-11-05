import { processApis } from '@tarojs/shared'
import {
  needPromiseApis,
  syncApis,
  creatorApis,
  eventApis,
  macleSpecificApis
} from './apis-list'

declare const ma: any
declare const window: any
declare const globalThis: any

/**
 * Safely resolves the runtime Macle global object (ma / window.ma / globalThis.ma)
 */
export function getMacleGlobal (): any {
  if (typeof ma !== 'undefined') {
    return ma
  }
  if (typeof window !== 'undefined' && window.ma) {
    return window.ma
  }
  if (typeof globalThis !== 'undefined' && (globalThis as any).ma) {
    return (globalThis as any).ma
  }
  return {}
}

/**
 * Normalizes navigation URL by stripping any redundant .html extension.
 * Macle framework internal router automatically resolves page routes to .html.
 */
export function normalizeUrl (url: string): string {
  if (!url || typeof url !== 'string') return url
  const [path, query] = url.split('?')
  const cleanPath = path.replace(/(\.html)+$/i, '')
  return query ? `${cleanPath}?${query}` : cleanPath
}

/**
 * Wraps a callback-based API into a Promise while preserving explicit callbacks if supplied.
 */
export function promisifyApi (fn: (...args: any[]) => any, context: any) {
  return (options: any = {}, ...args: any[]) => {
    return new Promise((resolve, reject) => {
      const opts = Object.assign({}, options)
      const originSuccess = opts.success
      const originFail = opts.fail
      const originComplete = opts.complete

      opts.success = (res: any) => {
        originSuccess?.(res)
        resolve(res)
      }
      opts.fail = (err: any) => {
        originFail?.(err)
        reject(err)
      }
      opts.complete = (res: any) => {
        originComplete?.(res)
      }

      try {
        fn.call(context, opts, ...args)
      } catch (e) {
        originFail?.(e)
        reject(e)
      }
    })
  }
}

/**
 * Initializes and binds all native Macle APIs (ma.*) onto Taro object.
 */
export function initNativeApi (taro: any) {
  const globalMa = getMacleGlobal()

  // Dynamically auto-register any existing runtime functions on globalMa
  for (const key in globalMa) {
    if (
      typeof globalMa[key] === 'function' &&
      !syncApis.has(key) &&
      !creatorApis.has(key) &&
      !eventApis.has(key) &&
      !key.startsWith('on') &&
      !key.startsWith('off') &&
      !key.endsWith('Sync')
    ) {
      needPromiseApis.add(key)
    }
  }

  // 1. Process standard Taro APIs through @tarojs/shared
  processApis(taro, globalMa, {
    needPromiseApis,
    modifyApis (apis: Set<string>) {
      needPromiseApis.forEach(api => apis.add(api))
      macleSpecificApis.forEach(api => apis.add(api))
    },
    transformMeta (api: string, options: any) {
      let key = api
      let opts = options

      // Route parameter normalization
      if (['navigateTo', 'redirectTo', 'reLaunch', 'switchTab'].includes(api) && opts && typeof opts.url === 'string') {
        opts = {
          ...opts,
          url: normalizeUrl(opts.url)
        }
      }

      // TradePay parameter compatibility
      if (api === 'tradePay' && opts) {
        opts = {
          tradeNO: opts.tradeNO || opts.tradeNo || 'mock_trade_' + Date.now(),
          sign: opts.sign || 'mock_sign',
          orderStr: opts.orderStr || 'mock_order',
          extendParam: opts.extendParam || '',
          ...opts
        }
      }

      // StartPay parameter compatibility
      if (api === 'startPay' && opts) {
        opts = {
          prepayId: opts.prepayId || opts.tradeNO || 'mock_prepay_' + Date.now(),
          orderInfo: opts.orderInfo || opts.orderStr || 'mock_order',
          sign: opts.sign || 'mock_sign',
          amount: opts.amount || '0.01',
          ...opts
        }
      }

      return {
        key,
        options: opts
      }
    }
  })

  // 2. Navigation APIs (guarantees URL normalization and Promise return)
  const navApis = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']
  navApis.forEach(api => {
    taro[api] = (options: any = {}) => {
      const transformed = options && typeof options.url === 'string'
        ? { ...options, url: normalizeUrl(options.url) }
        : options
      if (typeof globalMa[api] === 'function') {
        return promisifyApi(globalMa[api], globalMa)(transformed)
      }
      return Promise.reject(new Error(`ma.${api} is not available.`))
    }
  })

  taro.navigateBack = (options: any = {}) => {
    if (typeof globalMa.navigateBack === 'function') {
      return promisifyApi(globalMa.navigateBack, globalMa)(options)
    }
    return Promise.reject(new Error('ma.navigateBack is not available.'))
  }

  // 3. Payment APIs (tradePay for Ethio Telecom, startPay for KBZ/partner)
  taro.tradePay = (options: any = {}) => {
    const opts = {
      tradeNO: options.tradeNO || options.tradeNo || 'mock_trade_' + Date.now(),
      sign: options.sign || 'mock_sign',
      orderStr: options.orderStr || 'mock_order',
      extendParam: options.extendParam || '',
      ...options
    }
    if (typeof globalMa.tradePay === 'function') {
      return promisifyApi(globalMa.tradePay, globalMa)(opts)
    }
    return Promise.reject(new Error('ma.tradePay is not available in current environment.'))
  }

  taro.startPay = (options: any = {}) => {
    const opts = {
      prepayId: options.prepayId || options.tradeNO || 'mock_prepay_' + Date.now(),
      orderInfo: options.orderInfo || options.orderStr || 'mock_order',
      sign: options.sign || 'mock_sign',
      amount: options.amount || '0.01',
      ...options
    }
    if (typeof globalMa.startPay === 'function') {
      return promisifyApi(globalMa.startPay, globalMa)(opts)
    }
    return Promise.reject(new Error('ma.startPay is not available in current environment.'))
  }

  // 4. Context & Manager Factory Bindings (bound to globalMa)
  const contextFactories = [
    'createSelectorQuery',
    'createAudioContext',
    'createVideoContext',
    'createCameraContext',
    'createMapContext',
    'createWebviewContext',
    'getFileSystemManager',
    'getRecorderManager',
    'getUpdateManager'
  ]
  contextFactories.forEach(api => {
    if (typeof globalMa[api] === 'function') {
      taro[api] = globalMa[api].bind(globalMa)
    }
  })

  // 5. Synchronous APIs (direct pass-through)
  syncApis.forEach(api => {
    if (typeof globalMa[api] === 'function') {
      taro[api] = globalMa[api].bind(globalMa)
    }
  })

  // 6. Event Listeners (on* / off*)
  eventApis.forEach(api => {
    if (typeof globalMa[api] === 'function') {
      taro[api] = globalMa[api].bind(globalMa)
    }
  })

  // 7. Macle-specific APIs
  macleSpecificApis.forEach(api => {
    if (typeof globalMa[api] === 'function' && !taro[api]) {
      if (needPromiseApis.has(api)) {
        taro[api] = promisifyApi(globalMa[api], globalMa)
      } else {
        taro[api] = globalMa[api].bind(globalMa)
      }
    }
  })

  // 8. Sub-namespaces
  if (globalMa.miniProgram) {
    taro.miniProgram = globalMa.miniProgram
  } else {
    taro.miniProgram = {
      postMessage: (data: any) => globalMa.postMessage ? globalMa.postMessage(data) : undefined,
      close: () => globalMa.exitMiniProgram ? globalMa.exitMiniProgram() : undefined,
      getEnv: (cb: (res: { miniprogram: boolean }) => void) => cb ? cb({ miniprogram: true }) : undefined
    }
  }

  taro.env = {
    ...(taro.env || {}),
    ...(globalMa.env || {}),
    USER_DATA_PATH: (globalMa.env && globalMa.env.USER_DATA_PATH) || 'mafile://usr'
  }

  taro.getRenderer = function () {
    return 'webview'
  }

  // 9. Dynamic Fallback Proxy via Prototype Chain
  // Automatically catches ANY ma.* API present on globalMa that may not be explicitly listed
  if (typeof Proxy !== 'undefined') {
    const fallbackProxy = new Proxy({}, {
      get (_, prop: string | symbol) {
        if (typeof prop === 'string' && typeof globalMa[prop] !== 'undefined') {
          const val = globalMa[prop]
          if (typeof val === 'function') {
            if (needPromiseApis.has(prop)) {
              return promisifyApi(val, globalMa)
            }
            return val.bind(globalMa)
          }
          return val
        }
        return undefined
      }
    })
    try {
      Object.setPrototypeOf(taro, fallbackProxy)
    } catch {
      // Fallback if prototype modification is restricted
    }
  }

  // 10. Global Expose in window & globalThis
  if (typeof window !== 'undefined') {
    window.Taro = taro
    if (!window.ma && Object.keys(globalMa).length > 0) {
      window.ma = globalMa
    }
  }
  if (typeof globalThis !== 'undefined') {
    (globalThis as any).Taro = taro
    if (!(globalThis as any).ma && Object.keys(globalMa).length > 0) {
      (globalThis as any).ma = globalMa
    }
  }

  return taro
}
