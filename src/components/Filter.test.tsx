import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppContextProvider } from '../context'
import Filter from './Filter'
const categories = ['foo', 'bar', 'baz']
function getRenderResult() {
  const result = render(
    <AppContextProvider>
      <Filter categories={categories} />
    </AppContextProvider>
  )
  return result
}
describe('Filter component', () => {
  test('categories passed as an array are displayed', () => {
    const result = getRenderResult()
    expect(result.getByText(/foo/i)).toBeInTheDocument()
    expect(result.getByText(/bar/i)).toBeInTheDocument()
    expect(result.getByText(/baz/i)).toBeInTheDocument()
    expect(result.queryByText(/chocolate/i)).not.toBeInTheDocument()
  })
  test('current category is changed on click', async () => {
    const result = getRenderResult()
    expect(result.getByText(/bar/i)).not.toHaveClass('currentCategory')
    userEvent.click(result.getByText(/bar/i))
    //now the current category is 'bar'
    expect(result.getByText(/bar/i)).toHaveClass('currentCategory')
  })
})
