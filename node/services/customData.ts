import type { Checkout, CustomData } from '@vtex/clients'

type Args = {
  client: Checkout
  customData: CustomData
}
/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unused-vars */
// @ts-ignore
const setCustomData = ({ client, customData }: Args) => {
  // TODO: Implements methods for custom data setting
}

export default { setCustomData }
