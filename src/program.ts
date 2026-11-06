import * as fs from 'fs'
import * as path from 'path'
import { TaroPlatformBase } from '@tarojs/service'
import type { IPluginContext } from '@tarojs/service'
import { Template } from './template'
import { components } from './components'
import type { IOptions, IMauiOptions } from './index'

const PACKAGE_NAME = '@tarojs/plugin-platform-macle'

const PAGE_META = `<page-meta
background-color-bottom="{{pageMeta.backgroundColorBottom}}"
background-color-top="{{pageMeta.backgroundColorTop}}"
background-color="{{pageMeta.backgroundColor}}"
background-text-style="{{pageMeta.backgroundTextStyle}}"
page-font-size="{{pageMeta.pageFontSize}}"
page-orientation="{{pageMeta.pageOrientation}}"
page-style="{{pageMeta.pageStyle}}"
root-background-color="{{pageMeta.rootBackgroundColor}}"
root-font-size="{{pageMeta.rootFontSize}}"
scroll-duration="{{pageMeta.scrollDuration}}"
scroll-top="{{pageMeta.scrollTop}}"
>
    <navigation-bar
        background-color="{{navigationBar.backgroundColor}}"
        color-animation-duration="{{navigationBar.colorAnimationDuration}}"
        color-animation-timing-func="{{navigationBar.colorAnimationTimingFunc}}"
        front-color="{{navigationBar.frontColor}}"
        loading="{{navigationBar.loading}}"
        title="{{navigationBar.title}}"
    />
</page-meta>`

/**
 * Searches for the official MAUI component dist directory
 */
