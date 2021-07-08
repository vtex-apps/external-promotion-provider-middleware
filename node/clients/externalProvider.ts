import type { InstanceOptions, IOContext, IOResponse } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class ExternalProvider extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    // TODO: Validate how to add an outbound policy dynamically to hosts
    super(context.settings.url, context, options)
  }

  public async getBenefits(payload: any): Promise<any> {
    // TODO: Implement external request
    return this.http.post(
      '/',
      {},
      {
        // TODO: Change metric
        metric: 'status-get',
      }
    )
  }
}
