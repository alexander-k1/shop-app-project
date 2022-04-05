import styles from './app.module.scss'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Basket } from './pages/Basket'
import { Home } from './pages/Home'
import { Product } from './pages/Product'
import { ErrorPage } from './pages/Error'
import { Navbar } from './components/Navbar'
import { QueryClientProvider, QueryClient } from 'react-query'
import ScrollToTop from './components/ScrollToTop'

const queryClient = new QueryClient()

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <header>
            <Navbar />
          </header>
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='basket' element={<Basket />}></Route>
            <Route path='product/:productID' element={<Product />}></Route>
            <Route path='*' element={<ErrorPage />}></Route>
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
