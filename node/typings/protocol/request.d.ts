export interface ExternalPromotionsRequestProtocol {
  items: Item[]
  customData: CustomData
  shippingData: ShippingData
  clientProfileData: ClientProfileData
  marketingData?: MarketingData
  paymentData: PaymentData
  totalizers: Totalizer[]
}

export interface Totalizer {
  id: string
  name: string
  value: number
}

export interface MarketingData {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmipage?: string
  utmiPart?: string
  utmiCampaign?: string
  coupon?: string
  marketingTags: any[]
}

export interface ProductCategories {
  [key: string]: string
}
export interface Content {
  [key: string]: any
}

export interface Attachment {
  name: string
  content: Content
}

export interface AttachmentOffering {
  name: string
  required: boolean
  schema: any
}

export interface PriceTag {
  name: string
  value: number
  rawValue: number
  isPercentual: boolean
  identifier: string
}

export interface Variation {
  index: number
  assemblies: any[]
  tax: number
  price: number
  listPrice: number
  manualPrice?: any
  sellingPrice: number
  isGift: boolean
  quantity: number
  attachments: Attachment[]
  attachmentOfferings: AttachmentOffering[]
  offerings: any[]
  priceTags: PriceTag[]
  unitMultiplier: number
  seller: string
  sellerChain: string[]
}

export interface Item {
  id: string
  productId: string
  refId?: any
  ean: string
  name: string
  skuName: string
  modalType?: any
  productCategoryIds: string
  productCategories: ProductCategories
  availability: string
  measurementUnit: string
  variations: Variation[]
}

export interface Fields {
  [key: string]: string
}

export interface CustomApp {
  fields: Fields
  id: string
  major: number
}

export interface CustomData {
  customApps: CustomApp[]
}

export interface DeliveryId {
  courierId: string
  warehouseId: string
  dockId: string
  courierName: string
  quantity: number
  kitItemDetails: any[]
}

export interface PickupStoreInfo {
  isPickupStore: boolean
  friendlyName?: any
  address?: any
  additionalInfo?: any
  dockId?: any
}

export interface Sla {
  id: string
  deliveryChannel: string
  name: string
  deliveryIds: DeliveryId[]
  shippingEstimate: string
  shippingEstimateDate?: any
  lockTTL?: any
  availableDeliveryWindows: any[]
  deliveryWindow?: any
  price: number
  listPrice: number
  tax: number
  pickupStoreInfo: PickupStoreInfo
  pickupPointId?: any
  pickupDistance: number
  polygonName?: any
  transitTime: string
}

export interface DeliveryChannel {
  id: string
}

export interface LogisticsInfo {
  itemIndex: number
  selectedSla: string
  selectedDeliveryChannel: string
  addressId: string
  slas: Sla[]
  shipsTo: string[]
  itemId: string
  deliveryChannels: DeliveryChannel[]
}

export interface SelectedAddress {
  addressType: string
  receiverName: string
  addressId: string
  isDisposable: boolean
  postalCode: string
  city: string
  state: string
  country: string
  street: string
  number: string
  neighborhood: string
  complement: string
  reference?: any
  geoCoordinates: any[]
}

export interface ShippingData {
  logisticsInfo: LogisticsInfo[]
  selectedAddresses: SelectedAddress[]
}

export interface ClientProfileData {
  email: string
  firstName: string
  lastName: string
  document: string
  documentType: string
  phone: string
  corporateName?: any
  tradeName?: any
  corporateDocument?: any
  stateInscription?: any
  corporatePhone?: any
  isCorporate: boolean
  profileCompleteOnLoading: boolean
  profileErrorOnLoading: boolean
  customerClass?: any
}

export interface MerchantSellerPayment {
  id: string
  installments: number
  referenceValue: number
  value: number
  interestRate: number
  installmentValue: number
}

export interface Payment {
  paymentSystem: string
  bin: string
  accountId: string
  tokenId?: any
  installments: number
  referenceValue: number
  value: number
  merchantSellerPayments: MerchantSellerPayment[]
}

export interface PaymentData {
  payments: Payment[]
}
