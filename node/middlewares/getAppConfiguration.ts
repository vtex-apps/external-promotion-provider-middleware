type IAppSettings = { externalEndpoint: string }

const getAppConfiguration = async (ctx: Context, next: () => Promise<any>) => {
  const { apps } = ctx.clients

  try {
    const appSettings: IAppSettings = await apps.getAppSettings(
      process.env.VTEX_APP_ID as string
    )

    ctx.state.appSettings = appSettings
  } catch (error) {
    ctx.vtex.logger.error({
      getAppSettingsError: {
        status: 'failed',
        content: error,
      },
    })
    throw new Error("Couldn't get app settings")
  }

  await next()
}

export default getAppConfiguration
