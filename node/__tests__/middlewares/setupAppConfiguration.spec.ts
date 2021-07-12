import { setupAppConfiguration } from '../../middlewares'

describe('setupAppConfiguration', () => {
  const ctx = {
    state: {},
    clients: {
      apps: { getAppSettings: jest.fn() },
    },
    vtex: { logger: { debug: jest.fn() } },
  } as any

  it('should insert the app settings into context', async () => {
    const spyGetAppSettings = jest.spyOn(ctx.clients.apps, 'getAppSettings')
    spyGetAppSettings
      .mockImplementation()
      .mockResolvedValueOnce({
        externalEndpoint: 'http://localhost:3000/api',
      })
    const next = jest.fn()

    await setupAppConfiguration(ctx, next)
    expect(spyGetAppSettings).toHaveBeenCalled()
    expect(ctx.state.appSettings).toEqual({
      externalEndpoint: 'http://localhost:3000/api',
    })
  })
  it('should return error when getAppSettings is rejected', async () => {
    jest
      .spyOn(ctx.clients.apps, 'getAppSettings')
      .mockImplementation()
      .mockRejectedValueOnce(new Error("Couldn't get app settings"))

    const next = jest.fn()

    await expect(setupAppConfiguration(ctx, next)).rejects.toThrow(
      "Couldn't get app settings"
    )
  })
})
