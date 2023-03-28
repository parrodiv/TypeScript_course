import { useContext } from 'react'
import ProductContext from '../context/ProductsContext'
import { UseProductsContextType } from '../context/ProductsContext'

const useProducts = (): UseProductsContextType => {
  return useContext(ProductContext)
}

export default useProducts