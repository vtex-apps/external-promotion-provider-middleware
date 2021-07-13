import type { OrderFormConfiguration } from '@vtex/clients'

export const orderFormConfigurationConstant = {
  allowManualPrice: true,
  apps: [
    {
      fields: ['externalPromotions'],
      id: 'promotion-provider-middleware',
      major: 0,
    },
  ],
} as OrderFormConfiguration
