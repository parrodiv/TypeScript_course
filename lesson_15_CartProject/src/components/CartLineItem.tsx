import { ChangeEvent, memo, ReactElement } from 'react'
import { CartItemType } from '../context/CartContext'
import { ReducerAction } from '../context/CartContext'
import { ReducerActionType } from '../context/CartContext'

type PropsType = {
  item: CartItemType
  dispatch: React.Dispatch<ReducerAction>
  REDUCER_ACTIONS: ReducerActionType
}

const CartLineItem = ({ ...props }: PropsType) => {

  console.log("rendered")

  const img: string = new URL(
    `../images/${props.item.sku}.jpeg`,
    import.meta.url
  ).href

  const lineTotal: number = props.item.qty * props.item.price

  const highestQty: number = 20 > props.item.qty ? 20 : props.item.qty + 10

  const optionValues: number[] = [...Array(highestQty).keys()].map((i) => i + 1)
  // console.log([...Array(highestQty).keys()]) // parte da 0
  // console.log(optionValues) // parte da 1

  const options: ReactElement[] = optionValues.map((value) => {
    return (
      <option key={`opt${value}`} value={value}>
        {value}
      </option>
    )
  })

  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    props.dispatch({
      type: props.REDUCER_ACTIONS.QUANTITY,
      payload: { ...props.item, qty: Number(e.target.value) },
    })
  }

  const onRemoveFromCart = () =>
    props.dispatch({
      type: props.REDUCER_ACTIONS.REMOVE,
      payload: props.item,
    })

  const content = (
    <li className='cart__item'>
      <img src={img} alt={props.item.name} className='cart__img' />
      <div aria-label='Item Name'>{props.item.name}</div>
      <div aria-label='Price Per Item'>
        {new Intl.NumberFormat('it-IT', {
          style: 'currency',
          currency: 'EUR',
        }).format(props.item.price)}
      </div>

      <label htmlFor='itemQty' className='offscreen'>
        Item Quantity
      </label>
      <select
        name='itemQty'
        id='itemQty'
        className='cart__select'
        aria-label='Item Quantity'
        value={props.item.qty}
        onChange={onChangeQty}
      >
        {options}
      </select>

      <div className='cart__item-subtotal' aria-label='Line Item Subtotal'>
        {new Intl.NumberFormat('it-IT', {
          style: 'currency',
          currency: 'EUR',
        }).format(lineTotal)}
      </div>

      <button
        className='cart__button'
        aria-label='Remove Item From Cart'
        title='Remove Item From Cart'
        onClick={onRemoveFromCart}
      >
        ❌
      </button>
    </li>
  )

  return content
}



function areItemsEqual(
  { item: prevItem }: PropsType,
  { item: nextItem }: PropsType
) {
  // console.log(Object.keys(prevItem))
  // ['sku', 'name', 'price', 'qty]
  return Object.keys(prevItem).every((key) => {
    return (
      prevItem[key as keyof CartItemType] ===
      nextItem[key as keyof CartItemType]
    )
  })
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(CartLineItem, areItemsEqual)

export default MemoizedCartLineItem

// la funzione "areItemsEqual" utilizza il metodo "Object.keys()" per ottenere le chiavi dell'oggetto "prevItem" e poi controlla se ogni valore delle proprietà dell'oggetto "prevItem" corrisponde ai 
//valori delle stesse proprietà dell'oggetto "nextItem". Se tutte le proprietà degli oggetti "prevItem" e "nextItem" corrispondono, la funzione restituisce "true", altrimenti restituisce "false".

// Infine, la funzione "memo" viene utilizzata per creare un componente "MemoizedCartLineItem" che memorizza in cache il componente originale "CartLineItem" e le sue props. 
//In questo modo, se le props non cambiano, il componente "MemoizedCartLineItem" restituisce la stessa versione memorizzata in cache, invece di creare un nuovo componente.
// Ciò migliora le prestazioni del componente, in quanto evita di doverlo ricreare ogni volta che le props cambiano.
// Questa funzione di comparazione tra prevItem e nextItem è necessaria per verificare che le keys dell'oggetto item non siano cambiate
// Se utilizzassimo solo React.memo non otterremmo una validazione delle proprietà innestate di una prop, quindi non riusciremmo a verificare se le prop dell'oggetto item siano effettivamente cambiate