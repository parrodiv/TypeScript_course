// Utility types

// Partial

interface Assignment {
  studentId: string
  title: string
  grade: number
  verified?: boolean
}

// * Partial allow us to to specify some of the props in the Assignment interface, not every

const updateAssignment = (
  assign: Assignment,
  propsToUpdate: Partial<Assignment>
): Assignment => {
  return { ...assign, ...propsToUpdate }
}

const assign1: Assignment = {
  studentId: 'compsci123',
  title: 'Final Project',
  grade: 0,
}

console.log(updateAssignment(assign1, { grade: 95 }))
const assignGraded: Assignment = updateAssignment(assign1, { grade: 95 })


// Required and Readonly

// * Required specify that it requires all of the property, also those that are set as optional
const recordAssignment = (assign: Required<Assignment>): Assignment => {
  // send to database, etc.
  return assign
}

const assignVerified: Readonly<Assignment> = {...assignGraded, verified: true }

// * Readonly can not be modified
// assignVerified.grade = 88

//recordAssingment requires all props 
console.log(recordAssignment({...assignGraded, verified: true}))



