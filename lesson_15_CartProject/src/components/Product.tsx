import { ProductType } from '../context/ProductsContext'
import { ReducerActionType, ReducerAction } from '../context/CartContext'

type PropsType = {
  product: ProductType
  dispatch: React.Dispatch<ReducerAction>
  REDUCER_ACTIONS: ReducerActionType
  inCart: boolean
}

const Product = ({ product, dispatch, REDUCER_ACTIONS, inCart}: PropsType) => {
  return <div>Product</div>
}

export default Product
