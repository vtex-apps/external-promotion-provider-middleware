import { orderform } from '../services'
import type { CheckoutOrderForm } from '../typings/global'

const getOrderFormById = async (ctx: Context, next: () => Promise<any>) => {
  // extracts __ofid=
  ctx.state.orderFormId = ctx.cookies.get('checkout.vtex.com')?.slice(7)
  if (!ctx.state.orderFormId) {
    throw new Error(
      'No checkout.vtex.com cookie containing the orderformId was sent'
    )
  }

  try {
    ctx.state.orderForm = (await orderform.getOrderFormById(
      ctx.clients.checkout,
      ctx.state.orderFormId
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
