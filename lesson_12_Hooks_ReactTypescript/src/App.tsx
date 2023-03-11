import React, {
  useState,
  useEffect,
  useCallback,
  MouseEvent,
  KeyboardEvent,
} from 'react'

interface User {
  id: string
  username: string
}

const App = () => {
  const [count, setCount] = useState<number>(0)
  const [users, setUsers] = useState<User | null>(null)

  useEffect(() => {
    console.log('mounting')

    console.log({ users })

    return () => console.log('unmounting')
  })

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

  return (
    <>
      <h1>{count}</h1>
      <button onClick={addTwo}>Add</button>
    </>
  )
}

export default App