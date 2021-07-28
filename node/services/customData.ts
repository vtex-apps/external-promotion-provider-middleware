import type { Checkout } from '@vtex/clients'

import type { CheckoutOrderForm } from '../typings/global'
import type {
  ExternalPromotion,
  ExternalPromotionsResponseProtocol,
} from '../typings/protocol/response'
import { getFlattenedExternalPromotions } from '../utils'

type Args = {
  client: Checkout
  orderForm: CheckoutOrderForm
  externalProviderResponse: ExternalPromotionsResponseProtocol
}

interface ExternalPromotionsField {
  id: number
  externalPromotions: ExternalPromotion[]
}

const setCustomData = async ({
  client,
  orderForm,
  externalProviderResponse,
}: Args) => {
  const { customData } = orderForm
  const targetCustomAppId = 'promotion-provider-middleware'

  const [
    providedExternalPromotions,
    providedIds,
  ] = externalProviderResponse.items.reduce(
    (
      [externalPromotionsField, ids]: [ExternalPromotionsField[], number[]],
      item
    ) => {
      const { id } = item

      const externalPromotions = getFlattenedExternalPromotions(item.variations)

      externalPromotionsField.push({ id, externalPromotions })
      ids.push(id)

      return [externalPromotionsField, ids]
    },
    [[], []]
  )

  const currentExternalPromotionsField =
    customData?.customApps.filter(
      (customApp) => customApp.id === targetCustomAppId
    )[0].fields.externalPromotions ?? '[]'

  const newExternalPromotionsField = JSON.parse(currentExternalPromotionsField)
    .filter((field: ExternalPromotionsField) => !providedIds.includes(field.id))
    .concat(providedExternalPromotions)

  await client.setSingleCustomData(
    orderForm.orderFormId,
    {
      appId: targetCustomAppId,
      appFieldName: 'externalPromotions',
      value: JSON.stringify(newExternalPromotionsField),
    },
    'AUTH_TOKEN'
  )
}

export default { setCustomData }
