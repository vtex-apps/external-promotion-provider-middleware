type IAppSettings = { externalEndpoint: string }

const getAppConfiguration = async (ctx: Context, next: () => Promise<any>) => {
  const {
    clients: { apps },
    vtex: { account, workspace },
  } = ctx

  try {
    const appSettings: IAppSettings = await apps.getAppSettings(
      process.env.VTEX_APP_ID as string
    )

    ctx.vtex.settings = { ...ctx.vtex.settings, ...appSettings }

    if (!ctx.vtex.settings.externalEndpoint) {
      throw new Error(
        `No external endpoint was set. Go to https://${workspace}--${account}.myvtex.com/admin/apps/${process.env.VTEX_APP_ID}/setup/ and set your external endpoint`
      )
    }
  } catch (error) {
    ctx.vtex.logger.error({
      getAppSettingsError: {
        status: 'failed',
        content: error,
      },
    })

    ctx.status = 400
    ctx.body = { error: error.message }

    return
  }

  await next()
}

export default getAppConfiguration
