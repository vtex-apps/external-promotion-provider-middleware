import type { Checkout, OrderFormConfiguration } from '@vtex/clients'

type Args = {
  client: Checkout
  configuration: OrderFormConfiguration
}

const setConfiguration = ({ client, configuration }: Args) => {
  // TODO: Implements methods for custom data setting
}

export default { setConfiguration }
