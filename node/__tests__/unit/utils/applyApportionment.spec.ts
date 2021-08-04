/* eslint-disable jest/no-mocks-import */
import { applyApportionment } from '../../../utils'
import { parsedProtocol } from '../../../__mocks__/parsedProtocol'
import { externalProviderResponse } from '../../../__mocks__/externalProviderResponse'

describe('applyApportionment', () => {
  it('should be able to apply the apportionment properly', () => {
    const apportionedPayload = applyApportionment(
      parsedProtocol as any,
      externalProviderResponse
    )

    const expectedPayload = [
      {
        index: 0,
        price: 533,
      },
      {
        index: 3,
        price: 1850,
      },
    ]

    expect(apportionedPayload).toMatchObject(expectedPayload)
  })
  it('should be able to throw error when skuId has two instances at the items array', () => {
    const { items } = parsedProtocol

    items.push({
      id: '30',
      productId: '3',
      variations: [
        {
          assemblies: [],
          tax: 0,
          price: 135714,
          listPrice: 135714,
          manualPrice: null,
          sellingPrice: 135714,
          quantity: 1,
        },
      ],
    } as any)

    const newParsedProtocol = { ...parsedProtocol, items: [...items] }

    expect(() => {
      applyApportionment(newParsedProtocol as any, externalProviderResponse)
    }).toThrowError(`Multiple items with SKUID 30`)
  })
})
