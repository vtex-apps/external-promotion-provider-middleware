import { formatOrderform } from '../utils/index'

const calculateExternalBenefits = async (
  ctx: Context,
  next: () => Promise<any>
) => {
  const formattedOrderform = formatOrderform(ctx.state.orderForm)

  // TODO: Implements calculations using External Provider
  ctx.clients.externalProvider.getBenefits(formattedOrderform)

  await next()
}

export default calculateExternalBenefits
