import type {
  OrderForm,
  OrderFormItem,
  PaymentDetail,
  TransactionDetail,
} from '@vtex/clients'

interface CheckoutItem extends OrderFormItem {
  modalType: string
  manualPrice: Optional<number>
  attachments: any[]
  offerings: any[]
}

interface CheckoutOrderForm extends OrderForm {
  items: CheckoutItem[]
  paymentData: {
    transactions: TransactionDetail[]
    payments: PaymentDetail[]
  }
}
