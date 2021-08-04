import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

import type { ExternalPromotionsRequestProtocol } from '../typings/protocol/request'
import type { ExternalPromotionsResponseProtocol } from '../typings/protocol/response'

const TIMEOUT_EXTERNAL = 12500

export default class ExternalProvider extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context.settings.externalEndpoint, context, options)
  }

  public async getBenefits(
    payload: ExternalPromotionsRequestProtocol
  ): Promise<ExternalPromotionsResponseProtocol> {
    try {
      const response = await this.http.post<ExternalPromotionsResponseProtocol>(
        '/',
        payload,
        {
          metric: 'get-benefits',
          timeout: TIMEOUT_EXTERNAL,
          timeoutErrorMessage:
            'Timeout waiting for response from external provider',
          retries: 0,
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
