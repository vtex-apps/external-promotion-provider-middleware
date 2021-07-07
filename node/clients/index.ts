import { IOClients } from '@vtex/api'

import Checkout from './checkout'
import ExternalProvider from './externalProvider'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get checkout() {
    return this.getOrSet('checkout', Checkout)
  }

  public get externalProvider() {
    return this.getOrSet('externalProvider', ExternalProvider)
  }
}
