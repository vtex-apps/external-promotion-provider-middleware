import { orderform } from '../services'
import type { CheckoutOrderForm } from '../typings/global'
import { getOrderFormId } from '../utils'

const getOrderFormById = async (ctx: Context, next: () => Promise<any>) => {
  getOrderFormId(ctx.cookies, ctx.state)

  try {
    ctx.state.orderForm = (await orderform.getOrderFormById(
      ctx.clients.checkout,
      ctx.state.orderFormId as string
    )) as CheckoutOrderForm
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
