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

type AssignResult = Pick<Assignment, 'studentId' | 'grade'>

const score: AssignResult = {
  studentId: 'Bob',
  grade: 50,
}

// Omit è l'esatto contrario di Pick
type AssignPreview = Omit<Assignment, 'studentId' | 'grade'>

const scorePreview: AssignPreview = {
  title: 'score',
}

// * EXCLUDE and EXTRACT
// They son't work with interface, but only with string literal union types
// over the mouse on adjustedGrade and highGrades to see results

type adjustedGrade = Exclude<LetterGrades, 'U'>

type highGrades = Extract<LetterGrades, 'A' | 'B'>

// * NonNullable

type AllPossibleGrades = 'Dave' | 'John' | null | undefined

type NamesOnly = NonNullable<AllPossibleGrades>
// it exclude null and undefined

// * ReturnType

// type NewAssign = {title: string, points: number}

// const createNewAssign = (title: string, points: number): NewAssign => {
//   return {title, points}
// }

const createNewAssign = (title: string, points: number) => {
  return { title, points }
}

// viene impostato il tipo NewAssign con il tipo di dato ritornato dalla funzione createNewAssign
type NewAssign = ReturnType<typeof createNewAssign>

const tsAssign: NewAssign = createNewAssign('Utility Types', 100)
console.log(tsAssign)

// * Parameters

type AssignParams = Parameters<typeof createNewAssign>

const assignArgs: AssignParams = ['title', 100]

const tsAssign2: NewAssign = createNewAssign(...assignArgs)
console.log(tsAssign2)

// * Awaited - helps us with the ReturnType of a Promise

interface User {
  id: number
  name: string
  username: string
  email: string
}

const fetchUsers = async (): Promise<User[]> => {
  const data = await fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => {
      return res.json()
    })
    .catch((err) => {
      if (err instanceof Error) console.log(err.message)
    })

  return data
}

// without Awaited if you over mouse on FetchUsersReturnType the return type is Promise<User[]>
// type FetchUsersReturnType = ReturnType<typeof fetchUsers>

// with Awaited
type FetchUsersReturnType = Awaited<ReturnType<typeof fetchUsers>> // questo sarà il tipo di dato restituito da fetchUsers

const printUsers = async (): Promise<void> => {
  const users: FetchUsersReturnType = await fetchUsers()
  console.log(users)
}

printUsers()

// * RIEPILOGO AWAITED

// In questo esempio abbiamo definito una funzione fetchUsers che restituisce una promessa ti tipo Promise<User[]>
// Definito il tipo di dato che verrà restituito dalla promise grazie ad Awaited ed a ReturnType che ci darà il tipo di valore restituito da fetchUsers
// In questo esempio, il tipo FetchUsersReturnType è un Array di oggetti User, perché il valore restituito da fetchName è una stringa.

// * ALTRO ESEMPIO DI RESPONSE TYPE CON GENERIC

// Esempio:

const test = <T>(value: T): T extends string ? boolean : (number | boolean) => {
  return typeof value === "string"
}

// se value è una stringa il tipo restituito sarà un boolean altrimenti (number | boolean)
console.log(test(9))

// * Esempio più complesso con infer

type RespType<T> = T extends { data: infer R } ?  R : never

// la sintassi, infer R indica che il tipo di valore di R deve essere dedotto dal tipo di T. In particolare, il tipo T deve estendere un oggetto che ha un campo data il cui tipo di valore viene assegnato a R.

// il tipo RespType utilizza infer per estrarre il tipo di valore restituito da una funzione. In particolare, se il tipo generico T estende un oggetto con un campo data che ha un tipo di valore "inferito", allora il tipo di valore inferito viene restituito. Altrimenti, viene restituito il tipo never.

// ? Cosa significa infer ?
//infer è una parola chiave che viene utilizzata per definire un tipo di variabile "ottenuto". Ciò significa che il tipo di questa variabile non è noto in anticipo, ma può essere dedotto dal contesto in cui viene utilizzata.


const response = {
  data: 'Hello, world!',
}

type MyResponse = typeof response

type DataFromResponse = RespType<MyResponse>; // string
//In questo caso, RespType<MyResponse> infers il tipo della proprietà data dell'oggetto MyResponse, che è string.