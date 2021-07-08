import orderFormConfigurationService from '../services/orderFormConfiguration'

const setupAppConfiguration = async (
  ctx: InstalledAppEvent,
  next: () => Promise<any>
) => {
  const { checkout } = ctx.clients

  // TODO: Implement configuration setting of CustomApp and Manual Price
  orderFormConfigurationService.setConfiguration({
    client: checkout,
    configuration: {},
  })

  await next()
}

export default setupAppConfiguration
