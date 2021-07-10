import { reject } from 'ramda'

import { setupAppConfiguration } from '../../middlewares'

describe('setupAppConfiguration', () => {
  it('should insert the app settings into context', async () => {
    const ctx = {
      state: {},
      clients: {
        apps: {
          getAppSettings: jest.fn().mockResolvedValueOnce({
            externalEndpoint: 'http://localhost:3000/api',
          }),
        },
      },
      vtex: { logger: { debug: jest.fn() } },
    } as any

    const next = jest.fn()
    const spyGetAppSettings = jest.spyOn(ctx.clients.apps, 'getAppSettings')

    await setupAppConfiguration(ctx, next)
    expect(spyGetAppSettings).toHaveBeenCalled()
    expect(ctx.state.appSettings).toEqual({
      externalEndpoint: 'http://localhost:3000/api',
    })
  })
  it('should return error when getAppSettings is rejected', async () => {
    const ctx = {
      state: {},
      clients: {
        apps: {
          getAppSettings: jest
            .fn()
            .mockRejectedValueOnce(new Error("Couldn't get app settings")),
        },
      },
      vtex: { logger: { debug: jest.fn() } },
    } as any

    const next = jest.fn()

    await expect(setupAppConfiguration(ctx, next)).rejects.toThrow(
      "Couldn't get app settings"
    )
  })
})
