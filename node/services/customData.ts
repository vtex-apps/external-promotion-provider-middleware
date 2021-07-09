import type { Checkout, CustomData } from '@vtex/clients'

type Args = {
  client: Checkout
  customData: CustomData
}

const setCustomData = ({ client, customData }: Args) => {
  // TODO: Implements methods for custom data setting
  client // fixes ts error
  customData // fixes ts error
}

export default { setCustomData }
