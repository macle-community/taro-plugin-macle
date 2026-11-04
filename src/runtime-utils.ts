import { toCamelCase } from '@tarojs/shared'
import { initNativeApi } from './apis'

declare const getCurrentPages: any

export const hostConfig = {
  initNativeApi,
  getMiniLifecycle (config: any) {
    const methods = config.page[5]
    if (methods && methods.indexOf('onSaveExitState') === -1) {
      methods.push('onSaveExitState')
    }
    return config
  },
  transferHydrateData (data: any, element: any, componentsAlias: any) {
    if (element.isTransferElement && typeof getCurrentPages === 'function') {
      const pages = getCurrentPages()
      const page = pages[pages.length - 1]
      if (page && typeof page.setData === 'function') {
        data['nn'] = element.dataName
        page.setData({
          [toCamelCase(data.nn)]: data
        })
        return {
          sid: element.sid,
          v: '',
          nn: componentsAlias['#text']?._num || '8'
        }
      }
    }
  }
}

