import type { IPluginContext } from '@tarojs/service'
import { Macle } from './program'

export interface IOptions {
  /**
   * Custom style extension if project uses .mass instead of default .macss
   * @default '.macss'
   */
  styleExtension?: '.macss' | '.mass' | string
  /**
   * Enable keyboard accessory slot
   */
  enablekeyboardAccessory?: boolean
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
