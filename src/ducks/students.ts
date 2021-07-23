import { StudentsLogicType } from '@logics/studentsLogic/types';
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
    tags?: string[];
}

export const studentsActionTypes = {
    LOAD_REQUEST: 'students/LOAD_REQUEST',
    LOAD_SUCCESS: 'students/LOAD_SUCCESS',
    LOAD_ERROR: 'students/LOAD_ERROR',
    ADD_TAG_START: 'students/ADD_TAG_START',
    ADD_TAG_FINISH: 'students/ADD_TAG_FINISH',
    REMOVE_TAG_START: 'students/REMOVE_TAG_START',
    REMOVE_TAG_FINISH: 'students/REMOVE_TAG_FINISH',
} as const;

export const actions = {
    loadStudents: () => ({
        type: studentsActionTypes.LOAD_REQUEST,
    }),
    addTag: (id: string, tag: string) => ({
        type: studentsActionTypes.ADD_TAG_START,
        id,
        tag,
    }),
    removeTag: (id: string, tag: string) => ({
        type: studentsActionTypes.REMOVE_TAG_START,
        id,
        tag,
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

        case studentsActionTypes.ADD_TAG_FINISH:
        case studentsActionTypes.REMOVE_TAG_FINISH:
            return { ...state, students: action.payload.students };

        default:
            return state;
    }
};
