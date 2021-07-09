import type { Checkout, OrderFormConfiguration } from '@vtex/clients'

type Args = {
  client: Checkout
  configuration: OrderFormConfiguration
}

const setConfiguration = ({ client, configuration }: Args) => {
  // TODO: Implements methods for custom data setting
  client // fixes ts error
  configuration // fixes ts error
}

export default { setConfiguration }
