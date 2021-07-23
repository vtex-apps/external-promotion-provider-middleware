import type { Checkout } from '@vtex/clients'

import type { CheckoutOrderForm } from '../typings/global'

const getOrderFormById = async (client: Checkout, orderFormId: string) => {
  try {
    const orderForm: CheckoutOrderForm = ((await client.orderForm(
      orderFormId,
      'AUTH_TOKEN'
    )) as unknown) as CheckoutOrderForm

    return orderForm
  } catch (error) {
    throw new Error('Error when fetching orderform')
  }
}

export default { getOrderFormById }
