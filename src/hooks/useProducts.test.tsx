import { rest } from 'msw'
import * as React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { server } from '../setupTests'
import { createWrapper } from '../tests/utils'
import useProducts from './useProducts'

describe('query hook', () => {
  test('successful query hook', async () => {
    const { result, waitFor } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data?.length).toBe(16)
  })

  test('failure query hook', async () => {
    server.use(
      rest.get('*', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    const { result, waitFor } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => result.current.isError)

    expect(result.current.error).toBeDefined()
  })
})
