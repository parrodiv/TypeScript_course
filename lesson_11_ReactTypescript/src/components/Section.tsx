import React, { ReactNode } from "react"

// OLD CODE 
// const Section: React.FC<{title: string}> = ({ children, title}) => {
//   return (
//     <section>
//       <h2>{title}</h2>
//       <p>{children}</p>
//     </section>
//   )
// }

type SectionProps = {
  title?: string,
  children: ReactNode
}

export const Section = ({title = 'My Subheading', children}: SectionProps) => {
 return (
  <section>
    <h2>{title}</h2>
    <p>{children}</p>
  </section>
 )
}