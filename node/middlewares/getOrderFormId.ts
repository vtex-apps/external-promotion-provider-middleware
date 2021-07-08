const getOrderFormId = async (ctx: Context, next: () => Promise<any>) => {
  // TODO: Think about the orderForm inputting (here I thought smth about cookie extraction to make more secure, avoiding an input from body)
  const orderFormId = ctx.cookies.get('checkout.vtex.com')?.slice(7) // extracts __ofid=

  ctx.state.orderFormId = orderFormId

  await next()
}

export default getOrderFormId
