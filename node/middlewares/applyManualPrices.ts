const applyManualPrices = async (ctx: Context, next: () => Promise<any>) => {
  // TODO: Add manual prices to orderForm and identifications to Custom Data

  await next()
}

export default applyManualPrices
