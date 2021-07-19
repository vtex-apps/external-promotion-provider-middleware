import { getOrderFormById } from '../../../middlewares'

describe('getOrderFormById', () => {
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
