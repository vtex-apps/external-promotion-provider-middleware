import { json } from 'co-body'

import { parseOrderFormToProtocol } from '../utils/index'

const calculateExternalBenefits = async (
  ctx: Context,
  next: () => Promise<any>
) => {
  try {
    const simulationRequestBody = await json(ctx.req)

    ctx.state.parsedRequestProtocol = parseOrderFormToProtocol(
      ctx.state.orderForm ?? simulationRequestBody
    )

    ctx.state.externalProviderResponse = await ctx.clients.externalProvider.getBenefits(
      ctx.state.parsedRequestProtocol
    )
  } catch (err) {
    ctx.vtex.logger.error({
      calculateExternalBenefits: {
        status: 'failed',
        content: err.message,
      },
    })

    ctx.status = 400
    ctx.body = {
      error: err.message,
    }

    return
  }

  if (ctx.vtex.route.id === 'simulation') {
    ctx.body = ctx.state.externalProviderResponse

    return
  }

  ctx.vtex.logger.info({
    calculateExternalBenefits: {
      status: 'External endpoint returned',
      content: {
        orderFormId: ctx.state.orderFormId,
        externalEndpointResponse: ctx.state.externalProviderResponse,
      },
    },
  })

  await next()
}

export default calculateExternalBenefits
