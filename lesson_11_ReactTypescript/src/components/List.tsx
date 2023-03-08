import {ReactNode } from 'react'

// Generics 1 example
interface Identities<V, W> {
  id1: V
  id2: W
}

function identities<T, U>(arg1: T, arg2: U): Identities<T, U> {
  console.log(arg1 + ': ' + typeof arg1)
  console.log(arg2 + ': ' + typeof arg2)
  let identities: Identities<T, U> = {
    id1: arg1,
    id2: arg2,
  }
  return identities
}

identities("Ciao", true)
//********************* */

// Generic constraints
//! This cause error because In this scenario the compiler will not know that T indeed has a .length property, especially given any type can be assigned to T
function identity<T>(arg: T): T {
  console.log(arg.length)
  return arg
}



//*************************** */
// inizio esercizio video

interface ListProps<T> {
  items: T[],
  render: (item: T) => ReactNode
}

// <T,> is one shortcut for <T extends {}> for recognize that is a generic type
// without this <T,> it throws an error, only for this type of function, oterwhise it would be:
// function List<T> () {}
// <T> in functions has the scope to assign a generic type for the args of the function
const List = <T,> ({items, render}: ListProps<T>) => {
  return (
    <ul>
      {items.map((item: T, i: number) => (
        <li key={i}>
          {render(item)}
        </li>
      ))}
    </ul>
  )
}

export default List