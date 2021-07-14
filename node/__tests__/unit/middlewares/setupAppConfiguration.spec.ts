import { setupAppConfiguration } from '../../../middlewares'
import { orderFormConfiguration } from '../../../services'

jest.mock('../../../services')

describe('setupAppConfiguration', () => {
  const ctx = {
    state: {},
    clients: {
      apps: { getAppSettings: jest.fn() },
    },
    vtex: { logger: { error: jest.fn() } },
  } as any

  it('should return error when setConfiguration is rejected', async () => {
    jest
      .spyOn(orderFormConfiguration, 'setConfiguration')
      .mockImplementation()
      .mockRejectedValueOnce(new Error())

    const next = jest.fn()

    await expect(setupAppConfiguration(ctx, next)).rejects.toThrow(
      "Couldn't set orderform configuration"
    )
  })
  it('should call next function', async () => {
    jest.spyOn(orderFormConfiguration, 'setConfiguration').mockImplementation()

    const next = jest.fn()

    await setupAppConfiguration(ctx, next)
    expect(next).toHaveBeenCalled()
  })
})
