import type {
  ExternalPromotionsRequestProtocol,
  Item,
} from '../typings/protocol/request'
import type {
  ExternalPromotionsResponseProtocol,
  Variation,
  ExternalPromotion,
} from '../typings/protocol/response'

export function getFlattenedExternalPromotions(itemVariations: Variation[]) {
  return itemVariations.reduce<ExternalPromotion[]>(
    (memo, variation) => memo.concat(variation.externalPromotions),
    []
  )
}

// this function is important for cases where the SKU has split indexes
function getItemQuantityAndPrice(requestItems: Item[], skuId: number) {
  const filteredItem = requestItems.filter((item: Item) => {
    return Number(item.id) === skuId
  })

  if (filteredItem.length > 1) {
    throw new Error(`Multiple items with SKUID ${skuId}`)
  }

  const { price } = filteredItem[0].variations[0]

  const totalQuantity = filteredItem[0].variations.reduce(
    (summedQuantity, variation) => {
      return summedQuantity + variation.quantity
    },
    0
  )

  return { price, totalQuantity }
}

export function applyApportionment(
  parsedRequestProtocol: ExternalPromotionsRequestProtocol,
  providerResponse: ExternalPromotionsResponseProtocol
) {
  const apportionedPayload = providerResponse.items.map((item) => {
    const skuId = item.id

    const flattenedExternalPromotions = getFlattenedExternalPromotions(
      item.variations
    )

    const discount = flattenedExternalPromotions.reduce(
      (discountSum, externalPromotion) => {
        if (externalPromotion.isPercentual) {
          return {
            percentualDiscount:
              discountSum.percentualDiscount + externalPromotion.value,
            nominalDiscount: discountSum.nominalDiscount,
          }
        }

        return {
          percentualDiscount: discountSum.percentualDiscount,
          nominalDiscount:
            discountSum.nominalDiscount + externalPromotion.value,
        }
      },
      {
        percentualDiscount: 0,
        nominalDiscount: 0,
      }
    )

    const { totalQuantity, price } = getItemQuantityAndPrice(
      parsedRequestProtocol.items,
      skuId
    )

    const totalPrice = price * totalQuantity
    const netTotalPrice =
      totalPrice * (1 - discount.percentualDiscount) + discount.nominalDiscount

    const unitPrice = Math.floor(netTotalPrice / totalQuantity)

    return {
      index: item.variations[0].requestIndex,
      price: unitPrice,
    }
  })

  return apportionedPayload
}
