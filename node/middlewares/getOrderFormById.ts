import { orderform } from '../services'
import { getOrderFormId } from '../utils'

const getOrderFormById = async (ctx: Context, next: () => Promise<any>) => {
  ctx.state.orderFormId = getOrderFormId(ctx.cookies)

  try {
    const currentOrderform = await orderform.getOrderFormById(
      ctx.clients.checkout,
      ctx.state.orderFormId as string
    )

    ctx.state.orderForm = await orderform.deleteAllManualPrices(
      ctx.clients.checkout,
      currentOrderform
    )
  } catch (error) {
    ctx.vtex.logger.error({
      getOrderFormById: {
        status: 'failed',
        content: ctx.state.orderFormId,
      },
    })
    throw new Error(error)
  }

  await next()
}

export default getOrderFormById
