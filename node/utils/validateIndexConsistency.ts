import type { CheckoutOrderForm } from '../typings/global'
import type { ExternalPromotionsResponseProtocol } from '../typings/protocol/response'

export function validateIndexConsistency(
  orderForm: CheckoutOrderForm,
  providerResponse: ExternalPromotionsResponseProtocol
) {
  const { items: orderFormItems } = orderForm
  const { items } = providerResponse

  items.forEach((item) => {
    const { id, variations } = item

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
