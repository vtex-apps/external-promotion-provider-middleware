import * as yup from 'yup'
import mapValues from 'lodash/mapValues'

export const providerResponseSchema = yup.object().shape({
  items: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number().required(),
        variations: yup
          .array()
          .of(
            yup.object().shape({
              requestIndex: yup.number().required(),
              quantity: yup.number().required(),
              externalPromotions: yup
                .array()
                .of(
                  yup.object().shape({
                    identifier: yup.string(),
                    isPercentual: yup.boolean().required(),
                    value: yup.number().required(),
                    matchedParameters: yup.lazy((obj) =>
                      yup.object(
                        mapValues(obj, (value, key) => {
                          return yup
                            .string()
                            .required()
                            .test(
                              'length',
                              `Key ${key} inside matchedParameters must have less than (or equal) 50 characters.`,
                              () => Number(key?.length) <= 50
                            )
                            .test(
                              'length',
                              `Value ${value} in key ${key} (matchedParameters array) must have less than (or equal) 50 characters.`,
                              (val) => Number(val?.length) <= 50
                            )
                        })
                      )
                    ),
                  })
                )
                .required()
                .test({
                  message:
                    'externalPromotions array should have at least one object.',
                  test: (arr) => !!arr?.length,
                }),
            })
          )
          .required()
          .test({
            message: 'variations array should have at least one object.',
            test: (arr) => !!arr?.length,
          }),
      })
    )
    .required(),
})
