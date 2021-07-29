import type Cookies from 'cookies'

export function getOrderFormId(cookies: Cookies) {
  const orderFormId = cookies.get('checkout.vtex.com')?.slice(7)

  if (!orderFormId) {
    throw new Error(
      'No checkout.vtex.com cookie containing the orderformId was sent'
    )
  }

  return orderFormId
}
