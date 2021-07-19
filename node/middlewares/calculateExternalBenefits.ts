import { parseOrderFormToProtocol } from '../utils/index'

const calculateExternalBenefits = async (
  ctx: Context,
  next: () => Promise<any>
) => {
  const parsedProtocol = parseOrderFormToProtocol(ctx.state.orderForm)

  // TODO: Implements calculations using External Provider
  ctx.clients.externalProvider.getBenefits(parsedProtocol)

  await next()
}

export default calculateExternalBenefits
