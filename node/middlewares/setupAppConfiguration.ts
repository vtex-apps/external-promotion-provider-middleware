import { orderFormConfigurationConstant } from '../constants/orderFormConfiguration'
import orderFormConfigurationService from '../services/orderFormConfiguration'

type IAppSettings = { externalEndpoint: string }

const setupAppConfiguration = async (
  ctx: InstalledAppEvent,
  next: () => Promise<any>
) => {
  const { checkout, apps } = ctx.clients

  await orderFormConfigurationService.setConfiguration({
    client: checkout,
    configuration: orderFormConfigurationConstant,
  })

  const eventSender = ctx.body?.id ?? 'Sender was not provided'

  try {
    const appSettings: IAppSettings = await apps.getAppSettings(
      process.env.VTEX_APP_ID as string
    )

    ctx.state.appSettings = appSettings

    ctx.vtex.logger.debug({
      eventState: {
        status: 'received',
        sender: eventSender,
        event: ctx.vtex.eventInfo,
        content: ctx.state.appSettings,
      },
    })
  } catch (err) {
    throw new Error("Couldn't get app settings")
  }

  await next()
}

export default setupAppConfiguration
