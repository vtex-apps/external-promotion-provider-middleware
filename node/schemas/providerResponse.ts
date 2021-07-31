import * as yup from 'yup'
import mapValues from 'lodash/mapValues'

import { orderFormRootFields } from '../constants/oderformRootFields'

export const providerResponseSchema = yup.object().shape({
  items: yup
    .array()
    .of(
      yup.object({
        id: yup.number().required(),
        variations: yup
          .array()
          .of(
            yup.object({
              requestIndex: yup.number().required(),
              quantity: yup.number().required(),
              externalPromotions: yup.array().of(
                yup.object({
                  matchedParameters: yup.lazy((obj) =>
                    yup.object(
                      mapValues(obj, (_, key) => {
                        if (orderFormRootFields.includes(key)) {
                          return yup
                            .string()
                            .required()
                            .test(
                              'length',
                              'Must have less than 150 characters',
                              (val) => Number(val?.length) < 150
                            )
                        }

                        return yup
                          .string()
                          .test(
                            'length',
                            `Object key '${key}' inside matchedParameters does not exist in the root of orderForm`,
                            (__) => false
                          )
                      })
                    )
                  ),
                  identifier: yup.string(),
                  isPercentual: yup.boolean().required(),
                  value: yup.number().required(),
                })
              ),
            })
          )
          .required(),
      })
    )
    .required(),
})
