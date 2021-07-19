import { getOrderFormById } from '../../../middlewares'

describe('getOrderFormById', () => {
  it('should be able to slice checkout.vtex.com cookie and store in orderFormId variable', async () => {
    const ctx = {
      state: { orderform: {}, orderFormId: {} },
      cookies: {
        get: jest
          .fn()
          .mockReturnValueOnce('__ofid=03db3a179c7d4a9085152068b555eee1'),
      },
      clients: { checkout: { orderForm: jest.fn().mockResolvedValueOnce('') } },
    } as any

    const next = jest.fn()

    await getOrderFormById(ctx, next)

    expect(ctx.state.orderFormId).toBe('03db3a179c7d4a9085152068b555eee1')
  })
  it('should return error when "checkout.vtex.com" cookie is not in request', async () => {
    const ctx = {
      state: { orderform: {}, orderFormId: {} },
      cookies: {
        get: jest.fn().mockReturnValue(undefined),
      },
      clients: { checkout: { orderForm: jest.fn().mockResolvedValueOnce('') } },
    } as any

    const next = jest.fn()

    await expect(getOrderFormById(ctx, next)).rejects.toThrow(
      'No checkout.vtex.com cookie containing the orderformId was sent'
    )
  })
  it('should return error when fecthing the orderform fails', async () => {
    const ctx = {
      state: { orderform: {}, orderFormId: {} },
      cookies: {
        get: jest
          .fn()
          .mockReturnValueOnce('__ofid=03db3a179c7d4a9085152068b555eee1'),
      },
      vtex: { logger: { error: jest.fn() } },
      clients: { checkout: { orderForm: jest.fn().mockRejectedValue('') } },
    } as any

    const next = jest.fn()

    await expect(getOrderFormById(ctx, next)).rejects.toThrow(
      'Error when fetching orderform'
    )
  })
})
