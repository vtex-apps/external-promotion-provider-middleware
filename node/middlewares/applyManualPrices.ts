import { applyApportionment, validateIndexConsistency } from '../utils'

const applyManualPrices = async (ctx: Context, next: () => Promise<any>) => {
  try {
    validateIndexConsistency(
      ctx.state.orderForm,
      ctx.state.externalProviderResponse
    )

    const apportionedPayload = applyApportionment(
      ctx.state.parsedRequestProtocol,
      ctx.state.externalProviderResponse
    )

    await ctx.clients.checkout.updateItems(
      ctx.state.orderFormId as string,
      apportionedPayload,
      'AUTH_TOKEN'
    )

    ctx.status = 204
  } catch (err) {
    ctx.status = 400
    ctx.body = { error: err.message }

    return
  }

  await next()
}

export default applyManualPrices
