import { getOrderFormById } from '../../../middlewares'

describe('getOrderFormById', () => {
  it('should return error when fecthing the orderform fails', async () => {
    const ctx = {
      body: '',
      state: { orderform: {}, orderFormId: {} },
      cookies: {
        get: jest
          .fn()
          .mockReturnValueOnce('__ofid=03db3a179c7d4a9085152068b555eee1'),
      },
      vtex: { logger: { error: jest.fn() } },
      clients: { checkout: { orderForm: jest.fn().mockRejectedValueOnce('') } },
    } as any

    const next = jest.fn()

    await getOrderFormById(ctx, next)

    expect(ctx.body).toMatchObject({ error: 'Error when fetching orderform' })
  })
  it('should return error when deleting all manual prices fails', async () => {
    const ctx = {
      body: '',
      state: { orderform: {}, orderFormId: {} },
      cookies: {
        get: jest
          .fn()
          .mockReturnValueOnce('__ofid=03db3a179c7d4a9085152068b555eee1'),
      },
      vtex: { logger: { error: jest.fn() } },
      clients: {
        checkout: {
          orderForm: jest.fn().mockResolvedValueOnce({ items: [] }),
          updateItems: jest.fn().mockRejectedValueOnce(''),
        },
      },
    } as any

    const next = jest.fn()

    await getOrderFormById(ctx, next)

    expect(ctx.body).toMatchObject({
      error: 'Error when removing all manual prices from orderform',
    })
  })
  it('should not call next when an error is returned', async () => {
    const ctx = {
      body: '',
      state: { orderform: {}, orderFormId: {} },
      cookies: {
        get: jest
          .fn()
          .mockReturnValueOnce('__ofid=03db3a179c7d4a9085152068b555eee1'),
      },
      vtex: { logger: { error: jest.fn() } },
      clients: {
        checkout: {
          orderForm: jest.fn().mockResolvedValueOnce({ items: [] }),
          updateItems: jest.fn().mockRejectedValueOnce(''),
        },
      },
    } as any

    const next = jest.fn()

    await getOrderFormById(ctx, next)

    expect(next).not.toBeCalled()
  })
  it('should call next when no errors are returned', async () => {
    const ctx = {
      body: '',
      state: { orderform: {}, orderFormId: {} },
      cookies: {
        get: jest
          .fn()
          .mockReturnValueOnce('__ofid=03db3a179c7d4a9085152068b555eee1'),
      },
      vtex: { logger: { error: jest.fn() } },
      clients: {
        checkout: {
          orderForm: jest.fn().mockResolvedValueOnce({ items: [] }),
          updateItems: jest.fn().mockResolvedValueOnce(''),
          setSingleCustomData: jest.fn().mockResolvedValueOnce(''),
        },
      },
    } as any

    const next = jest.fn()

    await getOrderFormById(ctx, next)

    expect(next).toBeCalled()
  })
})
