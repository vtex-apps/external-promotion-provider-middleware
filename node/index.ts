import type {
  ClientsConfig,
  ServiceContext,
  RecorderState,
  EventContext,
} from '@vtex/api'
import { method, LRUCache, Service } from '@vtex/api'

import { Clients } from './clients'
import {
  setupAppConfiguration,
  getOrderFormById,
  calculateExternalBenefits,
  applyManualPrices,
  getAppConfiguration,
} from './middlewares'
import type { CheckoutOrderForm } from './typings/global'
import type { ExternalPromotionsRequestProtocol } from './typings/protocol/request'
import type { ExternalPromotionsResponseProtocol } from './typings/protocol/response'

const TIMEOUT_MS = 5500

// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('get-benefits', memoryCache)

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
  },
}

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients, State>

  interface InstalledAppEvent extends EventContext<Clients> {
    body: { id?: string }
  }

  interface State extends RecorderState {
    orderForm: CheckoutOrderForm
    orderFormId?: string
    appSettings: { externalEndpoint?: string }
    externalProviderResponse: ExternalPromotionsResponseProtocol
    parsedRequestProtocol: ExternalPromotionsRequestProtocol
  }
}

// Export a service that defines route handlers and client options.
export default new Service({
  clients,
  routes: {
    orderFormNotification: method({
      POST: [
        getAppConfiguration,
        getOrderFormById,
        calculateExternalBenefits,
        applyManualPrices,
      ],
    }),
    simulation: method({
      POST: [getAppConfiguration, calculateExternalBenefits],
    }),
  },
  events: {
    onAppInstalled: setupAppConfiguration,
    onSettingsChanged: setupAppConfiguration,
  },
})
