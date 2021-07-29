import { getOrderFormId } from '../../../utils'

describe('getOrderFormId', () => {
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

    expect(getOrderFormId(ctx.cookies)).toBe('03db3a179c7d4a9085152068b555eee1')
  })
  it('should return error when "checkout.vtex.com" cookie is not in request', async () => {
    const ctx = {
      state: { orderform: {}, orderFormId: {} },
      cookies: {
        get: jest.fn().mockReturnValue(undefined),
      },
      clients: { checkout: { orderForm: jest.fn().mockResolvedValueOnce('') } },
    } as any

    expect(() => {
      getOrderFormId(ctx.cookies)
    }).toThrow(
      'No checkout.vtex.com cookie containing the orderformId was sent'
    )
  })
})
