import { render, screen } from '@testing-library/react'
import { AppContext, AppProps, BasketItem, initialState } from '../context'
import { Basket } from './Basket'
import { testActions } from '../tests/test-actions'
import userEvent from '@testing-library/user-event'

const testBasket: BasketItem[] = [
  {
    id: '1',
    name: 'Apples',
    quantity: 3,
    price: 2.95,
    img: '/images/fruit/apples.jpg',
  },
  {
    id: '11',
    name: 'Pears',
    quantity: 2,
    price: 3.75,
    img: '/images/fruit/pears.jpg',
  },
]

function getRenderResult(basketAction: () => void) {
  const result = render(
    <AppContext.Provider
      value={{
        ...initialState,
        ...testActions,
        basket: testBasket,
        increase: basketAction,
        decrease: basketAction,
        clearBasket: basketAction,
      }}
    >
      <Basket />
    </AppContext.Provider>
  )
  return result
}

describe('Basket component', () => {
  test('basket containing added products is shown, users can increase or decrease the quantity of each product and clear the basket if necessary', () => {
    const basketAction = jest.fn()
    const result = getRenderResult(basketAction)
    expect(result.getByText(/apples/i)).toBeInTheDocument()
    expect(result.getByText(/pears/i)).toBeInTheDocument()
    userEvent.click(
      result.getAllByRole('button', { name: /decrease by 1 kg/i })[0]
    )
    userEvent.click(
      result.getAllByRole('button', { name: /increase by 1 kg/i })[0]
    )
    userEvent.click(result.getByRole('button', { name: /clear basket/i }))
    expect(basketAction).toHaveBeenCalledTimes(3)
  })
})
