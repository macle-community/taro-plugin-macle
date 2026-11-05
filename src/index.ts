import type { IPluginContext } from '@tarojs/service'
import { Macle } from './program'
import { mauiComponents, components } from './components'

export interface IMauiOptions {
  /**
   * Custom source directory containing MAUI component packages.
   * By default, auto-discovers from DevToolkit_25.9.0/Macle_25.9.0_DevSuite_UI/dist
   */
  sourceDir?: string
  /**
   * Target directory name in output folder (default: 'maui-components')
   */
  targetDir?: string
  /**
   * Whether to automatically copy MAUI component files to output directory on build
   * @default true
   */
  autoCopy?: boolean
  /**
   * Whether to automatically inject usingComponents into app.json
   * @default true
   */
  autoInjectComponents?: boolean
}

export interface IOptions {
  /**
   * Custom style extension if project uses .mass instead of default .macss
   * @default '.mass'
   */
  styleExtension?: '.macss' | '.mass' | string
  /**
   * Enable keyboard accessory slot
   */
  enablekeyboardAccessory?: boolean
  /**
   * Enable or configure Tailwind CSS support for Macle
   * When enabled or when tailwind.config.js is detected, automatically integrates
   * weapp-tailwindcss Webpack 5 plugin with Macle stylesheet (.mass/.macss)
   * and template (.maml) matchers and rem2rpx conversion.
   */
  tailwindcss?: boolean | {
    rem2rpx?: boolean
    [key: string]: any
  }
  /**
   * Enable or configure Macle UI (MAUI) component library support.
   * When enabled (default: true):
   * - Registers MAUI components into Taro template & virtual DOM reconciler
   * - Auto-copies MAUI component assets to output directory (`<outputRoot>/maui-components`)
   * - Auto-injects global `usingComponents` into `app.json`
   * - Provides typed React wrappers (MauiButton, MauiCell, etc.)
   */
  maui?: boolean | IMauiOptions
  [key: string]: any
}

export { Macle, mauiComponents, components }
export * from './types'
export * from './apis-list'
export * from './apis'

export default (ctx: IPluginContext, options: IOptions = {}) => {
  ctx.registerPlatform({
    name: 'macle',
    useConfigName: 'mini',
    async fn ({ config }: { config: any }) {
      const program = new Macle(ctx, config, options)
      await program.start()
    }
  })
}
