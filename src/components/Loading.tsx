import React from 'react'
import styles from './loading.module.scss'
function Loading() {
  return (
    <div className={styles.spinners}>
      <div>
        <div className={styles.spinner2}></div>
        <div className={styles.spinner1}></div>
      </div>
    </div>
  )
}

export default Loading
