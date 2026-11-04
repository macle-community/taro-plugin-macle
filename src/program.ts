import * as fs from 'fs'
import * as path from 'path'
import { TaroPlatformBase } from '@tarojs/service'
import type { IPluginContext } from '@tarojs/service'
import { Template } from './template'
import { components } from './components'
import type { IOptions } from './index'

const PACKAGE_NAME = '@tarojs/plugin-platform-macle'

export class Macle extends TaroPlatformBase {
  platform = 'macle'
  globalObject = 'ma'
  projectConfigJson: string
  runtimePath: string
  taroComponentsPath: string
  fileType: {
    templ: string
    style: string
    config: string
    script: string
    xs: string
  }
  template: Template

  constructor (ctx: IPluginContext, config: any, pluginOptions: IOptions = {}) {
    super(ctx, config)
    this.projectConfigJson = this.config.projectConfigName || 'project.config.json'
    this.runtimePath = `${PACKAGE_NAME}/dist/runtime`
    this.taroComponentsPath = `${PACKAGE_NAME}/dist/components-react`

    const styleExt = pluginOptions.styleExtension || '.mass'

    this.fileType = {
      templ: '.maml',
      style: styleExt,
      config: '.json',
      script: '.js',
      xs: '.sjs'
    }

    this.template = new Template(pluginOptions)

    this.setupTransaction.addWrapper({
      close: () => {
        this.modifyTemplate(pluginOptions)
        this.modifyWebpackConfig(styleExt, pluginOptions)
      }
    })
  }

  /**
   * Register Macle components and void/focus elements
   */
  modifyTemplate (pluginOptions: IOptions) {
    const template = this.template
    template.mergeComponents(this.ctx, components)
    template.voidElements.add('native-slot')

    if (pluginOptions.enablekeyboardAccessory) {
      template.voidElements.delete('input')
      template.voidElements.delete('textarea')
    }
  }

  /**
   * Configure Webpack to output Macle .macss/.maml and handle paths
   */
  modifyWebpackConfig (styleExt: string, pluginOptions: IOptions) {
    this.ctx.modifyWebpackChain(({ chain }: { chain: any }) => {
      // Improve sourcemap paths inside Macle Simulator/IDE
      chain.output.devtoolModuleFilenameTemplate((info: any) => {
        const resourcePath = info.resourcePath.replace(/[/\\]/g, '_')
        return `webpack://${info.namespace}/${resourcePath}`
      })

      // Configure MiniCssExtractPlugin to output .macss (or .mass)
      if (chain.plugins.has('miniCssExtractPlugin')) {
        chain.plugin('miniCssExtractPlugin').tap((args: any[]) => {
          if (args && args[0]) {
            args[0].filename = `[name]${styleExt}`
            args[0].chunkFilename = `[name]${styleExt}`
          }
          return args
        })
      }

      // Add Macle stylesheet extensions to Webpack resolution
      chain.resolve.extensions.prepend(styleExt)
      if (styleExt !== '.mass') {
        chain.resolve.extensions.prepend('.mass')
      }

      // Avoid circular self-reference in @tarojs/runtime (raf.ts checking requestAnimationFrame)
      if (chain.plugins.has('providerPlugin')) {
        chain.plugin('providerPlugin').tap((args: any[]) => {
          if (args && args[0]) {
            delete args[0].requestAnimationFrame
            delete args[0].cancelAnimationFrame
          }
          return args
        })
      }

      // Tailwind CSS support for Macle
      const shouldEnableTailwind = pluginOptions.tailwindcss !== false && (
        Boolean(pluginOptions.tailwindcss) ||
        this.detectTailwindInProject()
      )

      if (shouldEnableTailwind) {
        this.setupTailwindcss(chain, pluginOptions)
      }
    })
  }

  /**
   * Detect if project contains a Tailwind CSS configuration file
   */
  private detectTailwindInProject (): boolean {
    const cwd = process.cwd()
    const configNames = [
      'tailwind.config.js',
      'tailwind.config.ts',
      'tailwind.config.cjs',
      'tailwind.config.mjs'
    ]
    return configNames.some((file) => fs.existsSync(path.resolve(cwd, file)))
  }

  /**
   * Configure UnifiedWebpackPluginV5 with Macle template & stylesheet matchers
   */
  private setupTailwindcss (chain: any, pluginOptions: IOptions) {
    try {
      const cwd = process.cwd()
      const resolved = require.resolve('weapp-tailwindcss/webpack', { paths: [cwd, __dirname] })
      const { UnifiedWebpackPluginV5 } = require(resolved)
      const twOptions = typeof pluginOptions.tailwindcss === 'object' ? pluginOptions.tailwindcss : {}

      const defaultOptions = {
        appType: 'taro',
        rem2rpx: true,
        cssMatcher: (file: string) => /\.(mass|macss|wxss|acss|css)$/.test(file),
        htmlMatcher: (file: string) => /\.(maml|wxml|axml|html)$/.test(file),
        jsMatcher: (file: string) => /\.[jt]sx?$/.test(file) && !file.includes('node_modules')
      }

      if (chain.plugins.has('UnifiedWebpackPluginV5')) {
        chain.plugin('UnifiedWebpackPluginV5').tap(([existingOptions = {}]: [any]) => [
          {
            ...defaultOptions,
            ...existingOptions
          }
        ])
      } else {
        chain.plugin('UnifiedWebpackPluginV5').use(UnifiedWebpackPluginV5, [
          {
            ...defaultOptions,
            ...twOptions
          }
        ])
      }
      console.log('[\x1b[36mplugin-platform-macle\x1b[0m] Tailwind CSS support enabled (weapp-tailwindcss Webpack 5 plugin registered with .mass/.maml matchers)')
    } catch (err: any) {
      if (pluginOptions.tailwindcss) {
        console.warn('[\x1b[33mplugin-platform-macle\x1b[0m] Tailwind CSS enabled but weapp-tailwindcss could not be loaded:', err.message)
      }
    }
  }
}
