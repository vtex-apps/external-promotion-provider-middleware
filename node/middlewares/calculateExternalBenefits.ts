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
    ctx.status = 200
    ctx.body = ctx.state.externalProviderResponse

    return
  }

  const {
    orderForm: {
      items,
      totalizers,
      clientProfileData,
      shippingData,
      paymentData: { payments },
      customData,
    },
    externalProviderResponse,
  } = ctx.state

  ctx.vtex.logger.info({
    calculateExternalBenefits: {
      status: 'External endpoint successfully returned',
      content: {
        orderForm: {
          items,
          totalizers,
          clientProfileData,
          shippingData,
          payments,
          customData,
        },
        externalProviderResponse,
      },
    },
  })

  if (
    Array.isArray(ctx.state.externalProviderResponse.items) &&
    !ctx.state.externalProviderResponse.items.length
  ) {
    ctx.status = 200
    ctx.body = { message: 'No promotions applied, Items array was sent empty' }

    return
  }

  await next()
}

export default calculateExternalBenefits
