import { mergeReconciler, mergeInternalComponents } from '@tarojs/shared'
import { components } from './components'
import { hostConfig } from './runtime-utils'

declare const ma: any
declare const window: any

// Ensure global ma object is consistently accessible in service layer environment
if (typeof window !== 'undefined') {
  if (!window.ma && typeof ma !== 'undefined') {
    window.ma = ma
  }
} else if (typeof globalThis !== 'undefined') {
  if (!(globalThis as any).ma && typeof ma !== 'undefined') {
    (globalThis as any).ma = ma
  }
}

// Ensure custom components delegate 'eh' events to current page's Taro eventHandler
const globalScope = typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : (typeof global !== 'undefined' ? global : {}))
if (typeof (globalScope as any).Component === 'function') {
  const origComponent = (globalScope as any).Component
  ;(globalScope as any).Component = function (options: any) {
    options = options || {}
    options.methods = options.methods || {}
    if (!options.methods.eh) {
      options.methods.eh = function (event: any) {
        if (typeof (globalScope as any).getCurrentPages === 'function') {
          const pages = (globalScope as any).getCurrentPages()
          const page = pages[pages.length - 1]
          if (page && typeof page.eh === 'function') {
            return page.eh(event)
          }
        }
      }
    }
    return origComponent(options)
  }
}

// Register Macle custom reconciler hostConfig
mergeReconciler(hostConfig)

// Register Macle native internal components
mergeInternalComponents(components)

export { hostConfig }

