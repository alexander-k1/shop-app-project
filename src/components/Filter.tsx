import React from 'react'
import { useAppContext } from '../context'
import styles from './filter.module.scss'

interface FilterProps {
  categories: string[]
}
function Filter({ categories }: FilterProps) {
  const { currentCategory, setCategory } = useAppContext()
  return (
    <div className={styles.filter}>
      {categories.map((item) => {
        return (
          <div
            className={
              item === currentCategory
                ? `${styles.filterOption} ${styles.currentCategory}`
                : styles.filterOption
            }
            key={item}
            onClick={() => setCategory(item)}
          >
            {item.toUpperCase()}
          </div>
        )
      })}
    </div>
  )
}

export default Filter
