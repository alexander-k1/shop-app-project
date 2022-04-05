import styles from './basket.module.scss'
import BasketListItem from '../components/BasketListItem'
import { useAppContext } from '../context'

export const Basket = () => {
  const { basket, clearBasket, totalSum } = useAppContext()
  if (basket.length < 1) {
    return <div className={styles.title}>Your basket is currently empty</div>
  }

  return (
    <>
      <div className={styles.title}>Your basket</div>
      <main className={styles.basket}>
        <div className={styles.basketList}>
          {basket.map((item) => {
            return <BasketListItem key={item.id} {...item} />
          })}
        </div>
        <div className={styles.total}>
          <span className={styles.totalLabel}>Total:</span>
          <span className={styles.totalSum}>
            {Number(totalSum).toFixed(2)} EUR
          </span>
        </div>
        <div className={styles.controlBtns}>
          <div className={styles.clearBtn} onClick={clearBasket} role='button'>
            clear basket
          </div>
          <div className={styles.paymentBtn} role='button'>
            proceed to payment
          </div>
        </div>
      </main>
    </>
  )
}
