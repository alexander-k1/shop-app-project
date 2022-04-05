import React from 'react'
import { reducer } from './reducer'

export const initialState = {
  basket: [] as any[], //with just [] Typescript throws an error
  numProducts: 0,
  totalSum: 0,
  currentCategory: 'all',
  isModalOpen: false,
}
export interface BasketItem {
  id: string
  quantity: number
  name: string
  price: number
  img: string
}
interface AppContextInterface {
  basket: BasketItem[] | []
  numProducts: number
  totalSum: number
  currentCategory: string
  isModalOpen: boolean
  clearBasket: () => void
  remove: (id: string) => void
  increase: (id: string) => void
  decrease: (id: string) => void
  setCategory: (category: string) => void
  openModal: () => void
  closeModal: () => void
  addProduct: (item: BasketItem) => void
}

export const AppContext = React.createContext<AppContextInterface | undefined>(
  undefined
)
const useAppContext = () => {
  const context = React.useContext(AppContext)

  if (!context) {
    throw new Error('useAppContext must be inside a Provider with a value')
  }

  return context
}

export interface AppProps {
  children: React.ReactNode
}

const AppContextProvider = ({ children }: AppProps) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const clearBasket = () => {
    dispatch({ type: 'CLEAR_BASKET' })
  }
  const remove = (id: string) => {
    dispatch({ type: 'REMOVE', payload: id })
  }
  const increase = (id: string) => {
    dispatch({ type: 'INCREASE', payload: id })
  }
  const decrease = (id: string) => {
    dispatch({ type: 'DECREASE', payload: id })
  }
  const setCategory = (category: string) => {
    dispatch({ type: 'CATEGORY', payload: category })
  }
  const openModal = () => {
    dispatch({ type: 'OPEN_MODAL' })
  }
  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' })
  }
  const addProduct = (item: BasketItem) => {
    dispatch({ type: 'ADD', payload: item })
  }

  const firstRenderRef = React.useRef<boolean>(true)
  React.useEffect(() => {
    if (!firstRenderRef.current) {
      dispatch({ type: 'CALCULATE_TOTALS' })
    }
  }, [state.basket])
  React.useEffect(() => {
    firstRenderRef.current = false
  }, [])
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearBasket,
        remove,
        increase,
        decrease,
        setCategory,
        openModal,
        closeModal,
        addProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppContextProvider, useAppContext }
