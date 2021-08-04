/* eslint-disable jest/no-mocks-import */
import { parseOrderFormToProtocol } from '../../../utils'
import { orderForm } from '../../../__mocks__/orderForm'
import { parsedProtocol } from '../../../__mocks__/parsedProtocol'

describe('parseOrderFormToProtocol', () => {
  it('should return the protocol parsed', async () => {
    expect(parseOrderFormToProtocol(orderForm as any)).toMatchObject(
      parsedProtocol
    )
  })
  it('should be able to throw error when payload has no items array', async () => {
    expect(() => {
      parseOrderFormToProtocol({
        customData: {},
        paymentData: { payment: '' },
      } as any)
    }).toThrowError('Property "items" is obligatory')
  })
  it('should be able to throw error when items array has no skuId', async () => {
    expect(() => {
      parseOrderFormToProtocol({
        items: [
          { id: 33, otherfield: '' },
          { id: 23, otherfield: '' },
          { otherfield: '' },
        ],
        customData: {},
      } as any)
    }).toThrowError(
      `Property "id" is missing in index 2 inside Items Array (this property is obligatory)`
    )
  })
})
