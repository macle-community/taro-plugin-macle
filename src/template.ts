import { UnRecursiveTemplate } from '@tarojs/shared/dist/template'
import type { IOptions } from './index'

export class Template extends UnRecursiveTemplate {
  pluginOptions: IOptions
  supportXS = true

  buildXsTemplate (filePath: string = './utils.sjs') {
    return `<sjs module="xs" src="${filePath}" />`
  }

  Adapter = {
    if: 'ma:if',
    else: 'ma:else',
    elseif: 'ma:elif',
    for: 'ma:for',
    forItem: 'ma:for-item',
    forIndex: 'ma:for-index',
    key: 'ma:key',
    xs: 'sjs',
    type: 'macle'
  }

  transferComponents: Record<string, Record<string, string>> = {}

  constructor (pluginOptions: IOptions = {}) {
    super()
    this.pluginOptions = pluginOptions
  }

  /**
   * Filter components that must not be in the template body,
   * e.g. page-meta must be rendered directly at the page root level
   */
  createMiniComponents (components: any): any {
    const result = super.createMiniComponents(components)
    if (result['page-meta']) {
      this.transferComponents['page-meta'] = result['page-meta']
      delete result['page-meta']
    }
    return result
  }

  /**
   * Replace/normalize property and event names for Macle templates
   */
  replacePropName (name: string, value: string, componentName: string, componentAlias: any) {
    if (value === 'eh') {
      const nameLowerCase = name.toLowerCase()
      if (nameLowerCase === 'bindlongtap') {
        return 'bindlongpress'
      }
      return nameLowerCase
    }
    return name
  }

  /**
   * Generate the page .maml file importing the base virtual DOM template
   */
  buildPageTemplate = (baseTempPath: string) => {
    return `<import src="${baseTempPath}"/>\n<template is="taro_tmpl" data="{{${this.dataKeymap('root:root')}}}" />\n`
  }
}
