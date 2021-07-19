import { parseOrderFormToProtocol } from '../utils/index'

const calculateExternalBenefits = async (
  ctx: Context,
  next: () => Promise<any>
) => {
  const formattedOrderform = parseOrderFormToProtocol(ctx.state.orderForm)

  // TODO: Implements calculations using External Provider
  ctx.clients.externalProvider.getBenefits(formattedOrderform)

  await next()
}

export default calculateExternalBenefits
