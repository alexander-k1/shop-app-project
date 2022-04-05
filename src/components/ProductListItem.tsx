import styles from './product-list-item.module.scss'
import { Link } from 'react-router-dom'
import { Product } from '../hooks/useProduct'

function ProductListItem({ name, price, img, id }: Product) {
  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = '/image-not-found.png'
    event.currentTarget.className = ''
    event.currentTarget.style.display = 'block'
    event.currentTarget.style.width = '400px'
    event.currentTarget.style.height = '300px'
    event.currentTarget.style.objectFit = 'contain'
  }
  return (
    <article className={styles.product}>
      <div className={styles.productImgContainer}>
        <img
          className={styles.productImg}
          src={img}
          alt={name}
          onError={imageOnErrorHandler}
        />
      </div>
      <div className={styles.productInfo}>
        <span>{Number(price).toFixed(2)} EUR/kg</span>
        <Link className={styles.link} to={`/product/${id}`}>
          {name}
        </Link>
      </div>
    </article>
  )
}

export default ProductListItem
