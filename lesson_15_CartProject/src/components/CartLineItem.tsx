import { ChangeEvent, ReactElement } from 'react'
import { CartItemType } from '../context/CartContext'
import { ReducerAction } from '../context/CartContext'
import { ReducerActionType } from '../context/CartContext'

type PropsType = {
  item: CartItemType
  dispatch: React.Dispatch<ReducerAction>
  REDUCER_ACTIONS: ReducerActionType
}

const CartLineItem = ({ ...props }: PropsType) => {
  const img: string = new URL(`../images/${props.item.sku}.jpeg`, import.meta.url)
    .href

  const lineTotal: number = props.item.qty * props.item.price

  const highestQty: number = 20 > props.item.qty ? 20 : props.item.qty + 10

  const optionValues: number[] = [...Array(highestQty).keys()].map((i) => i + 1)
  console.log([...Array(highestQty).keys()]) // parte da 0
  console.log(optionValues) // parte da 1

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

export default CartLineItem
