import { rest } from 'msw'
import * as React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { server } from '../setupTests'
import { createWrapper } from '../tests/utils'
import useProduct from './useProduct'

describe('query hook', () => {
  test('successful query hook', async () => {
    const { result, waitFor } = renderHook(() => useProduct('1'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data?.name).toBe('Apples')
  })

  test('failure query hook', async () => {
    server.use(
      rest.get('*', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    const { result, waitFor } = renderHook(() => useProduct('111'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => result.current.isError)

    expect(result.current.error).toBeDefined()
  })
})
