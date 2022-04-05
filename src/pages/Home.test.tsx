import { screen } from '@testing-library/react'
import { rest } from 'msw'
import { AppContextProvider } from '../context'
import { server } from '../setupTests'
import { renderWithClient } from '../tests/utils'
import { Home } from './Home'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

function getRenderResult() {
  const result = renderWithClient(
    <BrowserRouter>
      <AppContextProvider>
        <Home />
      </AppContextProvider>
    </BrowserRouter>
  )
  return result
}

describe('Home page', () => {
  test('home page shows products which can be filtered by category', async () => {
    const result = getRenderResult()

    //by default 16 products are shown on the home page
    expect(await result.findAllByRole('article')).toHaveLength(16)
    //there are three categories
    expect(screen.getByText(/all/i)).toBeInTheDocument()
    expect(screen.getByText(/^fruit/i)).toBeInTheDocument()
    expect(screen.getByText(/vegetables/i)).toBeInTheDocument()
    //click on category 'fruit'
    userEvent.click(screen.getByText(/^fruit/i))
    //there are 8 products in this category
    expect(await result.findAllByRole('article')).toHaveLength(8)
    //back to 'all'
    userEvent.click(screen.getByText(/all/i))
    //again all 16 products are on the page
    expect(await result.findAllByRole('article')).toHaveLength(16)
    //now choose 'vegetables'
    userEvent.click(screen.getByText(/vegetables/i))
    //8 products from this category are on the page
    expect(await result.findAllByRole('article')).toHaveLength(8)
  })

  test('query failure', async () => {
    server.use(
      rest.get('*', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    const result = getRenderResult()
    expect(
      await result.findByText(
        /sorry, data could not be fetched. please try again later./i
      )
    ).toBeInTheDocument()
  })
})
