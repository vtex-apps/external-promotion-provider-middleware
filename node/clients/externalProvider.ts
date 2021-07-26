import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

import type { ExternalPromotionsRequestProtocol } from '../typings/protocol/request'
import type { ExternalPromotionsResponseProtocol } from '../typings/protocol/response'

export default class ExternalProvider extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    // TODO: Validate how to add an outbound policy dynamically to hosts
    super(context.settings.externalEndpoint, context, options)
  }

  /* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unused-vars */
  // @ts-ignore
  public async getBenefits(
    payload: ExternalPromotionsRequestProtocol
  ): Promise<ExternalPromotionsResponseProtocol> {
    // TODO: Implement external request

    try {
      const response = await this.http.post<ExternalPromotionsResponseProtocol>(
        '/',
        payload,
        {
          // TODO: Change metric
          metric: 'status-get',
        }
      )

      return response
    } catch (err) {
      throw new Error(
        `External endpoint (${this.context.settings.externalEndpoint}) returned error. ${err}`
      )
    }
  }
}
