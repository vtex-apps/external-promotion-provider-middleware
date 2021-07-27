import type {
  CheckoutOrderForm,
  Attachment,
  AttachmentOffering,
  PriceTag,
} from '../typings/global'
import type { ExternalPromotionsRequestProtocol } from '../typings/protocol/request'

interface INonVariableFields {
  id: string
  productId: string
  refId: string
  ean: string
  name: string
  skuName: string
  modalType: any
  productCategoryIds: string
  productCategories: { [key: string]: string }
  availability: string
  measurementUnit: string
}

interface IVariableFields {
  assemblies: any[]
  tax: number
  price: number
  listPrice: number
  manualPrice: number | undefined
  sellingPrice: number
  isGift: boolean
  quantity: number
  attachments: Attachment[]
  attachmentOfferings: AttachmentOffering[]
  offerings: any[]
  priceTags: PriceTag[]
  unitMultiplier: number
  seller: string
  sellerChain: string[]
}
;[]

export function parseOrderFormToProtocol({
  items,
  customData,
  shippingData,
  clientProfileData,
  marketingData,
  paymentData,
}: CheckoutOrderForm): ExternalPromotionsRequestProtocol {
  if (!items) {
    throw new Error('Property "items" is obligatory')
  }

  const [itemsVariableFields, itemsNonVariableFields] = items.reduce(
    (
      [variableFields, nonVariableFields]: [
        IVariableFields[],
        INonVariableFields[]
      ],
      item,
      index
    ) => {
      if (!item.id) {
        throw new Error(
          `Property "id" is missing in index ${index} inside Items Array (this property is obligatory)`
        )
      }

      nonVariableFields.push({
        id: item.id,
        productId: item?.productId,
        refId: item?.refId,
        ean: item?.ean,
        name: item?.name,
        skuName: item?.skuName,
        modalType: item?.modalType,
        productCategoryIds: item?.productCategoryIds,
        productCategories: item?.productCategories,
        availability: item?.availability,
        measurementUnit: item?.measurementUnit,
      })

      variableFields.push({
        assemblies: item?.assemblies,
        tax: item?.tax,
        price: item?.price,
        listPrice: item?.listPrice,
        manualPrice: item?.manualPrice,
        sellingPrice: item?.sellingPrice,
        isGift: item?.isGift,
        quantity: item?.quantity,
        attachments: item?.attachments,
        attachmentOfferings: item?.attachmentOfferings,
        offerings: item?.offerings,
        priceTags: item?.priceTags,
        unitMultiplier: item?.unitMultiplier,
        seller: item?.seller,
        sellerChain: item?.sellerChain,
      })

      return [variableFields, nonVariableFields]
    },
    [[], []]
  )

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
