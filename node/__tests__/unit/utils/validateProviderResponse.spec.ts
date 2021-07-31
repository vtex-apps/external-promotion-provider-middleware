/* eslint-disable jest/no-mocks-import */
import { validateProviderResponse } from '../../../utils'
import { orderForm } from '../../../__mocks__/orderForm'
import { externalProviderResponse } from '../../../__mocks__/externalProviderResponse'

describe('validateProviderResponse', () => {
  describe('validateIndexConsistency method', () => {
    it('should be able to throw error when requestIndex does not match index in orderForm', () => {
      const mockedUncorrectProviderResponse = {
        items: [
          {
            id: 33,
            variations: [
              {
                requestIndex: 2,
                quantity: 1,
                externalPromotions: [
                  {
                    matchedParameters: {},
                    identifier: '3f0c2115-10a6-4fda-aec4-5950d8de9a6c',
                    isPercentual: true,
                    value: 0.1,
                  },
                ],
              },
            ],
          },
        ],
      }

      expect(() => {
        validateProviderResponse.indexConsistency(
          orderForm as any,
          mockedUncorrectProviderResponse
        )
      }).toThrowError(
        `RequestIndex from response does not match orderForm's original index for skuId ${mockedUncorrectProviderResponse.items[0].id}`
      )
    })
    it('should not throw error when requestIndex matches index in orderForm', () => {
      expect(
        validateProviderResponse.indexConsistency(
          orderForm as any,
          externalProviderResponse
        )
      ).toBeUndefined()
    })
  })
  describe('validateSchema method', () => {
    it('should be able to throw error when schema does not match', async () => {
      const mockedUncorrectProviderResponse = {
        items: [
          {
            id: '33',
            variations: [
              {
                requestIndex: '2',
                quantity: 1,
                externalPromotions: [
                  {
                    matchedParameters: { slaIds: '' },
                    identifier: 123443,
                    isPercentual: 'true',
                    value: '0.1',
                  },
                ],
              },
            ],
          },
        ],
      }

      await expect(
        validateProviderResponse.schemaConsistency(
          mockedUncorrectProviderResponse as any
        )
      ).rejects.toThrowError(
        'items[0].id must be a `number` type, but the final value was: `"33"`. items[0].variations[0].requestIndex must be a `number` type, but the final value was: `"2"`. Object key \'slaIds\' inside matchedParameters does not exist in the root of orderForm items[0].variations[0].externalPromotions[0].identifier must be a `string` type, but the final value was: `123443`. items[0].variations[0].externalPromotions[0].isPercentual must be a `boolean` type, but the final value was: `"true"`. items[0].variations[0].externalPromotions[0].value must be a `number` type, but the final value was: `"0.1"`.'
      )
    })
    it('should not throw error when schema does matches', async () => {
      const mockedCorrectProviderResponse = {
        items: [
          {
            id: 33,
            variations: [
              {
                requestIndex: 1,
                quantity: 1,
                externalPromotions: [
                  {
                    matchedParameters: {
                      items: 'tech genérica',
                    },
                    identifier: '3f0c2115-10a6-4fda-aec4-5950d8de9a6c',
                    isPercentual: true,
                    value: 0.1,
                  },
                  {
                    matchedParameters: {
                      items: 'tech genérica',
                    },
                    identifier: '3f0c2115-10a6-4fda-aec4-5950d8de9a6c',
                    isPercentual: true,
                    value: 0.1,
                  },
                ],
              },
            ],
          },
          {
            id: 30,
            variations: [
              {
                requestIndex: 4,
                quantity: 1,
                externalPromotions: [
                  {
                    matchedParameters: {
                      paymentData: 'tech genérica',
                    },
                    identifier: '3f0c2115-10a6-4fda-aec4-5950d8de9a6c',
                    isPercentual: true,
                    value: 0.1,
                  },
                ],
              },
              {
                requestIndex: 4,
                quantity: 1,
                externalPromotions: [
                  {
                    matchedParameters: {
                      paymentData: 'tech genérica',
                    },
                    identifier: '3f0c2115-10a6-4fda-aec4-5950d8de9a6c',
                    isPercentual: true,
                    value: 0.1,
                  },
                ],
              },
            ],
          },
        ],
      }

      expect(
        await validateProviderResponse.schemaConsistency(
          mockedCorrectProviderResponse as any
        )
      ).toBeUndefined()
    })
  })
})
