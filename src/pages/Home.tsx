import styles from './home.module.scss'
import useProducts from '../hooks/useProducts'
import ProductListItem from '../components/ProductListItem'
import Filter from '../components/Filter'
import { useAppContext } from '../context'
import Loading from '../components/Loading'

export const Home = () => {
  const { data, error, isFetching } = useProducts()
  const { currentCategory } = useAppContext()

  if (isFetching) return <Loading />

  if (error || !data) {
    return (
      <div className={styles.error}>
        <p>Sorry, data could not be fetched. Please try again later.</p>
      </div>
    )
  }

  const categories = [
    'all',
    ...Array.from(new Set(data.map((item) => item.category))), //Array.from is needed, otherwise Typescript throws an error
  ]

  let products = [...data]

  if (currentCategory !== 'all') {
    products = products.filter((item) => item.category === currentCategory)
  }

  return (
    <>
      <Filter categories={categories} />
      <main className={styles.productList}>
        {products.map((item) => {
          return <ProductListItem key={item.id} {...item} />
        })}
      </main>
    </>
  )
}
