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

async function deleteAllManualPrices(
  client: Checkout,
  orderForm: CheckoutOrderForm
) {
  const { items, orderFormId } = orderForm

  const orderItems = items.map((_, index) => {
    return {
      index,
      price: null,
    }
  })

  try {
    const orderFormWithoutManualPrices = ((await client.updateItems(
      orderFormId,
      orderItems,
      'AUTH_TOKEN'
    )) as unknown) as CheckoutOrderForm

    return orderFormWithoutManualPrices
  } catch (error) {
    throw new Error('Error when removing all manual prices from orderform')
  }
}

export default { getOrderFormById, deleteAllManualPrices }
