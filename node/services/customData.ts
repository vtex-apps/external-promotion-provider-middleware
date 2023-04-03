import type { Checkout } from '@vtex/clients'

import type { CheckoutOrderForm } from '../typings/global'
import type { ExternalPromotionsResponseProtocol } from '../typings/protocol/response'
import { getFlattenedExternalPromotions } from '../utils'

type Args = {
  client: Checkout
  orderForm: CheckoutOrderForm
  externalProviderResponse: ExternalPromotionsResponseProtocol | null
}

const setCustomData = async ({
  client,
  orderForm,
  externalProviderResponse,
}: Args):Promise<any> => {
  const targetCustomAppId = 'promotion-provider-middleware'

  const providedExternalPromotions = externalProviderResponse?.items.map(
    (item) => {
      return {
        id: item.id,
        externalPromotions: getFlattenedExternalPromotions(item.variations),
      }
    }
  )

  const value = providedExternalPromotions
    ? JSON.stringify(providedExternalPromotions)
    : '[]'

  try {
    const ret = await client.setSingleCustomData(
      orderForm.orderFormId,
      {
        appId: targetCustomAppId,
        appFieldName: 'externalPromotions',
        value,
      },
      'AUTH_TOKEN'
    )
    return ret
  } catch (error) {
    throw new Error(`It was not possible to set customData. ${error}`)
  }
}

export default { setCustomData }
