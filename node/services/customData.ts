import type { Checkout, CustomData } from '@vtex/clients'

type Args = {
  client: Checkout
  customData: CustomData
}

const setCustomData = ({ client, customData }: Args) => {
  // TODO: Implements methods for custom data setting
}

export default { setCustomData }
