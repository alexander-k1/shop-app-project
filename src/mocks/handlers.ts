import { DefaultRequestBody, PathParams, rest } from 'msw'
import data from '../data'
import { Product } from '../hooks/useProduct'

type RequestParams = {
  //with interface Typescript throws an error, hence type
  productID: string
}

export const handlers = [
  rest.get<DefaultRequestBody, PathParams, Product[]>(
    '/api/products',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.delay(), ctx.json(data))
    }
  ),
  rest.get<DefaultRequestBody, RequestParams, Product>(
    '/api/product/:productID',
    (req, res, ctx) => {
      const { productID } = req.params
      const requestedProduct = data.find((item) => item.id === productID)
      if (!requestedProduct)
        return res(ctx.status(404, 'Product with this ID has not been found'))
      return res(ctx.status(200), ctx.delay(), ctx.json(requestedProduct))
    }
  ),
]
