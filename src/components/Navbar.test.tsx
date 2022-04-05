import { render, within } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AppContext, initialState } from '../context'
import { Navbar } from './Navbar'
import { testActions } from '../tests/test-actions'

function getRenderResult(numProducts: number) {
  const result = render(
    <BrowserRouter>
      <AppContext.Provider
        value={{ ...initialState, ...testActions, numProducts }}
      >
        <Navbar />
      </AppContext.Provider>
    </BrowserRouter>
  )
  return result
}
describe('Navbar component', () => {
  test('navbar is shown, the number of products bought is indicated over the basket icon', () => {
    const numProducts = 5
    const result = getRenderResult(numProducts)
    expect(result.getByText(/fresh & green/i)).toBeInTheDocument()
    expect(
      result.getByRole('link', {
        name: /home/i,
      })
    ).toBeInTheDocument()
    const link = result.getByRole('link', {
      name: /basket/i,
    })
    expect(within(link).getByText(/5/i)).toBeInTheDocument()
  })
})
