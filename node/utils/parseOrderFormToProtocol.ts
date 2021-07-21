import type { CheckoutOrderForm } from '../typings/global'
import type { ExternalPromotionsRequestProtocol } from '../typings/protocol/request'

export function parseOrderFormToProtocol({
  items,
  customData,
  shippingData,
  clientProfileData,
  marketingData,
  paymentData,
}: CheckoutOrderForm): ExternalPromotionsRequestProtocol {
  const itemsNonVariableFields = items.map((item) => {
    return {
      id: item.id,
      productId: item.productId,
      refId: item.refId,
      ean: item.ean,
      name: item.name,
      skuName: item.skuName,
      modalType: item.modalType,
      productCategoryIds: item.productCategoryIds,
      productCategories: item.productCategories,
      availability: item.availability,
      measurementUnit: item.measurementUnit,
    }
  })

  const itemsVariableFields = items.map((item) => {
    return {
      assemblies: item.assemblies,
      tax: item.tax,
      price: item.price,
      listPrice: item.listPrice,
      manualPrice: item.manualPrice,
      sellingPrice: item.sellingPrice,
      isGift: item.isGift,
      quantity: item.quantity,
      attachments: item.attachments,
      attachmentOfferings: item.attachmentOfferings,
      offerings: item.offerings,
      priceTags: item.priceTags,
      unitMultiplier: item.unitMultiplier,
      seller: item.seller,
      sellerChain: item.sellerChain,
    }
  })

  const formattedItems = itemsNonVariableFields.reduce(
    (memo: any[], itemNonVariableFields, index) => {
      if (
        index &&
        itemsNonVariableFields[index - 1]?.id === itemNonVariableFields.id
      ) {
        const compiledVariations = [
          ...memo[memo.length - 1].variations,
          itemsVariableFields[index],
        ]

        const newItem = {
          ...itemNonVariableFields,
          variations: compiledVariations,
        }

        memo.pop()

        return [...memo, newItem]
      }

      return memo.concat({
        ...itemNonVariableFields,
        variations: [itemsVariableFields[index]],
      })
    },
    []
  )

  const parsedOrderFormToProtocol = {
    items: formattedItems,
    customData,
    shippingData: {
      logisticsInfo: shippingData?.logisticsInfo,
      selectedAddresses: shippingData?.selectedAddresses,
    },
    clientProfileData,
    marketingData,
    paymentData: { payments: paymentData?.payments },
  }

  return parsedOrderFormToProtocol
}
