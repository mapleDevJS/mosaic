import { createLogic } from 'redux-logic';
import { studentsActionTypes } from 'caDucks/students';

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

export default [loadStudentsLogic];
