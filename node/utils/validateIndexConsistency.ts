import type { CheckoutOrderForm } from '../typings/global'
import type { ExternalPromotionsResponseProtocol } from '../typings/protocol/response'

export async function validateIndexConsistency(
  orderForm: CheckoutOrderForm,
  providerResponse: ExternalPromotionsResponseProtocol
) {
  const { items: orderFormItems } = orderForm
  const { items } = providerResponse

  if (!items) {
    throw new Error(
      `Items array is obligatory. If no promotions are going to be applied, this property should be sent as an empty array`
    )
  }

  items.forEach((item) => {
    const { id, variations } = item

    if (!variations) {
      throw new Error(`Variations array is missing in skuId ${id}.`)
    }

    variations.forEach((variation) => {
      const { requestIndex } = variation

      if (Number(orderFormItems[requestIndex].id) !== id) {
        throw new Error(
          `RequestIndex from response does not match orderForm's original index for skuId ${id}`
        )
      }
    })
  })
}
