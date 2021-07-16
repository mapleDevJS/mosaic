import { Student, studentsActionTypes } from 'caDucks/students';
import { LogicAction } from 'caTypes/types';

export type LoadSuccessStudentsLogic = LogicAction<
    typeof studentsActionTypes.LOAD_SUCCESS,
    { students: Student[] }
>;
export type LoadErrorStudentsLogic = LogicAction<
    typeof studentsActionTypes.LOAD_ERROR,
    never,
    Error
>;
export type StudentsLogicType =
    | LoadSuccessStudentsLogic
    | LoadErrorStudentsLogic;
