import type { Checkout } from '@vtex/clients'

import type { CheckoutOrderForm } from '../typings/global'

const getOrderFormById = async (client: Checkout, orderFormId: string) => {
  try {
    const orderForm: CheckoutOrderForm = ((await client.orderForm(
      orderFormId
    )) as unknown) as CheckoutOrderForm

    return orderForm
  } catch (error) {
    throw new Error(`Error when fetching orderform. Returned error: ${error}`)
  }
}

async function deleteAllManualPrices(
  client: Checkout,
  orderForm: CheckoutOrderForm
) {
  const { items, orderFormId } = orderForm

  if (!items.length) {
    throw new Error("Found no items inside orderForm's items array")
  }

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
    throw new Error(
      `Error when removing all manual prices from orderform. Returned error: ${JSON.stringify(
        error
      )}`
    )
  }
}

export default { getOrderFormById, deleteAllManualPrices }
