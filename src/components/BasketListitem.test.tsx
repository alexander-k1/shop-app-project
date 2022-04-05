import { render } from '@testing-library/react'
import { AppContextProvider, BasketItem } from '../context'
import BasketListItem from './BasketListItem'

const testProduct: BasketItem = {
  id: '1',
  name: 'Apples',
  price: 2.95,
  quantity: 2,
  img: '/images/fruit/apples.jpg',
}
function getRenderResult() {
  const result = render(
    <AppContextProvider>
      <BasketListItem {...testProduct} />
    </AppContextProvider>
  )
  return result
}
describe('BasketItem component', () => {
  test('basket item is shown, with name, price, quantity, image as well as buttons to increase or decrease quantity', () => {
    const result = getRenderResult()
    expect(result.getByText(/apples/i)).toBeInTheDocument()
    expect(result.getByText(/2\.95 eur\/kg/i)).toBeInTheDocument()
    expect(
      result.getByRole('button', { name: /decrease by 1 kg/i })
    ).toBeInTheDocument()
    expect(
      result.getByRole('button', { name: /increase by 1 kg/i })
    ).toBeInTheDocument()
    expect(
      result.getByRole('button', { name: /remove from the basket/i })
    ).toBeInTheDocument()
  })
})
