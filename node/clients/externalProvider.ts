import type { InstanceOptions, IOContext, IOResponse } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class ExternalProvider extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    // TODO: Validate how to add an outbound policy dynamically to hosts
    super(context.settings.externalEndpoint, context, options)
  }

  /* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unused-vars */
  // @ts-ignore
  public async getBenefits(payload: any): Promise<IOResponse<any>> {
    // TODO: Implement external request

    return this.http.post(
      '/',
      payload,
      {
        // TODO: Change metric
        metric: 'status-get',
      }
    )
  }
}
