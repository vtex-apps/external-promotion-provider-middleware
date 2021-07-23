export interface CheckoutOrderForm {
  orderFormId: string
  salesChannel: string
  loggedIn: boolean
  isCheckedIn: boolean
  storeId?: any
  checkedInPickupPointId?: any
  allowManualPrice: boolean
  canEditData: boolean
  userProfileId: string | null
  userType?: any
  ignoreProfileData: boolean
  value: number
  messages: Message[]
  items: Item[]
  selectableGifts: any[]
  totalizers: Totalizer[]
  shippingData: ShippingData
  clientProfileData: ClientProfileData
  paymentData: PaymentData
  marketingData?: any
  sellers: Seller[]
  clientPreferencesData: ClientPreferencesData
  commercialConditionData?: any
  storePreferencesData: StorePreferencesData
  giftRegistryData?: any
  openTextField?: any
  invoiceData?: any
  customData: CustomData
  itemMetadata: ItemMetadata
  hooksData?: any
  ratesAndBenefitsData: RatesAndBenefitsData
  subscriptionData: SubscriptionData
  itemsOrdination?: any
}

export interface Message {
  code?: any
  text: string
  status: string
  fields: any
}

export interface AdditionalInfo {
  dimension?: any
  brandName: string
  brandId: string
  offeringInfo?: any
  offeringType?: any
  offeringTypeId?: any
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

export interface Schema {
  [key: string]: any
}

export interface AttachmentOffering {
  name: string
  required: boolean
  schema: Schema
}

export interface MatchedParameters {
  [key: string]: any
}

export interface RatesAndBenefitsIdentifier {
  id: string
  name: string
  featured: boolean
  description?: any
  matchedParameters: MatchedParameters
  additionalInfo?: any
}

export interface PriceTag {
  name: string
  value: number
  rawValue: number
  isPercentual: boolean
  identifier: string
  ratesAndBenefitsIdentifier: RatesAndBenefitsIdentifier
}

export interface SellingPrice {
  value: number
  quantity: number
}

export interface PriceDefinition {
  calculatedSellingPrice: number
  total: number
  sellingPrices: SellingPrice[]
}

export interface Item {
  uniqueId: string
  id: string
  productId: string
  productRefId: string
  refId: string
  ean: string
  name: string
  skuName: string
  modalType?: any
  parentItemIndex?: any
  parentAssemblyBinding?: any
  assemblies: any[]
  priceValidUntil: Date
  tax: number
  price: number
  listPrice: number
  manualPrice?: number
  manualPriceAppliedBy: string
  sellingPrice: number
  rewardValue: number
  isGift: boolean
  additionalInfo: AdditionalInfo
  preSaleDate?: any
  productCategoryIds: string
  productCategories: ProductCategories
  quantity: number
  seller: string
  sellerChain: string[]
  imageUrl: string
  detailUrl: string
  components: any[]
  bundleItems: any[]
  attachments: Attachment[]
  attachmentOfferings: AttachmentOffering[]
  offerings: any[]
  priceTags: PriceTag[]
  availability: string
  measurementUnit: string
  unitMultiplier: number
  manufacturerCode?: any
  priceDefinition: PriceDefinition
}

export interface Totalizer {
  id: string
  name: string
  value: number
}

export interface Address {
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

export interface AvailableAddress {
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
  address: Address
  logisticsInfo: LogisticsInfo[]
  selectedAddresses: SelectedAddress[]
  availableAddresses: AvailableAddress[]
  pickupPoints: any[]
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

export interface SellerMerchantInstallment {
  id: string
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
}

export interface Installment {
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
  sellerMerchantInstallments: SellerMerchantInstallment[]
}

export interface InstallmentOption {
  paymentSystem: string
  bin: string
  paymentName?: any
  paymentGroupName?: any
  value: number
  installments: Installment[]
}

export interface Validator {
  regex: string
  mask: string
  cardCodeRegex: string
  cardCodeMask: string
  weights: number[]
  useCvv: boolean
  useExpirationDate: boolean
  useCardHolderName: boolean
  useBillingAddress: boolean
}

export interface PaymentSystem {
  id: number
  name: string
  groupName: string
  validator: Validator
  stringId: string
  template: string
  requiresDocument: boolean
  isCustom: boolean
  description?: any
  requiresAuthentication: boolean
  dueDate: Date
  availablePayments?: any
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

export interface AvailableAccount {
  accountId: string
  paymentSystem: string
  paymentSystemName: string
  cardNumber: string
  bin: string
  availableAddresses: string[]
  expirationDate: string
  isExpired: boolean
}

export interface PaymentData {
  updateStatus: string
  installmentOptions: InstallmentOption[]
  paymentSystems: PaymentSystem[]
  payments: Payment[]
  giftCards: any[]
  giftCardMessages: any[]
  availableAccounts: AvailableAccount[]
  availableTokens: any[]
}

export interface Seller {
  id: string
  name: string
  logo: string
}

export interface ClientPreferencesData {
  locale: string
  optinNewsLetter: boolean
}

export interface CurrencyFormatInfo {
  currencyDecimalDigits: number
  currencyDecimalSeparator: string
  currencyGroupSeparator: string
  currencyGroupSize: number
  startsWithCurrencySymbol: boolean
}

export interface StorePreferencesData {
  countryCode: string
  saveUserData: boolean
  timeZone: string
  currencyCode: string
  currencyLocale: number
  currencySymbol: string
  currencyFormatInfo: CurrencyFormatInfo
}

export interface CustomApp {
  fields: any
  id: string
  major: number
}

export interface CustomData {
  customApps: CustomApp[]
}

export interface InputValues {
  [key: string]: any
}

export interface AssemblyOption {
  id: string
  name: string
  required: boolean
  inputValues: InputValues
  composition?: any
}

export interface ItemMetadata {
  items: any[]
}

export interface RateAndBenefitsIdentifier {
  id: string
  name: string
  featured: boolean
  description?: any
  matchedParameters: MatchedParameters
  additionalInfo?: any
}

export interface RatesAndBenefitsData {
  rateAndBenefitsIdentifiers: RateAndBenefitsIdentifier[]
  teaser: any[]
}

export interface Subscription {
  itemIndex: number
  plan: any
  executionCount: number
}

export interface SubscriptionData {
  subscriptions: Subscription[]
}
