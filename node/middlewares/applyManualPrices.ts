/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unused-vars */
// @ts-ignore
const applyManualPrices = async (ctx: Context, next: () => Promise<any>) => {
  // TODO: Add manual prices to orderForm and identifications to Custom Data
  await next()
}

export default applyManualPrices
