import type Cookies from 'cookies'

export function getOrderFormId(cookies: Cookies, state: State) {
  state.orderFormId = cookies.get('checkout.vtex.com')?.slice(7)
  if (!state.orderFormId) {
    throw new Error(
      'No checkout.vtex.com cookie containing the orderformId was sent'
    )
  }
}
