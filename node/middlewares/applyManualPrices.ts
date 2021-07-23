import { applyApportionment } from '../utils'

const applyManualPrices = async (ctx: Context, next: () => Promise<any>) => {
  const apportionedPayload = applyApportionment(
    ctx.state.parsedRequestProtocol,
    ctx.state.externalProviderResponse
  )

  ctx.clients.checkout.updateItems(
    ctx.state.orderFormId as string,
    apportionedPayload,
    'AUTH_TOKEN'
  )

  ctx.status = 204

  await next()
}

export default applyManualPrices
