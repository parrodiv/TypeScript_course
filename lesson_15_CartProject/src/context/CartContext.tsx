import { createContext, ReactElement, useMemo, useReducer } from 'react'

export type CartItemType = {
  sku: string
  name: string
  price: number
  qty: number
}

type CartStateType = {
  cart: CartItemType[]
}

const initCartState: CartStateType = { cart: [] }

const REDUCER_ACTION_TYPE = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  QUANTITY: 'QUANTITY',
  SUBMIT: 'SUBMIT',
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

type ReducerAction = {
  type: string
  payload?: CartItemType
}

const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      // inserisco il controllo del payload perchè altrimenti il compilatore mi avviserebbe che payload puo' essere undefined (prova a commmentare il controllo)
      if (!action.payload) {
        throw new Error('action.payload missing in ADD action')
      }

      const { sku, name, price } = action.payload

      // filtra tutti i prodotti che sono nel carrello tranne quello che vogliamo modificare
      const filteredCartItems: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      )

      // controllo se l'item esiste già nel carrello, nel caso aumento la quantità, se non esiste lo aggiungo con quantità 1
      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      )
      const qty: number = itemExists ? ++itemExists.qty : 1

      const itemAdded: CartItemType = { sku, name, price, qty }

      return { ...state, cart: [...filteredCartItems, itemAdded] }
    }

    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error('action.payload missing in REMOVE action')
      }

      const { sku } = action.payload
      const filteredCartItems: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      )

      return { ...state, cart: [...filteredCartItems] }
    }

    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error('action.payload missing in QUANTITY action')
      }

      const { sku, qty } = action.payload
      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      )

      if (!itemExists) {
        throw new Error('Item must exist in order to update quantity')
      }

      const updatedItem: CartItemType = { ...itemExists, qty }

      const filteredCartItems: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      )

      return { ...state, cart: [...filteredCartItems, updatedItem] }
    }

    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] }
    }

    default:
      throw new Error()
  }
}

const useCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState)

  // memorizzare il valore dell'object REDUCER_ACTIONTS_TYPE
  // così da non causare un render ogni volta che si passa il REDUCER_ACTIONS ad un componente
  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE
  }, [])

  const totalItems = state.cart.reduce((prevValue, cartItem) => {
    return prevValue + cartItem.qty
  }, 0)

  const totalPrice = new Intl.NumberFormat('it-IT', {style: 'currency', currency: 'EUR'}).format(
    state.cart.reduce((prevValue, cartItem) => {
      return prevValue + (cartItem.qty * cartItem.price)
    }, 0)
  )

  // ordinare l'ordine degli items nel cart
  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.sku.slice(-4)) // estraggo le ultime 4 cifre
    const itemB = Number(b.sku.slice(-4))
    // ordine crescente: se A è minore di B restituisce -1 else 1 indicando la posizione di A rispetto a B
    return itemA - itemB
  })

  // dispatch non causerà rerender e neanche REDUCER_ACTIONS grazie a useMemo
  return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart }
}







// type UseCartContextType = ReturnType<typeof useCartContext>

// const initStateContext: UseCartContextType = {
//   state: initCartState,
//   addItem: (cartItem: CartItemType) => {},
//   removeItem: (cartItem: CartItemType) => {},
//   changeQuantity: (cartItem: CartItemType) => {},
//   submit: () => {}
// }

// export const CartContext = createContext<UseCartContextType>(initStateContext)

// type ChildrenType = {
//   children?: ReactElement | ReactElement[] 
// }

// export const CartProvider = ({
//   children
// }: ChildrenType) => {
//   return (
//     <CartContext.Provider value={useCartContext(initCartState)}>
//       {children}
//     </CartContext.Provider>
//   )
// }