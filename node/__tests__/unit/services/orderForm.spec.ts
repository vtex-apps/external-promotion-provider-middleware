import { orderform as orderformService } from '../../../services'

describe('orderform', () => {
  describe('getOrderFormById', () => {
    it('should be able to return the orderform', async () => {
      const ctx = {
        clients: {
          checkout: {
            orderForm: jest.fn().mockResolvedValueOnce({ items: [] }),
          },
        },
      }

      const orderformId = '1'
      const orderform = await orderformService.getOrderFormById(
        ctx.clients.checkout as any,
        orderformId
      )

      expect(orderform).toMatchObject({ items: [] })
    })
    it('should be able to throw error when orderform can not be fecthed', async () => {
      const ctx = {
        clients: {
          checkout: {
            orderForm: jest.fn().mockRejectedValueOnce(''),
          },
        },
      }

      const orderformId = '1'

      await expect(
        orderformService.getOrderFormById(
          ctx.clients.checkout as any,
          orderformId
        )
      ).rejects.toThrowError('Error when fetching orderform')
    })
  })
  describe('deleteAllManualPrices', () => {
    it('should be able to return the orderform without manual prices', async () => {
      const ctx = {
        clients: {
          checkout: {
            updateItems: jest.fn().mockResolvedValueOnce({ items: [] }),
          },
        },
      }

      const currentOrderform = {
        items: [{ id: 1 }, { id: 2 }],
        orderFormId: '1',
      }

      const spyUpdateItems = jest.spyOn(ctx.clients.checkout, 'updateItems')

      const orderform = await orderformService.deleteAllManualPrices(
        ctx.clients.checkout as any,
        currentOrderform as any
      )

      expect(spyUpdateItems).toHaveBeenCalledWith(
        currentOrderform.orderFormId,
        [
          {
            index: 0,
            price: null,
          },
          {
            index: 1,
            price: null,
          },
        ],
        'AUTH_TOKEN'
      )

      expect(orderform).toMatchObject({ items: [] })
    })
    it('should be able to throw error when updateItems fails', async () => {
      const ctx = {
        clients: {
          checkout: {
            updateItems: jest.fn().mockRejectedValueOnce(''),
          },
        },
      }

      const currentOrderform = { items: [], orderformId: '1' }

      await expect(
        orderformService.deleteAllManualPrices(
          ctx.clients.checkout as any,
          currentOrderform as any
        )
      ).rejects.toThrowError(
        'Error when removing all manual prices from orderform'
      )
    })
  })
})
