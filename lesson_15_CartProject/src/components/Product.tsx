import { ProductType } from '../context/ProductsContext'
import { ReducerActionType, ReducerAction } from '../context/CartContext'
import { memo } from 'react'

type PropsType = {
  product: ProductType
  dispatch: React.Dispatch<ReducerAction>
  REDUCER_ACTIONS: ReducerActionType
  inCart: boolean
}

const Product = ({ product, dispatch, REDUCER_ACTIONS, inCart }: PropsType) => {
  // dynamic images
  const img: string = new URL(`../images/${product.sku}.jpeg`, import.meta.url)
    .href

    console.log("rendered")

  const onAddToCart = () =>
    dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 } })
  // product contiene name, price e sku, ma il type ReducerAction ha il payload di tipo CartItemType che contiene anche qty.
  // La gestione del qty viene comunque effettuata nel reducer ADD

  const itemInCart = inCart ? ' Item in Cart: ✅' : null

  const content = (
    <article className='product'>
      <h3>{product.name}</h3>
      <img src={img} alt={product.name} className='product__img' />
      <p>
        {new Intl.NumberFormat('it-IT', {
          style: 'currency',
          currency: 'EUR',
        }).format(product.price)}{' '}
        {itemInCart}
      </p>
      <button onClick={onAddToCart}>Add to cart</button>
    </article>
  )

  return content
}


const areProductsEqual = (
  {product: prevProduct, inCart: prevInCart}: PropsType,
  {product: nextProduct, inCart: nextIncart}: PropsType
  ): boolean => {
    return Object.keys(prevProduct).every(key => {
      return (
        prevProduct[key as keyof ProductType] === 
        nextProduct[key as keyof ProductType] 
      )
    }) && prevInCart === nextIncart
}


const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual)

export default MemoizedProduct



// export default memo(Product)

// siccome in product la properietà che cambierà sarà inCart, e tale proprietà non contiene valori innestati, è sufficiente utilizzare memo
// se invece ci fossero dei cambiamenti di una prop che ha valori innestati come array o oggetti useremmo lo stesso metodo utilizzato in CartLineItem