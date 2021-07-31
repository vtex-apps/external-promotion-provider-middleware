import schemas from '../schemas'
import type { CheckoutOrderForm } from '../typings/global'
import type { ExternalPromotionsResponseProtocol } from '../typings/protocol/response'

async function schemaConsistency(
  providerResponse: ExternalPromotionsResponseProtocol
) {
  await schemas.providerResponseSchema
    .validate(providerResponse, {
      strict: true,
      abortEarly: false,
    })
    .catch((err) => {
      throw new Error(err.errors.join(' '))
    })
}

function indexConsistency(
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

export default { schemaConsistency, indexConsistency }
