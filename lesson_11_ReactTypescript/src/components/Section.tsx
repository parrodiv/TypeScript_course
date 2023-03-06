import React from "react"

// OLD CODE 
const Section: React.FC<{title: string}> = ({ children, title}) => {
  return (
    <section>
      <h2>{title}</h2>
      <p>{children}</p>
    </section>
  )
}