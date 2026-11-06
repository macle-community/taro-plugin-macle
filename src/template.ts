import { UnRecursiveTemplate } from '@tarojs/shared/dist/template'
import { toDashed } from '@tarojs/shared'
import type { IOptions } from './index'
import { mauiComponents } from './components'

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

    if (pluginOptions.maui !== false) {
      // Configure nestElements for MAUI components
      const containerComps = new Set([
        'maui-cell-group', 'maui-row', 'maui-col', 'maui-tabs', 'maui-tab',
        'maui-sidebar', 'maui-popup', 'maui-overlay', 'maui-dialog', 'maui-list'
      ])
      for (const key of Object.keys(mauiComponents)) {
        const dashed = toDashed(key)
        this.nestElements.set(dashed, containerComps.has(dashed) ? 3 : 2)
      }

      // Populate thirdPartyPatcher with MAUI component default prop values
      // This ensures attributes like direction="horizontal", active-color="#07c160",
      // active-icon="success-black" are generated with fallback expressions xs.b(...)
      // so unpassed props don't override component internal defaults with undefined.
      const patch: Record<string, Record<string, string>> = {}
      for (const [key, props] of Object.entries(mauiComponents)) {
        const dashedName = toDashed(key)
        const compPatch: Record<string, string> = {}
        for (const [propName, defaultVal] of Object.entries(props)) {
          if (defaultVal !== '' && defaultVal !== undefined && !propName.startsWith('bind')) {
            compPatch[toDashed(propName)] = defaultVal
          }
        }
        if (Object.keys(compPatch).length > 0) {
          patch[dashedName] = compPatch
        }
      }
      this.mergeThirdPartyComponents({
        ...this.thirdPartyPatcher,
        ...patch
      })

      // Override buildTemplate to ensure MAUI components are registered in thirdPartyComponents
      // and all standard components are included in base.maml
      const origBuildTemplate = this.buildTemplate
      this.buildTemplate = (compConfig: any) => {
        if (compConfig) {
          compConfig.includeAll = true
          if (this.pluginOptions.maui !== false && compConfig.thirdPartyComponents) {
            this.registerMauiComponents(compConfig.thirdPartyComponents)
          }
        }
        return origBuildTemplate.call(this, compConfig)
      }
    }
  }

  /**
   * Register MAUI components into Taro's thirdPartyComponents map
   * This automatically generates <template name="tmpl_0_maui-*"> and <template name="tmpl_1_maui-*">
   * with complete, uncompressed property bindings and event handlers in base.maml.
   */
  registerMauiComponents (thirdPartyComponents: Map<string, Set<string>>) {
    for (const [key, props] of Object.entries(mauiComponents)) {
      const dashedName = toDashed(key)
      let attrSet = thirdPartyComponents.get(dashedName)
      if (!attrSet) {
        attrSet = new Set<string>()
        thirdPartyComponents.set(dashedName, attrSet)
      }

      // Always include layout, style and standard click event triggers
      attrSet.add('class')
      attrSet.add('style')
      attrSet.add('bindtap')

      for (const propName of Object.keys(props)) {
        if (propName === 'id') continue
        if (propName.startsWith('bind')) {
          attrSet.add(propName.toLowerCase())
        } else {
          attrSet.add(toDashed(propName))
        }
      }
    }
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
    delete result['script']
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
