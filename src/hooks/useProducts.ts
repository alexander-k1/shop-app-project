import { useQuery } from 'react-query'
import { Product } from './useProduct'

async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('https://vintage-carp.glitch.me/api/products')
  if (!response.ok) {
    throw new Error('Network error')
  }
  return response.json()
}

export default function useProducts() {
  return useQuery('products', fetchProducts)
}
