// import { ActionTypes } from 'caTypes/types';
import { StudentsLogicType } from '../logics/studentsLogic/types';
import { ActionTypes } from '../@types/types';

export interface Student {
    city: string;
    company: string;
    email: string;
    firstName: string;
    grades: string[];
    id: string;
    lastName: string;
    pic: string;
    skill: string;
}

export const studentsActionTypes = {
    LOAD_REQUEST: 'students/LOAD_REQUEST',
    LOAD_SUCCESS: 'students/LOAD_SUCCESS',
    LOAD_ERROR: 'students/LOAD_ERROR',
} as const;

export const actions = {
    loadStudents: () => ({
        type: studentsActionTypes.LOAD_REQUEST,
    }),
};

type StudentsAction = ActionTypes<typeof actions> | StudentsLogicType;

interface State {
    isFetching: boolean;
    students: Student[] | null;
    error: Error | null;
}

const initialState: State = {
    isFetching: false,
    students: null,
    error: null,
};

export const studentsReducer = (
    state = initialState,
    action: StudentsAction,
): State => {
    switch (action.type) {
        case studentsActionTypes.LOAD_REQUEST:
            return { ...state, isFetching: true };

        case studentsActionTypes.LOAD_SUCCESS:
            return {
                isFetching: false,
                students: action.payload.students,
                error: null,
            };

        case studentsActionTypes.LOAD_ERROR:
            return { ...state, isFetching: false, error: action.error };

        default:
            return state;
    }
};
