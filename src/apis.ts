import { processApis } from '@tarojs/shared'
import { needPromiseApis } from './apis-list'

declare const ma: any
declare const window: any

function getMacleGlobal (): any {
  if (typeof ma !== 'undefined') {
    return ma
  }
  if (typeof window !== 'undefined' && window.ma) {
    return window.ma
  }
  return {}
}

/**
 * Normalizes navigation URL by stripping any redundant .html extension.
 * Macle framework's internal routing (Pe / O functions in service.js) automatically
 * appends .html during route resolution.
 */
function normalizeUrl (url: string): string {
  if (!url || typeof url !== 'string') return url
  const [path, query] = url.split('?')
  const cleanPath = path.replace(/(\.html)+$/i, '')
  return query ? `${cleanPath}?${query}` : cleanPath
}

/**
 * Normalizes callback invocation into a Promise and invokes callbacks if provided
 */
function promisifyApi (fn: (...args: any[]) => any, context: any) {
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
 * Initializes and binds native Macle APIs (ma.*) onto Taro object.
 */
export function initNativeApi (taro: any) {
  const globalMa = getMacleGlobal()

  // 1. Process standard Taro APIs through @tarojs/shared
  processApis(taro, globalMa, {
    needPromiseApis,
    modifyApis (apis: Set<string>) {
      needPromiseApis.forEach(api => apis.add(api))
    },
    transformMeta (api: string, options: any) {
      let key = api
      let opts = options
      if (['navigateTo', 'redirectTo', 'reLaunch', 'switchTab'].includes(api) && opts && typeof opts.url === 'string') {
        opts = {
          ...opts,
          url: normalizeUrl(opts.url)
        }
      }
      if (api === 'tradePay' && opts) {
        opts = {
          tradeNO: opts.tradeNO || opts.tradeNo || 'mock_trade_' + Date.now(),
          sign: opts.sign || 'mock_sign',
          orderStr: opts.orderStr || 'mock_order',
          extendParam: opts.extendParam || '',
          ...opts
        }
      }
      return {
        key,
        options: opts
      }
    }
  })

  // 2. Direct bindings for Navigation APIs (guarantees URL normalization & Promise support)
  const navApis = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']
  navApis.forEach(api => {
    taro[api] = (options: any = {}) => {
      const transformed = options && typeof options.url === 'string'
        ? { ...options, url: normalizeUrl(options.url) }
        : options
      if (typeof globalMa[api] === 'function') {
        return promisifyApi(globalMa[api], globalMa)(transformed)
      }
      console.warn(`[Macle Plugin] ma.${api} is not available.`)
      return Promise.reject(new Error(`ma.${api} is not available.`))
    }
  })

  taro.navigateBack = (options: any = {}) => {
    if (typeof globalMa.navigateBack === 'function') {
      return promisifyApi(globalMa.navigateBack, globalMa)(options)
    }
    return Promise.reject(new Error('ma.navigateBack is not available.'))
  }

  // 3. Direct bindings for UI Feedback APIs
  const uiApis = ['showToast', 'hideToast', 'showModal', 'showLoading', 'hideLoading']
  uiApis.forEach(api => {
    if (typeof globalMa[api] === 'function') {
      taro[api] = promisifyApi(globalMa[api], globalMa)
    }
  })

  // 4. Direct bindings for System Info APIs
  if (typeof globalMa.getSystemInfo === 'function') {
    taro.getSystemInfo = promisifyApi(globalMa.getSystemInfo, globalMa)
  }
  if (typeof globalMa.getSystemInfoSync === 'function') {
    taro.getSystemInfoSync = () => globalMa.getSystemInfoSync()
  }

  // 5. Direct binding for Macle-specific APIs
  if (typeof globalMa.tradePay === 'function') {
    taro.tradePay = (options: any = {}) => {
      const opts = {
        tradeNO: options.tradeNO || options.tradeNo || 'mock_trade_' + Date.now(),
        sign: options.sign || 'mock_sign',
        orderStr: options.orderStr || 'mock_order',
        extendParam: options.extendParam || '',
        ...options
      }
      return promisifyApi(globalMa.tradePay, globalMa)(opts)
    }
  }

  if (typeof globalMa.gotoBrowser === 'function') {
    taro.gotoBrowser = globalMa.gotoBrowser.bind(globalMa)
  }
  if (typeof globalMa.saveFileToPhone === 'function') {
    taro.saveFileToPhone = globalMa.saveFileToPhone.bind(globalMa)
  }
  if (typeof globalMa.capsuleStyle === 'function') {
    taro.capsuleStyle = globalMa.capsuleStyle.bind(globalMa)
  }

  if (globalMa.miniProgram) {
    taro.miniProgram = globalMa.miniProgram
  }

  taro.getRenderer = function () {
    return 'webview'
  }

  // Universal export for service window
  if (typeof window !== 'undefined') {
    window.Taro = taro
  }
}
