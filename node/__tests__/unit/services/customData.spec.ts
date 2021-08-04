/* eslint-disable jest/no-mocks-import */
import { customData } from '../../../services'
import { orderForm } from '../../../__mocks__/orderForm'
import { externalProviderResponse } from '../../../__mocks__/externalProviderResponse'

describe('customData', () => {
  const ctx = {
    clients: {
      checkout: {
        setSingleCustomData: jest.fn().mockResolvedValueOnce({ items: [] }),
      },
    },
  }

  it('should to call function setSingleCustomData with its respective params', async () => {
    await customData.setCustomData({
      client: ctx.clients.checkout,
      externalProviderResponse,
      orderForm,
    } as any)

    const spyOnSetSingleCustomData = jest.spyOn(
      ctx.clients.checkout,
      'setSingleCustomData'
    )

    const value =
      '[{"id":33,"externalPromotions":[{"matchedParameters":{"slaIds":"transportadora genérica"},"identifier":"3f0c2115-10a6-4fda-aec4-5950d8de9a6c","isPercentual":false,"value":-700},{"matchedParameters":{"slaIds":"transportadora genérica"},"identifier":"3f0c2115-10a6-4fda-aec4-5950d8de9a6c","isPercentual":false,"value":-100},{"matchedParameters":{"slaIds":"transportadora genérica"},"identifier":"3f0c2115-10a6-4fda-aec4-5950d8de9a6c","isPercentual":true,"value":0.2}]},{"id":30,"externalPromotions":[{"matchedParameters":{"dockId":"2343b"},"identifier":"3f0c2115-10a6-4fda-aec4-5950d8de9a6c","isPercentual":false,"value":-100},{"matchedParameters":{"skuName":"SKU 23 - Celular"},"identifier":"3f0c2115-10a6-4fda-aec4-5950d8de9a6c","isPercentual":false,"value":-500}]}]'

    expect(spyOnSetSingleCustomData).toBeCalledWith(
      orderForm.orderFormId,
      {
        appId: 'promotion-provider-middleware',
        appFieldName: 'externalPromotions',
        value,
      },
      'AUTH_TOKEN'
    )
  })
  it('should be able to throw an error when setSingleCustomData fails', async () => {
    jest
      .spyOn(ctx.clients.checkout, 'setSingleCustomData')
      .mockImplementation()
      .mockRejectedValueOnce('')

    await expect(
      customData.setCustomData({
        client: ctx.clients.checkout,
        externalProviderResponse,
        orderForm,
      } as any)
    ).rejects.toThrowError('It was not possible to set customData.')
  })
})
