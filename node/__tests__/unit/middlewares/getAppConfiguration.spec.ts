import { getAppConfiguration } from '../../../middlewares'

describe('getAppConfiguration', () => {
  const ctx = {
    clients: {
      apps: { getAppSettings: jest.fn() },
    },
    vtex: { logger: { error: jest.fn() }, settings: {} },
  } as any

  it('should insert the app settings into context', async () => {
    const spyGetAppSettings = jest.spyOn(ctx.clients.apps, 'getAppSettings')

    spyGetAppSettings.mockImplementation().mockResolvedValueOnce({
      externalEndpoint: 'http://localhost:3000/api',
    })
    const next = jest.fn()

    await getAppConfiguration(ctx, next)
    expect(spyGetAppSettings).toHaveBeenCalled()
    expect(ctx.vtex.settings.externalEndpoint).toEqual(
      'http://localhost:3000/api'
    )
  })
  it('should return error when getAppSettings is rejected', async () => {
    jest
      .spyOn(ctx.clients.apps, 'getAppSettings')
      .mockImplementation()
      .mockRejectedValueOnce(new Error())

    const next = jest.fn()

    await expect(getAppConfiguration(ctx, next)).rejects.toThrow(
      "Couldn't get app settings"
    )
  })
})