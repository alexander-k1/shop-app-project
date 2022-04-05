import { screen } from '@testing-library/react'
import { rest } from 'msw'
import { AppContextProvider } from '../context'
import { server } from '../setupTests'
import { renderWithClient } from '../tests/utils'
import { Product } from './Product'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

function getRenderResult() {
  const result = renderWithClient(
    <BrowserRouter>
      <AppContextProvider>
        <Product />
      </AppContextProvider>
    </BrowserRouter>
  )
  return result
}
describe('Product page', () => {
  test('allows adding up to 10 kg of each product to the basket', async () => {
    const result = getRenderResult()
    const productQuantity = await result.findByRole('spinbutton', {
      name: /you can buy up to 10 kg of each product/i,
    })
    //product name is shown on the page
    expect(await result.findByText(/apples/i)).toBeInTheDocument()
    //"add to basket" button is initially disabled
    expect(
      await result.findByRole('button', {
        name: /add to basket/i,
      })
    ).toBeDisabled()
    //set quantity to 10 kg
    userEvent.type(productQuantity, '10')
    //"add to basket" button is no longer disabled
    expect(
      result.getByRole('button', {
        name: /add to basket/i,
      })
    ).not.toBeDisabled()
    //modal invisible
    expect(screen.getByRole('alert')).not.toHaveClass('showModal')
    //click "add to basket" button
    userEvent.click(
      result.getByRole('button', {
        name: /add to basket/i,
      })
    )
    //modal appears
    expect(screen.getByRole('alert')).toHaveClass('showModal')
    //close modal
    userEvent.click(
      screen.getByRole('button', {
        name: /continue shopping/i,
      })
    )
    //modal invisible again
    expect(await screen.findByRole('alert')).not.toHaveClass('showModal')
    //try to add 1 kg
    userEvent.type(productQuantity, '1')
    //"add to basket" button remains disabled, because we've already added the maximum possible quantity
    expect(
      await result.findByRole('button', {
        name: /add to basket/i,
      })
    ).toBeDisabled()
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
        /sorry, data could not be fetched. if the url is correct, please try again later/i
      )
    ).toBeInTheDocument()
  })
})
