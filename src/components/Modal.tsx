import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context'
import styles from './modal.module.scss'

function Modal() {
  const { isModalOpen, closeModal } = useAppContext()
  return (
    <div
      className={
        isModalOpen === false
          ? styles.modalOverlay
          : `${styles.modalOverlay} ${styles.showModal}`
      }
      role='alert'
    >
      <div className={styles.modalContent}>
        <p className={styles.info}>Product added to your basket!</p>
        <div className={styles.action}>
          <div
            role='button'
            className={styles.continueBtn}
            onClick={closeModal}
          >
            continue shopping
          </div>
          <Link to='/basket' className={styles.goToBasket} onClick={closeModal}>
            go to basket
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Modal
