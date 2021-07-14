import { getAppConfiguration } from '../../../middlewares'

describe('getAppConfiguration', () => {
  const ctx = {
    state: {},
    clients: {
      apps: { getAppSettings: jest.fn() },
    },
    vtex: { logger: { error: jest.fn() } },
  } as any

  it('should insert the app settings into context', async () => {
    const spyGetAppSettings = jest.spyOn(ctx.clients.apps, 'getAppSettings')

    spyGetAppSettings.mockImplementation().mockResolvedValueOnce({
      externalEndpoint: 'http://localhost:3000/api',
    })
    const next = jest.fn()

    await getAppConfiguration(ctx, next)
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

    await expect(getAppConfiguration(ctx, next)).rejects.toThrow(
      "Couldn't get app settings"
    )
  })
})
