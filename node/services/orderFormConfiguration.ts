import type { Checkout, OrderFormConfiguration } from '@vtex/clients'

type Args = {
  client: Checkout
  configuration: OrderFormConfiguration
}

/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unused-vars */
// @ts-ignore
const setConfiguration = ({ client, configuration }: Args) => {
  // TODO: Implements methods for custom data setting
}

export default { setConfiguration }
