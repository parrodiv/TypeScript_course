import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  MouseEvent,
  KeyboardEvent,
} from 'react'

interface User {
  id: string
  username: string
}

type fibFunc = (n: number) => number

const fib: fibFunc = (n) => {
  if (n < 2) return n
  return fib(n - 1) + fib(n - 2)
}

const myNum: number = 40 

const App = () => {
  const [count, setCount] = useState<number>(0)
  const [users, setUsers] = useState<User | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  console.log(inputRef?.current)
  console.log(inputRef?.current?.value)

  useEffect(() => {
    console.log('mounting')

    console.log({ users })

    return () => console.log('unmounting')
  }, [])

  // memoize a function so every time  the component rerender, the function isn't going to be recreated
  const addTwo = useCallback(() => {
    setCount((prev) => prev + 2)
  }, [])

  // let's assume that in the function it is needed an event, with Typescript it should look as follow:
  const funcEvent = useCallback(
    (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => {
      console.log(e.target)
    },
    []
  )

  //  useMemo
  // it's scope is to momeize a value that comes in from an expensive function, so every time the component rerenders the value is stored and the calculation is not reprocessed. It will reprocess only when the prop dependency changes
  const expFuncResult = useMemo<number>(() => fib(myNum), [myNum])
   // <number> means that the result value that we expect is number, useMemo already recognize implicit type

  return (
    <>
      <h1>{count}</h1>
      <button onClick={addTwo}>Add</button>
      <h2>{expFuncResult}</h2>
      <input type="text" ref={inputRef} />
    </>
  )
}

export default App
