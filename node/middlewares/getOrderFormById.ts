import { customData, orderform } from '../services'
import { getOrderFormId } from '../utils'

const getOrderFormById = async (ctx: Context, next: () => Promise<any>) => {
  try {
    ctx.state.orderFormId = getOrderFormId(ctx.cookies)

    const currentOrderform = await orderform.getOrderFormById(
      ctx.clients.checkout,
      ctx.state.orderFormId as string
    )

    ctx.state.orderForm = await orderform.deleteAllManualPrices(
      ctx.clients.checkout,
      ctx.vtex.logger,
      currentOrderform
    )

    // this method is necessary to clean customData
    await customData.setCustomData({
      client: ctx.clients.checkout,
      orderForm: ctx.state.orderForm,
      externalProviderResponse: null,
    })
  } catch (error) {
    ctx.vtex.logger.error({
      getOrderFormById: {
        status: 'failed',
        error: error.message,
        orderFormId: ctx.state.orderFormId,
      },
    })
    ctx.status = 400
    ctx.body = { error: error.message }

    return
  }

  await next()
}

export default getOrderFormById
