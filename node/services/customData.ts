import type { Checkout } from '@vtex/clients'

import type { CheckoutOrderForm } from '../typings/global'
import type { ExternalPromotionsResponseProtocol } from '../typings/protocol/response'
import { getFlattenedExternalPromotions } from '../utils'

type Args = {
  client: Checkout
  orderForm: CheckoutOrderForm
  externalProviderResponse: ExternalPromotionsResponseProtocol
}

const setCustomData = async ({
  client,
  orderForm,
  externalProviderResponse,
}: Args) => {
  const targetCustomAppId = 'promotion-provider-middleware'

  const providedExternalPromotions = externalProviderResponse.items.map(
    (item) => {
      return {
        id: item.id,
        externalPromotions: getFlattenedExternalPromotions(item.variations),
      }
    }
  )

  await client.setSingleCustomData(
    orderForm.orderFormId,
    {
      appId: targetCustomAppId,
      appFieldName: 'externalPromotions',
      value: JSON.stringify(providedExternalPromotions),
    },
    'AUTH_TOKEN'
  )
}

export default { setCustomData }
