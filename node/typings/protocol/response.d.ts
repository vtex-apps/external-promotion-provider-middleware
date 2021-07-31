export type MatchedParametersKeys =
  | 'items'
  | 'customData'
  | 'shippingData'
  | 'clientProfileData'
  | 'marketingData'
  | 'paymentData'

export interface ExternalPromotionsResponseProtocol {
  items: Item[]
}

export interface MatchedParameters {
  [key: MatchedParametersKeys]: string
}

export interface ExternalPromotion {
  matchedParameters: MatchedParameters
  identifier: string
  isPercentual: boolean
  value: number
}

export interface Variation {
  requestIndex: number
  quantity: number
  externalPromotions: ExternalPromotion[]
}

export interface Item {
  id: number
  variations: Variation[]
}
