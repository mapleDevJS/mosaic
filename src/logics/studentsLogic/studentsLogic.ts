import { createLogic } from 'redux-logic';
import { studentsActionTypes } from '@ducks/students';
import * as $$students from '@ducks/students';
import { Process } from '@logics/types';
import cloneDeep from 'lodash/cloneDeep';

const API_URL = 'https://api.hatchways.io/assessment';

const END_POINTS = {
    STUDENTS: 'students',
};

const loadStudentsLogic = createLogic({
    type: studentsActionTypes.LOAD_REQUEST,

    async process({}, dispatch, done) {
        try {
            const students = await fetch(
                `${API_URL}/${END_POINTS.STUDENTS}`,
            ).then(response => response.json());
            dispatch({
                type: studentsActionTypes.LOAD_SUCCESS,
                payload: students,
            });
        } catch (err) {
            dispatch({
                type: studentsActionTypes.LOAD_ERROR,
                error: err,
            });
        }

        done();
    },
});

const addTagLogic = createLogic({
    type: studentsActionTypes.ADD_TAG_START,

    process(
        {
            action,
            getState,
        }: Process<ReturnType<typeof $$students.actions.addTag>>,
        dispatch,
        done,
    ) {
        const { id, tag } = action;
        const { students } = getState().data;
        const updatedStudents = cloneDeep(students);
        const student = updatedStudents?.find(student => student.id === id);

        if (student?.tags) {
            student.tags.push(tag);
        } else if (student && student.tags === undefined) {
            student.tags = [tag];
        }

        dispatch({
            type: studentsActionTypes.ADD_TAG_FINISH,
            payload: { students: updatedStudents },
        });
        done();
    },
});

const removeTagLogic = createLogic({
    type: studentsActionTypes.REMOVE_TAG_START,

    process(
        {
            action,
            getState,
        }: Process<ReturnType<typeof $$students.actions.removeTag>>,
        dispatch,
        done,
    ) {
        const { id, tag } = action;
        const { students } = getState().data;
        const updatedStudents = cloneDeep(students);

        const student = updatedStudents?.find(student => student.id === id);

        if (student?.tags) {
            student.tags = student.tags.filter(name => name !== tag);
        }

        dispatch({
            type: studentsActionTypes.REMOVE_TAG_FINISH,
            payload: { students: updatedStudents },
        });
        done();
    },
});

export default [loadStudentsLogic, addTagLogic, removeTagLogic];
