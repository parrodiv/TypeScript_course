import { createContext, useState, ReactElement } from 'react'

type ProductType = {
  sku: string
  name: string
  price: number
}

export const initState: ProductType[] = [
  {
    sku: 'item0001',
    name: 'Widget',
    price: 9.99,
  },
  {
    sku: 'item0002',
    name: 'Widget',
    price: 14.99,
  },
  {
    sku: 'item0003',
    name: 'Widget',
    price: 18.99,
  },
   
]

type UseProductsContextType = {
  products: ProductType[]
}

const initStateContext: UseProductsContextType = {
  products: []
}


const ProductContext = createContext<UseProductsContextType>(initStateContext)

type ChildrenType = {
  children?: ReactElement | ReactElement[]
}

export const CounterProvider = ({children}: ChildrenType): ReactElement => {
  const [products, setProducts] = useState<ProductType[]>(initState)

  return (
    <ProductContext.Provider value={{products}}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContext