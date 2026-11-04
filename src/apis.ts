import { processApis } from '@tarojs/shared'
import { needPromiseApis } from './apis-list'

declare const ma: any
declare const window: any

function getMacleGlobal () {
  if (typeof ma !== 'undefined') {
    return ma
  }
  if (typeof window !== 'undefined' && window.ma) {
    return window.ma
  }
  return {}
}

/**
 * Initializes and binds native Macle APIs (ma.*) onto Taro object.
 */
export function initNativeApi (taro: any) {
  const globalMa = getMacleGlobal()

  // Wrap globalMa with a Proxy so that missing APIs warn instead of hard crashing
  const safeMa = typeof Proxy !== 'undefined'
    ? new Proxy(globalMa, {
      get (target, prop: string) {
        if (prop in target) {
          const val = target[prop]
          return typeof val === 'function' ? val.bind(target) : val
        }
        return (...args: any[]) => {
          console.warn(`[Macle Plugin] Taro.${prop} is not implemented in Macle Mini Program runtime.`)
          const lastArg = args[args.length - 1]
          if (lastArg && typeof lastArg === 'object') {
            if (typeof lastArg.fail === 'function') {
              lastArg.fail({ errMsg: `${prop}:fail not supported` })
            }
            if (typeof lastArg.complete === 'function') {
              lastArg.complete({ errMsg: `${prop}:fail not supported` })
            }
          }
          return Promise.reject(new Error(`${prop}: not supported on Macle platform`))
        }
      }
    })
    : globalMa

  processApis(taro, safeMa, {
    needPromiseApis,
    transformMeta (api: string, options: any) {
      // Custom parameter mappings if needed
      return {
        key: api,
        options
      }
    }
  })

  // Bind Macle-specific APIs
  if (typeof globalMa.tradePay === 'function') {
    taro.tradePay = globalMa.tradePay.bind(globalMa)
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

  // MiniProgram navigation helpers (if present in ma.miniProgram)
  if (globalMa.miniProgram) {
    taro.miniProgram = globalMa.miniProgram
  }

  taro.getRenderer = function () {
    return 'webview'
  }
}

