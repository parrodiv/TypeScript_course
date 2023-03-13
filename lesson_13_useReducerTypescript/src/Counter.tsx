import { ReactNode, useState, useReducer, ChangeEvent } from 'react'

const initState = { count: 0, text: '' }

const enum REDUCER_ACTION_TYPE {
  INCREMENT,
  DECREMENT,
  NEW_INPUT,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE
  payload?: string
}

const reducer = (
  state: typeof initState,
  action: ReducerAction
): typeof initState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.INCREMENT:
      return { ...state, count: state.count + 1 }
    case REDUCER_ACTION_TYPE.DECREMENT:
      return { ...state, count: state.count - 1 }
    case REDUCER_ACTION_TYPE.NEW_INPUT:
      return { ...state, text: action.payload ?? '' } // se action.payload è null/undefined restituisci ""
    // senza il nullish coaleshing operator darebbe errore perchè text potrebbe anche essere undefined ma nell'initState è stato settato come string
    default:
      throw new Error()
  }
}

type ChildrenType = {
  children: (num: number) => ReactNode
}

const Counter = ({ children }: ChildrenType) => {
  // const [count, setCount] = useState<number>(1)
  const [state, dispatch] = useReducer(reducer, initState)

  const increment = () => dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT })
  const decrement = () => dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT })
  const changeText = (e: ChangeEvent<HTMLInputElement>) => dispatch({
    type: REDUCER_ACTION_TYPE.NEW_INPUT,
    payload: e.target.value
  })

  return (
    <>
      <h1>{children(state.count)}</h1>
      <div>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
      <input type="text" onChange={changeText} />
      <h1>{state.text}</h1>
    </>
  )
}

export default Counter
