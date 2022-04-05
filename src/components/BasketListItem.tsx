import styles from './basket-list-item.module.scss'
import React from 'react'
import { FiPlusSquare, FiMinusSquare, FiTrash2 } from 'react-icons/fi'
import { BasketItem, useAppContext } from '../context'

function BasketListItem({ name, price, quantity, id, img }: BasketItem) {
  const { remove, increase, decrease } = useAppContext()
  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = '/image-not-found.png'
    event.currentTarget.className = ''
    event.currentTarget.style.display = 'block'
    event.currentTarget.style.width = '120px'
    event.currentTarget.style.height = '90px'
    event.currentTarget.style.objectFit = 'contain'
  }

  return (
    <article className={styles.item} data-cy={`product-${id}`}>
      <div className={styles.product}>
        <div className={styles.productImgContainer}>
          <img
            src={img}
            alt={name}
            className={styles.productImg}
            onError={imageOnErrorHandler}
          />
        </div>
        <div className={styles.productDetails}>
          <p className={styles.productName}>{name}</p>
          <p className={styles.price}>{Number(price).toFixed(2)} EUR/kg</p>
        </div>
      </div>
      <div className={styles.quantityControls}>
        <div className={styles.incOrDec}>
          <FiMinusSquare
            className={styles.minus}
            onClick={() => decrease(id)}
            title='Decrease by 1 kg'
            role='button'
          />
          <p className={styles.quantity}>{quantity} kg</p>
          <FiPlusSquare
            className={styles.plus}
            onClick={() => increase(id)}
            title={
              quantity < 10
                ? 'Increase by 1 kg'
                : 'You can buy up to 10 kg of each product'
            }
            role='button'
          />
        </div>
        <FiTrash2
          className={styles.remove}
          title='Remove from the basket'
          onClick={() => remove(id)}
          role='button'
        ></FiTrash2>
      </div>
    </article>
  )
}

export default BasketListItem
