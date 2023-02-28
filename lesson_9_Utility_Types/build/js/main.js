"use strict";
// Utility types
// * Partial allow us to to specify some of the props in the Assignment interface, not every
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
// Required and Readonly
// * Required specify that it requires all of the property, also those that are set as optional
const recordAssignment = (assign) => {
    // send to database, etc.
    return assign;
};
const assignVerified = Object.assign(Object.assign({}, assignGraded), { verified: true });
// * Readonly can not be modified
// assignVerified.grade = 88
//recordAssingment requires all props 
console.log(recordAssignment(Object.assign(Object.assign({}, assignGraded), { verified: true })));
