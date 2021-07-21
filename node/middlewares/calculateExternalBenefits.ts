import { json } from 'co-body'

import { parseOrderFormToProtocol } from '../utils/index'

const calculateExternalBenefits = async (
  ctx: Context,
  next: () => Promise<any>
) => {
  const simulationRequestBody = await json(ctx.req)

  ctx.state.parsedRequestProtocol = parseOrderFormToProtocol(
    ctx.state.orderForm ?? simulationRequestBody
  )

  ctx.state.externalProviderResponse = await ctx.clients.externalProvider.getBenefits(
    ctx.state.parsedRequestProtocol
  )

  if (ctx.url === '/_v/promotion-provider/simulation') {
    ctx.body = ctx.state.externalProviderResponse

    return
  }

  await next()
}

export default calculateExternalBenefits
