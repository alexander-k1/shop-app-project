import { render } from '@testing-library/react'
import { rest } from 'msw'
import * as React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import data from '../data'

export const handlers = [
  rest.get('https://vintage-carp.glitch.me/api/product/*', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: '1',
        name: 'Apples',
        category: 'fruit',
        price: 2.95,
        info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ab quidem consequatur, maiores ratione in cumque magnam, aut culpa molestiae itaque, repellendus ex corrupti tenetur id repellat obcaecati ipsam quasi quae? Aperiam placeat eius perferendis adipisci quasi ratione sunt est nemo qui, esse nam totam reiciendis cumque, nulla sit, sequi quo quisquam deleniti modi soluta.',
        img: '/images/fruit/apples.jpg',
      })
    )
  }),
  rest.get('https://vintage-carp.glitch.me/api/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(), ctx.json(data))
  }),
]

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient()
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  )
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          {rerenderUi}
        </QueryClientProvider>
      ),
  }
}

export function createWrapper() {
  const testQueryClient = createTestQueryClient()
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  )
}
