import { ReactNode, useContext, ChangeEvent } from 'react'
import { useCounter, useCounterText} from './context/CounterContext'



type ChildrenType = {
  children: (num: number) => ReactNode
}

const Counter = ({ children }: ChildrenType) => {
  // const [count, setCount] = useState<number>(1)
  const { count, increment, decrement } = useCounter()
  const { text, changeText } = useCounterText()
 

  return (
    <>
      <h1>{children(count)}</h1>
      <div>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
      <input type="text" onChange={changeText} />
      <h1>{text}</h1>
    </>
  )
}

export default Counter
