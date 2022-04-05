import styles from './product.module.scss'
import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAppContext } from '../context'
import useProduct from '../hooks/useProduct'
import Loading from '../components/Loading'
import Modal from '../components/Modal'

export const Product = () => {
  const { productID } = useParams()
  const { data, error, isFetching } = useProduct(productID!) //assure Typescript that productID won't be null
  const { basket, openModal, isModalOpen, addProduct } = useAppContext()
  const [quantity, setQuantity] = React.useState(0)
  let maxQuantity: number
  const productInBasket = basket.find((item) => item.id === productID)
  if (!productInBasket) {
    maxQuantity = 10
  } else {
    maxQuantity = 10 - productInBasket.quantity
  }

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

  const firstRenderRef = React.useRef<boolean>(true)
  //set quantity to 0 after closing modal
  React.useEffect(() => {
    if (!firstRenderRef.current && !isModalOpen) {
      setQuantity(0)
    }
  }, [isModalOpen])
  React.useEffect(() => {
    firstRenderRef.current = false
  }, [])

  if (isFetching) return <Loading />

  if (error || !data) {
    return (
      <div className={styles.error}>
        <p>
          Sorry, data could not be fetched. If the URL is correct, please try
          again later.
        </p>
        <Link to='/' className={styles.link}>
          Back to home page
        </Link>
      </div>
    )
  }
  const { name, price, info, img, id } = data
  function handleAddToBasket() {
    addProduct({ name, price, quantity, id, img })
    openModal()
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const tempQuantity = Number(e.target.value)
    maxQuantity < tempQuantity
      ? setQuantity(maxQuantity)
      : setQuantity(tempQuantity)
  }
  return (
    <>
      <Modal />
      <div className={styles.productContainer}>
        <div className={styles.product}>
          <div>
            <div className={styles.productImgContainer}>
              <img
                className={styles.productImg}
                src={img}
                alt={name}
                onError={imageOnErrorHandler}
              />
            </div>
          </div>
          <div className={styles.productDetails}>
            <p className={styles.title}>{name}</p>
            <div className={styles.buying}>
              <span className={styles.price}>
                {Number(price).toFixed(2)} EUR/kg
              </span>
              <input
                type='number'
                className={styles.productQuantity}
                max={maxQuantity}
                min='0'
                value={quantity}
                onChange={(e) => handleChange(e)}
                title='You can buy up to 10 kg of each product'
              />
              <span className={styles.kgs}>kg</span>
              <button
                className={styles.addToBasket}
                disabled={quantity > 0 ? false : true}
                onClick={handleAddToBasket}
              >
                add to basket
              </button>
            </div>
            <p className={styles.description}>Product description:</p>
            <p className={styles.productInfo}>{info}</p>
          </div>
        </div>
      </div>
    </>
  )
}
