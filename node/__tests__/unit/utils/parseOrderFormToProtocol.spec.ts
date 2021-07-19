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
})
