import React, { useState } from "react"

interface User {
  id: string
  username: string
}

const App = () => {
  const [count, setCount] = useState<number>(0)
  const [users, setUsers] = useState<User | null>(null)

  return (
   <>
   ciao
   </>
  )
}

export default App



