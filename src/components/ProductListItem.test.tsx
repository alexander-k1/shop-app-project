import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Product } from '../hooks/useProduct'
import ProductListItem from './ProductListItem'
const testProduct: Product = {
  id: '1',
  name: 'Apples',
  category: 'fruit',
  price: 2.95,
  info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ab quidem consequatur, maiores ratione in cumque magnam, aut culpa molestiae itaque, repellendus ex corrupti tenetur id repellat obcaecati ipsam quasi quae? Aperiam placeat eius perferendis adipisci quasi ratione sunt est nemo qui, esse nam totam reiciendis cumque, nulla sit, sequi quo quisquam deleniti modi soluta.',
  img: '/images/fruit/apples.jpg',
}
describe('ProductListItem component', () => {
  test('product item is rendered, with name, price and image', () => {
    render(
      <BrowserRouter>
        <ProductListItem {...testProduct} />
      </BrowserRouter>
    )
    expect(
      screen.getByRole('link', {
        name: /apples/i,
      })
    ).toBeInTheDocument()
    expect(screen.getByText(/2\.95 eur\/kg/i)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /apples/i })).toBeInTheDocument()
  })
})
