import styles from './navbar.module.scss'
import { GiFruitBowl, GiBasket } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context'
import React from 'react'

export const Navbar = () => {
  const { numProducts } = useAppContext()

  React.useEffect(() => {
    // eslint-disable-next-line
    const pageTop = document.querySelector('nav')
  }, [])

  return (
    <nav>
      <div className={styles.logo}>
        <span>Fresh &amp; green</span>
        <GiFruitBowl className={styles.iconBowl} />
      </div>
      <div className={styles.navLinks}>
        <Link to='/' className={styles.link}>
          Home
        </Link>
        <Link to='/basket' className={styles.link} title='Basket'>
          <GiBasket className={styles.iconBasket} />
          {numProducts > 0 ? (
            <div className={styles.numProductsContainer}>
              <p className={styles.numProducts}>{numProducts}</p>
            </div>
          ) : null}
        </Link>
      </div>
    </nav>
  )
}
