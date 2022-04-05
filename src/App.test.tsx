import React from 'react'
import { render } from '@testing-library/react'
import App from './App'
import { AppContextProvider } from './context'

beforeEach(() => {
  // IntersectionObserver isn't available in test environment
  const mockIntersectionObserver = jest.fn()
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  })
  window.IntersectionObserver = mockIntersectionObserver
})

test('renders app', () => {
  render(
    <AppContextProvider>
      <App />
    </AppContextProvider>
  )
})
