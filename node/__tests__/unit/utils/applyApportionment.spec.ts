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
})
