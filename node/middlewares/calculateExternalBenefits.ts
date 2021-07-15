const calculateExternalBenefits = async (
  ctx: Context,
  next: () => Promise<any>
) => {
  // TODO: Implements calculations using External Provider
  ctx.clients.externalProvider.getBenefits('')

  await next()
}

export default calculateExternalBenefits
