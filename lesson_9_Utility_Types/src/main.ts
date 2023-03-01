// Utility types

// * PARTIAL

interface Assignment {
  studentId: string
  title: string
  grade: number
  verified?: boolean
}

//  Partial allow us to to specify some of the props in the Assignment interface, not every

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

// * REQUIRED and READONLY

//  Required specify that it requires all of the property, also those that are set as optional
const recordAssignment = (assign: Required<Assignment>): Assignment => {
  // send to database, etc.
  return assign
}

const assignVerified: Readonly<Assignment> = { ...assignGraded, verified: true }

// Readonly can not be modified
// assignVerified.grade = 88

//recordAssingment requires all props
console.log(recordAssignment({ ...assignGraded, verified: true }))

// * RECORD
const hexColorMap: Record<string, string> = {
  // * Record<keyType, valueType>
  red: 'FF0000',
  green: '00FF00',
  blue: '0000FF',
}

type Students = 'Sara' | 'Kelly'
type LetterGrades = 'A' | 'B' | 'C' | 'D' | 'U'

const finalGrades: Record<Students, LetterGrades> = {
  Sara: 'B',
  Kelly: 'A',
}

// Record with interface

interface Grades {
  assign1: number
  assign2: number
}

const gradeData: Record<Students, Grades> = {
  Sara: { assign1: 85, assign2: 93 },
  Kelly: { assign1: 60, assign2: 90 },
}



// * PICK and OMIT

// Pick dà la possibilità di scegliere che parametri utilizzare di un oggetto

type AssignResult = Pick<Assignment, "studentId" | "grade">

const score: AssignResult = {
  studentId: "Bob",
  grade: 50
}

// Omit è l'esatto contrario di Pick
type AssignPreview = Omit<Assignment, "studentId" | "grade">

const scorePreview: AssignPreview = {
  title: 'score'
}


// * EXCLUDE and EXTRACT
// They son't work with interface, but only with string literal union types
// over the mouse on adjustedGrade and highGrades to see results

type adjustedGrade = Exclude<LetterGrades, "U">

type highGrades = Extract<LetterGrades, "A" | "B">


// * NonNullable

type AllPossibleGrades = 'Dave' | 'John' | null | undefined

type NamesOnly = NonNullable<AllPossibleGrades>
// it exclude null and undefined


// * ReturnType

// type NewAssign = {title: string, points: number}

// const createNewAssign = (title: string, points: number): NewAssign => {
//   return {title, points}
// }

const createNewAssign = (title:string, points: number) => {
  return {title, points}
}

// viene impostato il tipo NewAssign con il tipo di dato ritornato dalla funzione createNewAssign 
type NewAssign = ReturnType<typeof createNewAssign>

const tsAssign: NewAssign = createNewAssign("Utility Types", 100)
console.log(tsAssign)

