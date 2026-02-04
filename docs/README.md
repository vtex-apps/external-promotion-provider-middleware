# Promotion Provider Middleware

[<i class="fa-brands fa-github"></i> Source code](https://github.com/vtex-apps/external-promotion-provider-middleware)

> ⚠️ This app is no longer maintained by VTEX. This means support and maintenance are no longer provided.

This app allows external providers to apply promotions to any SKUs in the shopping cart during an end-user checkout experience.

## Installation

You can install it through the command-line interface:

```
vtex install vtex.promotion-provider-middleware@0.x
```

Right after installation, the external endpoint must be configured. To make this configuration, go to the page `https://{{accountName}}.myvtex.com/admin/apps`, search for `Promotion Provider Middleware`, click on the Settings button, set the External Endpoint, and save your configurations.

Upon saving the settings, this application will set the whole environment to comply with its necessities, meaning that the following actions will be done automatically by the app:

* `allowManualPrice` will be set to `true` in the [orderForm Configurations](https://developers.vtex.com/vtex-rest-api/reference/configuration#getorderformconfiguration);
* Create a new object in the `apps` array at [orderForm Configurations](https://developers.vtex.com/vtex-rest-api/reference/configuration#getorderformconfiguration), this allows your promotions data to be stored in the customData object (inside orderForm) for every order.

Upon installation, the public routes will become instantly available to use.

It's worth mentioning that Order Authorization configurations could interfere with key functional aspects of this application. If the account has any Manual Discount rules configured, verify that the promotions applied by the external provider fall within the configured ranges. The impact is due to this application using [Update cart items](https://developers.vtex.com/vtex-rest-api/reference/cart-update#itemsupdate) to apply discounts.

## Syntax and supported routes

### Notification:
`POST /_v/promotion-provider/notification`

This route is responsible for consulting the external provider and applying the discounts afterwards.

All this route needs is the cookie `checkout.vtex.com` containing the orderformId in the format `__ofid={{orderFormId}}`. After receiving this cookie in the headers, the middleware will go through the following steps:

* Fetch the orderForm through the orderFormId sent inside the cookie;
* Clean all manual prices currently active in the orderForm;
* Parse the orderForm according to the protocol (more details later on);
* Send the payload to the external provider.

> Note that there's a 12.5-second timeout attributed to the external provider with 0 retries. Meaning that the external provider has this exact time to deliver a response to our application.

The object sent to the external provider looks like the following:

> The objects customData, shippingData, clientProfileData, and paymentData are exactly the same as seen in the orderForm.

```typescript
interface ExternalPromotionsRequestProtocol {
  items: {
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
    variations: {
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
    }[]
  }[]
  customData: CustomData
  shippingData: ShippingData
  clientProfileData: ClientProfileData
  marketingData?: MarketingData
  paymentData: PaymentData
  totalizers: {
    id: string
    name: string
    value: number
  }[]
}
```

When it comes to the external provider response, we expect the following objects (example at the end of this documentation):

```typescript
interface ExternalPromotionsResponseProtocol {
  items: {
    id: number
    variations: {
      requestIndex: number
      quantity: number
      externalPromotions: {
        matchedParameters: {[key: string]: string}
        identifier: string
        isPercentual: boolean
        value: number
      }[]
    }[]
  }[]
}
```

It's important to note that when `isPercentual` is `true`, the `value` property should contain a value between `0` and `1`, for example: `0.35`. If `isPercentual` is `false`, the `value` property should have negative values such as `-100` or `-2500` for a nominal discount of $1,00 and $25,00, respectively.

The `requestIndex` field (present in the external provider response) should match the index in the payload, while also accounting for its variations. If the payload sent contains 3 SKUs, but 1 SKU has 2 variations (due to a split index), your request index could range from 0 to 4. If this is not respected, the middleware will throw an error and not apply any discount.

> ⚠️ The `items` array (present in the external provider response) should <strong>only</strong> contain the items that will be affected by any promotion. If no items are expected to be impacted, the `items` array should be sent empty.

Note that the discount will be applied to the sum of the `price` for the skuId, based on its quantity. Also worth noting is that percentage discounts will be applied first, followed by nominal discounts.

> ❗ Reminder: We are talking about the `price` property in the orderForm; we are not talking about `sellingPrice` or `listPrice`.

The `matchedParameters` property should have `key` and `value` as strings with a maximum of 50 characters.

After the external provider response, if it all went well, the middleware will use the API [Update cart items](https://developers.vtex.com/vtex-rest-api/reference/cart-update#itemsupdate) to update the prices in the cart, respecting the discounts sent.

An important reminder: every promotion configured in the promotions module has a flag called `Allows accumulate with manual prices`. If this flag is checked, the external promotion will be applied first, and only then will the other promotions apply. 

### Example

`POST /_v/promotion-provider/simulation`

This route is responsible only for consulting the external provider and does not apply discounts.

In order to put this route in use, all you need to do is send a request body containing the `items` array, which for this route is exactly the same as it is in the orderForm.

Besides the `items` array, you could also send `customData`, `shippingData`, `clientProfileData`, `marketingData`, and `paymentData`.

> The only field required in this request is the `id` property inside each object present in the `items` array.

## External Provider Response Example (Response Body):

```json
{
    "items": [
        {
            "id": 33, //required
            "variations": [
                {
                    "requestIndex": 0, //required
                    "quantity": 1, //required
                    "externalPromotions": [
                        {
                            "matchedParameters": {
                                "slaIds": "transportadora genérica"
                            },
                            "identifier": "anyName",
                            "isPercentual": false, //required
                            "value": -200 //required
                        },
                        {
                            "matchedParameters": {
                                "skuId": "33"
                            },
                            "identifier": "10off",
                            "isPercentual": true, //required
                            "value": 0.10 //required
                        }
                    ]
                },
                {
                    "requestIndex": 1, //required
                    "quantity": 1, //required
                    "externalPromotions": [
                        {
                            "isPercentual": true, //required
                            "value": 0.50 //required
                        }
                    ]
                }
            ]
        }
    ]
}
```
