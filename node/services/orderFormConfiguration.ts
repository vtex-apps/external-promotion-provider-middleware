import type { App, Checkout, OrderFormConfiguration } from '@vtex/clients'

type Args = {
  client: Checkout
  configuration: OrderFormConfiguration
}

const getCurrentConfiguration = async (client: Checkout) => {
  const currentOrderformConfiguration = await client.getOrderFormConfiguration()
  const isAppAlreadySet = currentOrderformConfiguration.apps.filter(
    (app: App) => {
      return app.id === 'promotion-provider-middleware'
    }
  ).length

  return {
    isAppAlreadySet: !!isAppAlreadySet,
    isManualPriceTrue: currentOrderformConfiguration.allowManualPrice,
    currentOrderformConfiguration,
  }
}

const setConfiguration = async ({
  client,
  configuration,
}: Args): Promise<void> => {
  const {
    isAppAlreadySet,
    isManualPriceTrue,
    currentOrderformConfiguration,
  } = await getCurrentConfiguration(client)

  if (isManualPriceTrue && isAppAlreadySet) {
    return
  }

  try {
    await client.setOrderFormConfiguration({
      ...currentOrderformConfiguration,
      apps: isAppAlreadySet
        ? [...currentOrderformConfiguration.apps]
        : [...currentOrderformConfiguration.apps, ...configuration.apps],
      allowManualPrice: configuration.allowManualPrice,
    })
  } catch (e) {
    throw new Error('Error while setting orderform configuration')
  }
}

export default { setConfiguration }
