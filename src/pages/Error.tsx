import styles from './error.module.scss'
import { Link } from 'react-router-dom'

export const ErrorPage = () => {
  return (
    <div className={styles.error}>
      <p>Page not found</p>
      <Link to='/' className={styles.link}>
        Back to home page
      </Link>
    </div>
  )
}