function findMauiSourceDir (customDir?: string): string | null {
  if (customDir && fs.existsSync(customDir)) return customDir

  const cwd = process.cwd()
  const candidates = [
    path.resolve(__dirname, '../../DevToolkit_26.6.0/DevToolkit_26.6.0-LG0001/Macle_26.6.0-LG0001_DevSuite_UI/dist'),
    path.resolve(__dirname, '../DevToolkit_26.6.0/DevToolkit_26.6.0-LG0001/Macle_26.6.0-LG0001_DevSuite_UI/dist'),
    path.resolve(cwd, '../DevToolkit_26.6.0/DevToolkit_26.6.0-LG0001/Macle_26.6.0-LG0001_DevSuite_UI/dist'),
    path.resolve(cwd, 'DevToolkit_26.6.0/DevToolkit_26.6.0-LG0001/Macle_26.6.0-LG0001_DevSuite_UI/dist'),
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
    'image', 'list', 'list-item', 'loading', 'modal', 'overlay',
    'popup', 'progress', 'radio', 'radio-group', 'sidebar',
    'sidebar-item', 'slider', 'stepper', 'steps', 'sticky', 'switch',
    'tab', 'tabs', 'tag', 'title-bar', 'toast'
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
        this.onCompilerMake(this.ctx)
        this.modifyBuildAssets(this.ctx, pluginOptions)
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

      // Apply config options matching official DevSuite_Uni
      if (pluginOptions.devtool) {
        chain.devtool(pluginOptions.devtool)
      }
      if (pluginOptions.mode) {
        chain.mode(pluginOptions.mode)
      }
      if (Array.isArray(pluginOptions.loaders)) {
        pluginOptions.loaders.forEach((loader: any) => {
          if (loader.test && loader.loader) {
            chain.module.rule('load').test(loader.test).use('macle').loader(loader.loader)
          }
        })
      }

      // MAUI UI Component Library integration
      const isMauiEnabled = pluginOptions.maui !== false
      if (isMauiEnabled) {
        this.setupMauiComponents(chain, pluginOptions)
      }
    })
  }

  /**
   * Safe Proxy around this.ma to support Webpack's dynamic JSONP chunk loading
   */
  onCompilerMake (ctx: any) {
    ctx.onCompilerMake(({ compilation }: any) => {
      try {
        if (compilation.mainTemplate && compilation.mainTemplate.hooks) {
          // Note: In Webpack 5, beforeStartup getter throws an error.
          // Safely check without triggering the throwing getter.
          const hookDesc = Object.getOwnPropertyDescriptor(compilation.mainTemplate.hooks, 'beforeStartup')
          if (hookDesc && typeof hookDesc.value?.tap === 'function') {
            hookDesc.value.tap('JsonpMainTemplatePlugin', (source: string) => {
              return [
                'if (this.Proxy) {',
                '    let nma = this.ma;',
                '    this.ma = new Proxy({}, {',
                '        get: function (obj, prop) {',
                "            if (prop === 'webpackJsonp') {",
                "                return this['webpackJsonp'] = this['webpackJsonp'] || []",
                '            }',
                '            return nma[prop]',
                '        }',
                '    })',
                '}',
                source
              ].join('\n')
            })
          }
        }
      } catch (e) {
        // Safe fallback for Webpack 5 runner
      }
    })
  }

  /**
   * Modify build assets:
   * 1. Inject customApis into app.js
   * 2. Dynamically prepend <page-meta> on pages using .setData()
   * 3. Inject page { height: 100%; } in app.mass to fix scroll jump on navigateBack
   */
  modifyBuildAssets (ctx: any, pluginOptions: IOptions) {
    ctx.modifyBuildAssets(({ assets, miniPlugin }: any) => {
      // 1. Custom APIs injection
      if (pluginOptions?.customApis && Array.isArray(pluginOptions.customApis)) {
        const customApis = pluginOptions.customApis.map((api: string) => `"${api}"`).join(',')
        const appjs = assets['app.js']
        if (appjs) {
          const appSource = appjs.source().toString().replace(
            /("|')customApiPlaceholdIdentity("|')/,
            customApis
          )
          appjs.source = () => appSource
        }
      }

      // 2. Dynamic <page-meta> injection on pages using .setData()
      miniPlugin?.pages?.forEach((page: any) => {
        const jsKey = Object.keys(assets).find(k => k === page.name + '.js')
        const mamlKey = Object.keys(assets).find(k => k === page.name + '.maml' || k === page.name + '.wxml')
        if (jsKey && mamlKey) {
          const jsAsset = assets[jsKey]
          const mamlAsset = assets[mamlKey]
          if (jsAsset && mamlAsset) {
            const jsSource = jsAsset.source().toString()
            if (/\.setData\([\s]*\{/.test(jsSource)) {
              const currentMaml = mamlAsset.source().toString()
              if (!currentMaml.includes('<page-meta')) {
                const updatedMaml = [
                  PAGE_META,
                  currentMaml
                ].join('\n')
                mamlAsset.source = () => updatedMaml
                if (typeof mamlAsset.size === 'function') {
                  const len = Buffer.byteLength(updatedMaml, 'utf-8')
                  mamlAsset.size = () => len
                }
              }
            }
          }
        }
      })

      // 3. Fix navigateBack scroll jump to top by ensuring page height 100%
      for (const massKey of Object.keys(assets)) {
        if (/^app\.(mass|macss|wxss|css)$/.test(massKey)) {
          const appMass = assets[massKey]
          if (appMass) {
            const current = appMass.source().toString()
            if (!current.includes('height: 100%') && !current.includes('height:100%')) {
              const updatedMass = ['page {', '   height: 100%;', '}', current].join('\n')
              appMass.source = () => updatedMass
              if (typeof appMass.size === 'function') {
                const len = Buffer.byteLength(updatedMass, 'utf-8')
                appMass.size = () => len
              }
            }
          }
        }
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

    // Patch MAUI common/component.js to ensure all custom components delegate 'eh' events to the active Page
    const commonCompPath = path.join(destDir, 'common/component.js')
    if (fs.existsSync(commonCompPath)) {
      try {
        let code = fs.readFileSync(commonCompPath, 'utf-8')
        if (!code.includes('options.methods.eh')) {
          const delegateSnippet = `
  options.methods = options.methods || {};
  if (!options.methods.eh) {
    options.methods.eh = function(event) {
      if (typeof getCurrentPages === 'function') {
        const pages = getCurrentPages();
        const page = pages[pages.length - 1];
        if (page && typeof page.eh === 'function') {
          return page.eh(event);
        }
      }
    };
  }
`
          code = code.replace(
            'const options = Object.assign({}, maOptions);',
            `const options = Object.assign({}, maOptions);${delegateSnippet}`
          )
          fs.writeFileSync(commonCompPath, code, 'utf-8')
        }
      } catch (e) {}
    }

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

    // Ensure app.mass has page { height: 100%; } at the top (fixes navigateBack scroll jump)
    for (const styleName of ['app.mass', 'app.macss']) {
      const diskAppMass = path.join(outPath, styleName)
      if (fs.existsSync(diskAppMass)) {
        try {
          const content = fs.readFileSync(diskAppMass, 'utf-8')
          if (!content.includes('height: 100%') && !content.includes('height:100%')) {
            fs.writeFileSync(diskAppMass, `page {\n  height: 100%;\n}\n${content}`, 'utf-8')
          }
        } catch (e) {}
      }
    }

    console.log(`[\x1b[32mplugin-platform-macle\x1b[0m] MAUI component library active: 34 native components available at /${targetDir}`)
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
