import * as fs from 'fs'
import * as path from 'path'
import { TaroPlatformBase } from '@tarojs/service'
import type { IPluginContext } from '@tarojs/service'
import { Template } from './template'
import { components } from './components'
import type { IOptions, IMauiOptions } from './index'

const PACKAGE_NAME = '@tarojs/plugin-platform-macle'

/**
 * Searches for the official MAUI component dist directory
 */
function findMauiSourceDir (customDir?: string): string | null {
  if (customDir && fs.existsSync(customDir)) return customDir

  const cwd = process.cwd()
  const candidates = [
    path.resolve(__dirname, '../../DevToolkit_25.9.0/Macle_25.9.0_DevSuite_UI/dist'),
    path.resolve(__dirname, '../DevToolkit_25.9.0/Macle_25.9.0_DevSuite_UI/dist'),
    path.resolve(__dirname, '../../../DevToolkit_25.9.0/Macle_25.9.0_DevSuite_UI/dist'),
    path.resolve(cwd, '../DevToolkit_25.9.0/Macle_25.9.0_DevSuite_UI/dist'),
    path.resolve(cwd, '../../DevToolkit_25.9.0/Macle_25.9.0_DevSuite_UI/dist'),
    path.resolve(cwd, 'DevToolkit_25.9.0/Macle_25.9.0_DevSuite_UI/dist'),
    path.resolve(cwd, 'node_modules/@macle/maui-ui/dist')
  ]

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate
  }
  return null
}

/**
 * Generates the usingComponents mapping for all MAUI components
 */
export function getMauiUsingComponents (targetSubdir: string = 'maui-components'): Record<string, string> {
  const compNames = [
    'button', 'cell', 'cell-group', 'checkbox', 'checkbox-group',
    'col', 'row', 'dialog', 'divider', 'empty', 'field', 'icon',
    'image', 'loading', 'overlay', 'popup', 'progress', 'radio',
    'radio-group', 'sidebar', 'sidebar-item', 'slider', 'stepper',
    'steps', 'sticky', 'switch', 'tab', 'tabs', 'tag', 'title-bar',
    'toast'
  ]
  const map: Record<string, string> = {}
  for (const name of compNames) {
    map[`maui-${name}`] = `/${targetSubdir}/${name}/index`
  }
  return map
}

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

    // MAUI config hook: auto-inject usingComponents in modifyMiniConfigs
    const isMauiEnabled = pluginOptions.maui !== false
    const mauiOptions: IMauiOptions = typeof pluginOptions.maui === 'object' ? pluginOptions.maui : {}
    const targetDir = mauiOptions.targetDir || 'maui-components'

    if (isMauiEnabled && mauiOptions.autoInjectComponents !== false) {
      const origModifyMiniConfigs = this.config.modifyMiniConfigs
      this.config.modifyMiniConfigs = async (configMap: any) => {
        if (typeof origModifyMiniConfigs === 'function') {
          await origModifyMiniConfigs(configMap)
        }
        const appConfig = configMap && (configMap['app'] || configMap['app.json'])
        if (appConfig && appConfig.content) {
          appConfig.content.usingComponents = {
            ...getMauiUsingComponents(targetDir),
            ...(appConfig.content.usingComponents || {})
          }
        }
      }
    }

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

      // MAUI UI Component Library integration
      const isMauiEnabled = pluginOptions.maui !== false
      if (isMauiEnabled) {
        this.setupMauiComponents(chain, pluginOptions)
      }
    })
  }

  /**
   * Configure Webpack plugin to bundle MAUI component assets and inject usingComponents
   */
  private setupMauiComponents (chain: any, pluginOptions: IOptions) {
    const mauiOptions: IMauiOptions = typeof pluginOptions.maui === 'object' ? pluginOptions.maui : {}
    const targetDir = mauiOptions.targetDir || 'maui-components'
    const autoCopy = mauiOptions.autoCopy !== false
    const autoInject = mauiOptions.autoInjectComponents !== false
    const sourceDir = findMauiSourceDir(mauiOptions.sourceDir)

    chain.plugin('MacleMauiPlugin').use({
      apply: (compiler: any) => {
        // Hook compilation to inject usingComponents into app.json asset
        if (autoInject) {
          compiler.hooks.compilation.tap('MacleMauiPlugin', (compilation: any) => {
            const hook = compilation.hooks.processAssets
            if (hook) {
              hook.tap(
                {
                  name: 'MacleMauiPlugin',
                  stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL
                },
                () => {
                  this.injectMauiUsingComponents(compilation, compiler, targetDir)
                }
              )
            }
          })
        }

        // Hook afterEmit to copy MAUI component files to output directory
        if (autoCopy) {
          compiler.hooks.afterEmit.tapAsync('MacleMauiPlugin', (_compilation: any, callback: () => void) => {
            try {
              const outPath = compiler.options.output.path || path.resolve(process.cwd(), 'dist')
              this.syncMauiComponentsToDisk(outPath, targetDir, sourceDir)
            } catch (err: any) {
              console.warn('[\x1b[33mplugin-platform-macle\x1b[0m] Error syncing MAUI components:', err.message)
            }
            callback()
          })
        }
      }
    })
  }

  private injectMauiUsingComponents (compilation: any, compiler: any, targetDir: string) {
    const usingComponents = getMauiUsingComponents(targetDir)
    for (const filename of ['app.json', 'app-config.json']) {
      const asset = compilation.assets[filename]
      if (asset) {
        try {
          const raw = asset.source().toString()
          const json = JSON.parse(raw)
          json.usingComponents = {
            ...usingComponents,
            ...(json.usingComponents || {})
          }
          const updated = JSON.stringify(json, null, 2)
          compilation.updateAsset(filename, new compiler.webpack.sources.RawSource(updated))
        } catch (e) {
          // Ignore parse errors on partial writes
        }
      }
    }
  }

  private syncMauiComponentsToDisk (outPath: string, targetDir: string, sourceDir: string | null) {
    if (!sourceDir || !fs.existsSync(sourceDir)) {
      console.warn('[\x1b[33mplugin-platform-macle\x1b[0m] MAUI components directory not found. Please provide maui.sourceDir in plugin options.')
      return
    }

    const destDir = path.join(outPath, targetDir)
    fs.mkdirSync(destDir, { recursive: true })
    fs.cpSync(sourceDir, destDir, { recursive: true })

    // Also ensure disk app.json has usingComponents in case it was written earlier
    const usingComponents = getMauiUsingComponents(targetDir)
    const diskAppJson = path.join(outPath, 'app.json')
    if (fs.existsSync(diskAppJson)) {
      try {
        const json = JSON.parse(fs.readFileSync(diskAppJson, 'utf-8'))
        json.usingComponents = {
          ...usingComponents,
          ...(json.usingComponents || {})
        }
        fs.writeFileSync(diskAppJson, JSON.stringify(json, null, 2))
      } catch (e) {}
    }

    console.log(`[\x1b[32mplugin-platform-macle\x1b[0m] MAUI component library active: 31 native components available at /${targetDir}`)
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
