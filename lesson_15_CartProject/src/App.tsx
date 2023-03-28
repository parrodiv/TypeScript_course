import { useState } from 'react'
import Cart from './components/Cart'
import Footer from './components/Footer'
import Header from './components/Header'
import ProductsList from './components/ProductsList'

import CartContext from './context/CartContext'
import ProductContext from './context/ProductsContext'

function App() {
  const [viewCart, setViewCart] = useState<boolean>(false)

  const pageContent = viewCart ? <Cart /> : <ProductsList />

  const content = (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      {pageContent}
      <Footer viewCart={viewCart} />
    </>
  )

  return content
}

export default App
