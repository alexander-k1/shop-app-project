import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AppContext, initialState } from '../context'
import Modal from './Modal'
import { testActions } from '../tests/test-actions'
import userEvent from '@testing-library/user-event'

function getRenderResult(closeModal: () => void) {
  const result = render(
    <BrowserRouter>
      <AppContext.Provider
        value={{ ...initialState, ...testActions, closeModal }}
      >
        <Modal />
      </AppContext.Provider>
    </BrowserRouter>
  )
  return result
}
describe('Modal component', () => {
  test('modal content is shown including two buttons', () => {
    const closeModal = jest.fn()
    const result = getRenderResult(closeModal)
    expect(
      result.getByText(/product added to your basket!/i)
    ).toBeInTheDocument()
    expect(
      result.getByRole('button', {
        name: /continue shopping/i,
      })
    ).toBeInTheDocument()
    expect(
      result.getByRole('link', {
        name: /go to basket/i,
      })
    ).toBeInTheDocument()
    userEvent.click(
      result.getByRole('button', {
        name: /continue shopping/i,
      })
    )
    expect(closeModal).toHaveBeenCalledTimes(1)
  })
})
