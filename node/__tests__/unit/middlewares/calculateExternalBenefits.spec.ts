import * as cobody from 'co-body'

import { calculateExternalBenefits } from '../../../middlewares'
import { parseOrderFormToProtocol } from '../../../utils'

jest.mock('co-body')
jest.mock('../../../utils')

describe('calculateExternalBenefits', () => {
  const mainCtx = {
    state: { orderForm: { items: [] } },
    req: {},
    clients: {
      externalProvider: { getBenefits: jest.fn() },
    },
    body: {},
    vtex: { logger: { error: jest.fn(), info: jest.fn() }, route: { id: '' } },
  } as any

  const next = jest.fn()

  jest.spyOn(cobody, 'json').mockImplementation().mockResolvedValue('')

  it('should be able to call parseOrderFormToProtocol function', async () => {
    await calculateExternalBenefits(mainCtx, next)

    expect(parseOrderFormToProtocol).toHaveBeenCalled()
  })

  it('should be able to call getBenefits function', async () => {
    await calculateExternalBenefits(mainCtx, next)

    expect(mainCtx.clients.externalProvider.getBenefits).toHaveBeenCalled()
  })

  it('should be able to set the response body when the route is /simulation', async () => {
    const ctx = {
      state: {
        orderForm: { items: [] },
      },
      req: {},
      clients: {
        externalProvider: {
          getBenefits: jest.fn().mockResolvedValueOnce({ items: [] }),
        },
      },
      vtex: {
        logger: { error: jest.fn(), info: jest.fn() },
        route: { id: 'simulation' },
      },
    } as any

    await calculateExternalBenefits(ctx, next)

    expect(ctx.body).toMatchObject({ items: [] })
  })

  it('should not call next function when the route is /simulation', async () => {
    const ctx = {
      state: {
        orderForm: { items: [{ id: 1 }] },
      },
      req: {},
      clients: {
        externalProvider: {
          getBenefits: jest.fn().mockResolvedValueOnce({ items: [] }),
        },
      },
      vtex: {
        logger: { error: jest.fn(), info: jest.fn() },
        route: { id: 'simulation' },
      },
    } as any

    const nextSpy = jest.fn()

    await calculateExternalBenefits(ctx, nextSpy)

    expect(nextSpy).not.toBeCalled()
  })

  it('should not set the response body when the route does not match /simulation', async () => {
    const ctx = {
      state: {
        orderForm: { items: [] },
      },
      req: {},
      clients: {
        externalProvider: {
          getBenefits: jest.fn().mockResolvedValueOnce({ items: [] }),
        },
      },
      vtex: {
        logger: { error: jest.fn(), info: jest.fn() },
        route: { id: '' },
      },
    } as any

    await calculateExternalBenefits(ctx, next)

    expect(ctx.body).toBeUndefined()
  })

  it('should return 404 when getBenefits function fails', async () => {
    const ctx = {
      state: {
        orderForm: { items: [] },
      },
      req: {},
      clients: {
        externalProvider: {
          getBenefits: jest.fn().mockRejectedValueOnce(''),
        },
      },
      vtex: {
        logger: { error: jest.fn(), info: jest.fn() },
        route: { id: '' },
      },
    } as any

    await calculateExternalBenefits(ctx, next)

    expect(ctx.status).toBe(400)
  })
  it('should return 404 when parseOrderFormToProtocol function fails', async () => {
    const ctx = {
      state: {
        orderForm: undefined,
      },
      req: {},
      clients: {
        externalProvider: {
          getBenefits: jest.fn().mockRejectedValueOnce(''),
        },
      },
      vtex: {
        logger: { error: jest.fn(), info: jest.fn() },
        route: { id: '' },
      },
    } as any

    await calculateExternalBenefits(ctx, next)

    expect(ctx.status).toBe(400)
  })
})
