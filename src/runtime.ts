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

// Register Macle custom reconciler hostConfig
mergeReconciler(hostConfig)

// Register Macle native internal components
mergeInternalComponents(components)

export { hostConfig }

