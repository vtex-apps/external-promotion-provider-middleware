import { getAppConfiguration } from '../../../middlewares'

describe('getAppConfiguration', () => {
  const ctx = {
    body: '',
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
  it('should return error when there is no externalProvider set', async () => {
    ctx.vtex.settings.externalEndpoint = undefined
    const spyGetAppSettingsError = jest.spyOn(
      ctx.clients.apps,
      'getAppSettings'
    )

    spyGetAppSettingsError.mockImplementation().mockResolvedValueOnce({})

    const next = jest.fn()

    await getAppConfiguration(ctx, next)

    expect(ctx.body).toMatchObject({
      error: `No external endpoint was set. Go to https://${process.env.VTEX_WORKSPACE}--${process.env.VTEX_ACCOUNT}.myvtex.com/admin/apps/${process.env.VTEX_APP_ID}/setup/ and set your external endpoint`,
    })
  })
  it('should return error when getAppSettings is rejected', async () => {
    const spyGetAppSettingsError = jest.spyOn(
      ctx.clients.apps,
      'getAppSettings'
    )

    spyGetAppSettingsError
      .mockImplementation()
      .mockRejectedValueOnce(new Error('Failed to get app settings'))

    const next = jest.fn()

    await getAppConfiguration(ctx, next)

    expect(ctx.body).toMatchObject({
      error: 'Failed to get app settings',
    })
  })
})
