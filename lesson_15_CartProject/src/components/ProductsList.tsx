import useCart from '../hooks/useCart'
import useProduct from '../hooks/useProducts'
import { UseProductsContextType } from '../context/ProductsContext'
import Product from './Product'

const ProductsList = () => {
  const { products } = useProduct()
  const { dispatch, REDUCER_ACTIONS, cart } = useCart()

  let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>

  if (products?.length) {
    pageContent = products.map((product) => {
      const inCart: boolean = cart.some((item) => item.sku === product.sku)
      // controllo che nel carrello ci sia il prodotto in loop

      return (
        <Product
          key={product.sku}
          product={product}
          dispatch={dispatch}
          REDUCER_ACTIONS={REDUCER_ACTIONS}
          inCart={inCart}
        />
      )
    })
  }

  const content = (
    <main className="main main--products">
      {pageContent}
    </main>
  )
  return <div>{content}</div>
}

export default ProductsList
