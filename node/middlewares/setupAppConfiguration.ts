import type { OrderFormConfiguration } from '@vtex/clients'

import orderFormConfigurationService from '../services/orderFormConfiguration'

type IAppSettings = { externalEndpoint: string }

const setupAppConfiguration = async (
  ctx: InstalledAppEvent,
  next: () => Promise<any>
) => {
  const { checkout } = ctx.clients

  // TODO: Implement configuration setting of CustomApp and Manual Price
  orderFormConfigurationService.setConfiguration({
    client: checkout,
    configuration: {} as OrderFormConfiguration, // fixes ts error
  })

  const eventSender = ctx.body?.id ?? 'Sender was not provided'

  const appSettings: IAppSettings = await ctx.clients.apps.getAppSettings(
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

  await next()
}

export default setupAppConfiguration
