import orderFormConfigurationService from '../../../services/orderFormConfiguration'

const configuration = {
  allowManualPrice: true,
  apps: [
    {
      fields: ['externalPromotions'],
      id: 'promotion-provider-middleware',
      major: 0,
    },
  ],
}

function orderformConfiguration(
  withExternalProvider: boolean,
  allowManualPrice = false
) {
  const apps = [
    {
      fields: ['marketplacePaymentMethod'],
      id: 'cn-magazineluiza-integration',
      major: 1,
    },
  ]

  const externalPromotions = {
    fields: ['externalPromotions'],
    id: 'promotion-provider-middleware',
    major: 1,
  }

  return {
    allowManualPrice,
    apps: [...apps, withExternalProvider && externalPromotions],
  }
}

describe('orderFormConfigurationService', () => {
  describe('getOrderFormConfiguration', () => {
    it('should be able to set isAppAlreadySet as true', async () => {
      const checkout = {
        getOrderFormConfiguration: jest
          .fn()
          .mockResolvedValueOnce(orderformConfiguration(true)),
      }

      const {
        isAppAlreadySet,
      } = await orderFormConfigurationService.getCurrentConfiguration(
        checkout as any
      )

      expect(isAppAlreadySet).toBe(true)
    })
    it('should be able to set isAppAlreadySet as false', async () => {
      const checkout = {
        getOrderFormConfiguration: jest
          .fn()
          .mockResolvedValueOnce(orderformConfiguration(false)),
      }

      const {
        isAppAlreadySet,
      } = await orderFormConfigurationService.getCurrentConfiguration(
        checkout as any
      )

      expect(isAppAlreadySet).toBe(false)
    })
  })

  describe('setOrderFormConfiguration', () => {
    it('should not call setOrderFormConfiguration when isAppAlreadySet and isManualPriceTrue are true', async () => {
      const checkout = {
        setOrderFormConfiguration: jest.fn(),
        getOrderFormConfiguration: jest
          .fn()
          .mockResolvedValueOnce(orderformConfiguration(true, true)),
      }

      await orderFormConfigurationService.setConfiguration({
        client: checkout as any,
        configuration: configuration as any,
      })

      expect(checkout.setOrderFormConfiguration).not.toHaveBeenCalled()
    })
    it('should call setOrderFormConfiguration when isManualPriceTrue is false', async () => {
      const checkout = {
        setOrderFormConfiguration: jest.fn(),
        getOrderFormConfiguration: jest
          .fn()
          .mockResolvedValueOnce(orderformConfiguration(true)),
      }

      await orderFormConfigurationService.setConfiguration({
        client: checkout as any,
        configuration: configuration as any,
      })

      expect(checkout.setOrderFormConfiguration).toHaveBeenCalled()
    })
    it('should call setOrderFormConfiguration when isAppAlreadySet is false', async () => {
      const checkout = {
        setOrderFormConfiguration: jest.fn(),
        getOrderFormConfiguration: jest
          .fn()
          .mockResolvedValueOnce(orderformConfiguration(false, true)),
      }

      await orderFormConfigurationService.setConfiguration({
        client: checkout as any,
        configuration: configuration as any,
      })

      expect(checkout.setOrderFormConfiguration).toHaveBeenCalled()
    })
    it('should call setOrderFormConfiguration when isAppAlreadySet and isManualPriceTrue are false', async () => {
      const checkout = {
        setOrderFormConfiguration: jest.fn(),
        getOrderFormConfiguration: jest
          .fn()
          .mockResolvedValueOnce(orderformConfiguration(false, false)),
      }

      await orderFormConfigurationService.setConfiguration({
        client: checkout as any,
        configuration: configuration as any,
      })

      expect(checkout.setOrderFormConfiguration).toHaveBeenCalled()
    })
    it('should throw error when setOrderFormConfiguration fails', async () => {
      const checkout = {
        setOrderFormConfiguration: jest.fn().mockRejectedValueOnce({}),
        getOrderFormConfiguration: jest
          .fn()
          .mockResolvedValueOnce(orderformConfiguration(true)),
      }

      const { setConfiguration } = orderFormConfigurationService

      await expect(
        setConfiguration({
          client: checkout as any,
          configuration: configuration as any,
        })
      ).rejects.toThrow('Error while setting orderform configuration')
    })
  })
})
