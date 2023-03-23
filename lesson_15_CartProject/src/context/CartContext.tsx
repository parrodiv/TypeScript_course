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

      return { ...state, cart: [...filteredCartItems, updatedItem]}
    }

    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] }
    }

    default:
      throw new Error()
  }
}
