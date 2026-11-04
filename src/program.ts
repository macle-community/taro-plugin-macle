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
        this.modifyWebpackConfig(styleExt)
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
  modifyWebpackConfig (styleExt: string) {
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
    })
  }
}

