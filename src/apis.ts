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

  // 1. Create a safe wrapper proxy for Taro's processApis:
  // Macle's service.js exposes window.ma as a Proxy where hasOwnProperty() returns false for all APIs.
  // Taro's processApis checks hasOwnProperty before invoking, which causes "小程序暂不支持 <api>".
  // This wrapper intercepts hasOwnProperty so all valid Macle APIs pass through without modifying window.ma.
  const maWrapper = new Proxy(globalMa, {
    get (target, prop, receiver) {
      if (prop === 'hasOwnProperty') {
        return (key: string) => {
          return Boolean(
            needPromiseApis.has(key) ||
            syncApis.has(key) ||
            creatorApis.has(key) ||
            eventApis.has(key) ||
            macleSpecificApis.has(key) ||
            (typeof key === 'string' && key in target)
          )
        }
      }
      return target[prop]
    }
  })

  // 2. Process standard Taro APIs through @tarojs/shared with maWrapper
  processApis(taro, maWrapper, {
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

  // 3. Navigation APIs (guarantees URL normalization, Promise return, and call-time dispatch)
  const navApis = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']
  navApis.forEach(api => {
    taro[api] = (options: any = {}) => {
      const transformed = options && typeof options.url === 'string'
        ? { ...options, url: normalizeUrl(options.url) }
        : options
      const m = getMacleGlobal()
      if (typeof m[api] === 'function') {
        return promisifyApi(m[api], m)(transformed)
      }
      return Promise.reject(new Error(`ma.${api} is not available.`))
    }
  })

  taro.navigateBack = (options: any = {}) => {
    const m = getMacleGlobal()
    if (typeof m.navigateBack === 'function') {
      return promisifyApi(m.navigateBack, m)(options)
    }
    return Promise.reject(new Error('ma.navigateBack is not available.'))
  }

  // 4. Payment APIs (tradePay for Ethio Telecom, startPay for KBZ/partner)
  taro.tradePay = (options: any = {}) => {
    const opts = {
      tradeNO: options.tradeNO || options.tradeNo || 'mock_trade_' + Date.now(),
      sign: options.sign || 'mock_sign',
      orderStr: options.orderStr || 'mock_order',
      extendParam: options.extendParam || '',
      ...options
    }
    const m = getMacleGlobal()
    if (typeof m.tradePay === 'function') {
      return promisifyApi(m.tradePay, m)(opts)
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
    const m = getMacleGlobal()
    if (typeof m.startPay === 'function') {
      return promisifyApi(m.startPay, m)(opts)
    }
    return Promise.reject(new Error('ma.startPay is not available in current environment.'))
  }

  // 5. Context & Manager Factory Bindings (dispatched at invocation time)
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
    taro[api] = (...args: any[]) => {
      const m = getMacleGlobal()
      if (typeof m[api] === 'function') {
        return m[api](...args)
      }
    }
  })

  // 6. Synchronous APIs (direct pass-through at invocation time)
  syncApis.forEach(api => {
    taro[api] = (...args: any[]) => {
      const m = getMacleGlobal()
      if (typeof m[api] === 'function') {
        return m[api](...args)
      }
    }
  })

  // 7. Event Listeners (on* / off*)
  eventApis.forEach(api => {
    taro[api] = (...args: any[]) => {
      const m = getMacleGlobal()
      if (typeof m[api] === 'function') {
        return m[api](...args)
      }
    }
  })

  // 8. Macle-specific APIs
  macleSpecificApis.forEach(api => {
    if (!taro[api]) {
      taro[api] = (options: any = {}, ...args: any[]) => {
        const m = getMacleGlobal()
        if (typeof m[api] === 'function') {
          if (needPromiseApis.has(api)) {
            return promisifyApi(m[api], m)(options, ...args)
          }
          return m[api](options, ...args)
        }
        return Promise.reject(new Error(`ma.${api} is not available.`))
      }
    }
  })

  // 9. Sub-namespaces
  if (globalMa.miniProgram) {
    taro.miniProgram = globalMa.miniProgram
  } else {
    taro.miniProgram = {
      postMessage: (data: any) => {
        const m = getMacleGlobal()
        return m.postMessage ? m.postMessage(data) : undefined
      },
      close: () => {
        const m = getMacleGlobal()
        return m.exitMiniProgram ? m.exitMiniProgram() : undefined
      },
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

  // 10. Dynamic Fallback Proxy via Prototype Chain
  // Catches ANY dynamic ma.* API at call time
  if (typeof Proxy !== 'undefined') {
    const fallbackProxy = new Proxy({}, {
      get (_, prop: string | symbol) {
        if (typeof prop === 'string') {
          const m = getMacleGlobal()
          if (typeof m[prop] === 'function') {
            if (needPromiseApis.has(prop)) {
              return (options: any = {}, ...args: any[]) => promisifyApi(m[prop], m)(options, ...args)
            }
            return (...args: any[]) => m[prop](...args)
          }
          if (typeof m[prop] !== 'undefined') {
            return m[prop]
          }
        }
        return undefined
      }
    })
    try {
      Object.setPrototypeOf(taro, fallbackProxy)
    } catch {
      // Fallback
    }
  }

  // 11. Expose Taro and ensure ma is available on window and globalThis
  if (typeof window !== 'undefined') {
    window.Taro = taro
    if (typeof window.ma === 'undefined' && typeof ma !== 'undefined') {
      window.ma = ma
    }
  }
  if (typeof globalThis !== 'undefined') {
    (globalThis as any).Taro = taro
    if (typeof (globalThis as any).ma === 'undefined' && typeof ma !== 'undefined') {
      (globalThis as any).ma = ma
    }
  }

  return taro
}
