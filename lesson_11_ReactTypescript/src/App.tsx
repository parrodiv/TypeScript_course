import Heading from './components/Heading'
import { Section } from './components/Section'
import Counter from './components/Counter'
import List from './components/List'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState<number>(1)

  function identity<T>(arg: T): T {
    return arg
  }

  return (
    <>
      <Heading title={'Hello'} />
      <Section title='Different title'>This is my Section</Section>
      <Counter setCount={setCount}>Count is {count}</Counter>
      <List
        items={['☕ Coffee', '🌮 Tacos', '💻 Code']}
        render={(item: string) => <span className='bold'>{item}</span>}
      />
    </>
  )
}

export default App
