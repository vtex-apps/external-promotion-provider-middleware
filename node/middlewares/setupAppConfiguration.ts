import { orderFormConfigurationConstant } from '../constants/orderFormConfiguration'
import { orderFormConfiguration } from '../services'

const setupAppConfiguration = async (
  ctx: InstalledAppEvent,
  next: () => Promise<any>
) => {
  const { checkout } = ctx.clients

  try {
    await orderFormConfiguration.setConfiguration({
      client: checkout,
      configuration: orderFormConfigurationConstant,
    })
  } catch (error) {
    ctx.vtex.logger.error({
      setupAppConfigurationError: {
        status: 'failed',
        content: error,
      },
    })
    throw new Error("Couldn't set orderform configuration")
  }

  await next()
}

export default setupAppConfiguration
