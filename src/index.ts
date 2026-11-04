import type { IPluginContext } from '@tarojs/service'
import { Macle } from './program'

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
  [key: string]: any
}

export { Macle }

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
