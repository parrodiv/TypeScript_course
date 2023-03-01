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
    studentId: "Bob",
    grade: 50
};
const scorePreview = {
    title: 'score'
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
const tsAssign = createNewAssign("Utility Types", 100);
console.log(tsAssign);
