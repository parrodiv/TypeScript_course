import { ReactNode, useState, useReducer, ChangeEvent } from 'react'



type ChildrenType = {
  children: (num: number) => ReactNode
}

const Counter = ({ children }: ChildrenType) => {
  // const [count, setCount] = useState<number>(1)
 

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
