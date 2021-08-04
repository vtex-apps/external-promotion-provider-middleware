import { applyApportionment, validateProviderResponse } from '../utils'
import { customData } from '../services'

const applyManualPrices = async (ctx: Context, next: () => Promise<any>) => {
  try {
    await validateProviderResponse.schemaConsistency(
      ctx.state.externalProviderResponse
    )

    validateProviderResponse.indexConsistency(
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

    await customData.setCustomData({
      client: ctx.clients.checkout,
      orderForm: ctx.state.orderForm,
      externalProviderResponse: ctx.state.externalProviderResponse,
    })

    ctx.status = 204
  } catch (err) {
    ctx.vtex.logger.error({
      applyManualPrices: {
        status: 'failed',
        content: {
          error: err.message,
          orderForm: ctx.state.orderForm,
          externalProviderResponse: ctx.state.externalProviderResponse,
        },
      },
    })
    ctx.status = 400
    ctx.body = { error: err.message }

    return
  }

  await next()
}

export default applyManualPrices
