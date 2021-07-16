import type { Checkout } from '@vtex/clients'

const getOrderFormById = async (client: Checkout, orderFormId: string) => {
  try {
    const orderForm = await client.orderForm(orderFormId)

    return orderForm
  } catch (error) {
    throw new Error('Error when fetching orderform')
  }
}

export default { getOrderFormById }
