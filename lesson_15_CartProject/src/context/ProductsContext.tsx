import { createContext, useState, ReactElement, useEffect } from 'react'

type ProductType = {
  sku: string
  name: string
  price: number
}

const initState: ProductType[] = []
// export const initState: ProductType[] = [
//   {
//     sku: 'item0001',
//     name: 'Widget',
//     price: 9.99,
//   },
//   {
//     sku: 'item0002',
//     name: 'Widget',
//     price: 14.99,
//   },
//   {
//     sku: 'item0003',
//     name: 'Widget',
//     price: 18.99,
//   },
   
// ]

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

  useEffect(() => {
    const fetchProducts = async (): Promise<ProductType[]> => {
      const data = await fetch('http://localhost:3500/products').then(res => {
        return res.json()
      }).catch(err => {
        if (err instanceof Error) console.log(err.message)
      })
      return data
    }
    fetchProducts().then(products => setProducts(products))
  }, [])

  return (
    <ProductContext.Provider value={{products}}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContext