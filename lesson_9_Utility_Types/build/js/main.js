"use strict";
// Utility types
//  Partial allow us to to specify some of the props in the Assignment interface, not every
const updateAssignment = (assign, propsToUpdate) => {
    return Object.assign(Object.assign({}, assign), propsToUpdate);
};
const assign1 = {
    studentId: 'compsci123',
    title: 'Final Project',
    grade: 0,
};
console.log(updateAssignment(assign1, { grade: 95 }));
const assignGraded = updateAssignment(assign1, { grade: 95 });
// * REQUIRED and READONLY
//  Required specify that it requires all of the property, also those that are set as optional
const recordAssignment = (assign) => {
    // send to database, etc.
    return assign;
};
const assignVerified = Object.assign(Object.assign({}, assignGraded), { verified: true });
// Readonly can not be modified
// assignVerified.grade = 88
//recordAssingment requires all props
console.log(recordAssignment(Object.assign(Object.assign({}, assignGraded), { verified: true })));
// * RECORD
const hexColorMap = {
    // * Record<keyType, valueType>
    red: 'FF0000',
    green: '00FF00',
    blue: '0000FF',
};
const finalGrades = {
    Sara: 'B',
    Kelly: 'A',
};
const gradeData = {
    Sara: { assign1: 85, assign2: 93 },
    Kelly: { assign1: 60, assign2: 90 },
};
const score = {
    studentId: 'Bob',
    grade: 50,
};
const scorePreview = {
    title: 'score',
};
// it exclude null and undefined
// * ReturnType
// type NewAssign = {title: string, points: number}
// const createNewAssign = (title: string, points: number): NewAssign => {
//   return {title, points}
// }
const createNewAssign = (title, points) => {
    return { title, points };
};
const tsAssign = createNewAssign('Utility Types', 100);
console.log(tsAssign);
const assignArgs = ['title', 100];
const tsAssign2 = createNewAssign(...assignArgs);
console.log(tsAssign2);
const fetchUsers = async () => {
    const data = await fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => {
        return res.json();
    })
        .catch((err) => {
        if (err instanceof Error)
            console.log(err.message);
    });
    return data;
};
const printUsers = async () => {
    const users = await fetchUsers();
    console.log(users);
};
printUsers();
// * RIEPILOGO AWAITED
// In questo esempio abbiamo definito una funzione fetchUsers che restituisce una promessa ti tipo Promise<User[]>
// Definito il tipo di dato che verrà restituito dalla promise grazie ad Awaited ed a ReturnType che ci darà il tipo di valore restituito da fetchUsers
// In questo esempio, il tipo FetchUsersReturnType è un Array di oggetti User, perché il valore restituito da fetchName è una stringa.
// * ALTRO ESEMPIO DI RESPONSE TYPE CON GENERIC
// Esempio:
const test = (value) => {
    return typeof value === "string";
};
// se value è una stringa il tipo restituito sarà un boolean altrimenti (number | boolean)
console.log(test(9));
// la sintassi, infer R indica che il tipo di valore di R deve essere dedotto dal tipo di T. In particolare, il tipo T deve estendere un oggetto che ha un campo data il cui tipo di valore viene assegnato a R.
// il tipo RespType utilizza infer per estrarre il tipo di valore restituito da una funzione. In particolare, se il tipo generico T estende un oggetto con un campo data che ha un tipo di valore "inferito", allora il tipo di valore inferito viene restituito. Altrimenti, viene restituito il tipo never.
// ? Cosa significa infer ?
//infer è una parola chiave che viene utilizzata per definire un tipo di variabile "ottenuto". Ciò significa che il tipo di questa variabile non è noto in anticipo, ma può essere dedotto dal contesto in cui viene utilizzata.
