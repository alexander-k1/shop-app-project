import React from 'react'
import { FaChevronCircleUp } from 'react-icons/fa'
import styles from './scroll-to-top.module.scss'

function ScrollToTop() {
  const [topVisible, setTopVisible] = React.useState(true)
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
  React.useEffect(() => {
    const pageTop = document.querySelector('nav')
    let optionsTopInvisible = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    }
    let optionsTopVisible = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    }
    function handleTopInvisible(
      entries: Array<IntersectionObserverEntry>,
      observer: IntersectionObserver
    ) {
      entries.forEach((entry) => {
        if (entry.intersectionRatio === 0) {
          setTopVisible(false)
        }
      })
    }
    function handleTopVisible(
      entries: Array<IntersectionObserverEntry>,
      observer: IntersectionObserver
    ) {
      entries.forEach((entry) => {
        if (entry.intersectionRatio === 1) {
          setTopVisible(true)
        }
      })
    }
    let observerTopInvisible = new IntersectionObserver(
      handleTopInvisible,
      optionsTopInvisible
    )
    observerTopInvisible.observe(pageTop!) //assure Typescript that pageTop won't be null
    let observerTopVisible = new IntersectionObserver(
      handleTopVisible,
      optionsTopVisible
    )
    observerTopVisible.observe(pageTop!) //assure Typescript that pageTop won't be null
  }, [])
  return (
    <div
      className={
        topVisible === false
          ? `${styles.chevronVisible} ${styles.scrollToTop}`
          : styles.scrollToTop
      }
      onClick={handleScrollToTop}
      title='Scroll to top'
    >
      <FaChevronCircleUp size='2rem' />
    </div>
  )
}

export default ScrollToTop
