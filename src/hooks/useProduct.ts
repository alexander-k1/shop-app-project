import { useQuery } from 'react-query'

export interface Product {
  id: string
  name: string
  category: 'fruit' | 'vegetables'
  price: number
  info: string
  img: string
}

async function fetchProduct(id: string): Promise<Product> {
  const response = await fetch(
    'https://vintage-carp.glitch.me/api/product/' + id
  )

  if (!response.ok) {
    throw new Error('Network error')
  }
  return response.json()
}

export default function useProduct(id: string) {
  return useQuery(['product', id], () => fetchProduct(id))
}
