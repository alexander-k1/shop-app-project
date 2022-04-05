import { BasketItem, initialState } from './context'

type Action =
  | { type: 'CLEAR_BASKET' }
  | { type: 'REMOVE'; payload: string }
  | { type: 'INCREASE'; payload: string }
  | { type: 'DECREASE'; payload: string }
  | { type: 'CALCULATE_TOTALS' }
  | { type: 'CATEGORY'; payload: string }
  | { type: 'OPEN_MODAL' }
  | { type: 'CLOSE_MODAL' }
  | { type: 'ADD'; payload: BasketItem }

export const reducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case 'ADD':
      const productInBasket = state.basket.find(
        (item) => item.id === action.payload.id
      )
      if (productInBasket) {
        return {
          ...state,
          basket: state.basket.map((item) => {
            if (item.id !== action.payload.id) {
              return item
            } else {
              return item.quantity < 10
                ? { ...item, quantity: item.quantity + action.payload.quantity }
                : item
            }
          }),
        }
      } else {
        return { ...state, basket: [...state.basket, action.payload] }
      }
    case 'CLEAR_BASKET':
      return { ...state, basket: [], numProducts: 0, totalSum: 0 }
    case 'CATEGORY':
      return { ...state, currentCategory: action.payload }
    case 'OPEN_MODAL':
      return { ...state, isModalOpen: true }
    case 'CLOSE_MODAL':
      return { ...state, isModalOpen: false }
    case 'REMOVE':
      return {
        ...state,
        basket: state.basket.filter((item) => item.id !== action.payload),
      }
    case 'INCREASE':
      return {
        ...state,
        basket: state.basket.map((item) => {
          if (item.id !== action.payload) {
            return item
          } else {
            return item.quantity < 10
              ? { ...item, quantity: item.quantity + 1 }
              : item
          }
        }),
      }
    case 'DECREASE':
      return {
        ...state,
        basket: state.basket
          .map((item) => {
            if (item.id !== action.payload) {
              return item
            } else {
              return { ...item, quantity: item.quantity - 1 }
            }
          })
          .filter((item) => item.quantity > 0),
      }
    case 'CALCULATE_TOTALS':
      let { newNumProducts, newTotalSum } = state.basket.reduce(
        (acc, curr) => {
          acc.newNumProducts += 1
          acc.newTotalSum += curr.price * curr.quantity
          return acc
        },
        { newNumProducts: 0, newTotalSum: 0 }
      )
      newTotalSum = parseFloat(newTotalSum.toFixed(2))
      return { ...state, numProducts: newNumProducts, totalSum: newTotalSum }
    default:
      throw new Error('Unexpected action type')
  }
}
