import type { OrderFormConfiguration } from '@vtex/clients'

import orderFormConfigurationService from '../services/orderFormConfiguration'

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

  await next()
}

export default setupAppConfiguration
