import { applyManualPrices } from '../../../middlewares'

jest.mock('../../../utils')
jest.mock('../../../services')

describe('applyManualPrices', () => {
  it('should be able to set status 204 and call next', async () => {
    const ctx = {
      status: '',
      state: {},
      clients: { checkout: { updateItems: jest.fn() } },
    }

    const next = jest.fn()

    await applyManualPrices(ctx as any, next)
    expect(next).toBeCalled()
    expect(ctx.status).toBe(204)
  })
  it('should be able to set status 400 when error is thrown', async () => {
    const ctx = {
      status: '',
      state: {},
      clients: {
        checkout: { updateItems: jest.fn().mockRejectedValueOnce('') },
      },
      vtex: { logger: { error: jest.fn() } },
    }

    const next = jest.fn()

    await applyManualPrices(ctx as any, next)
    expect(ctx.status).toBe(400)
  })
})
