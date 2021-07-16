import StudentComponent from 'caComponents/student/student';
import { RootState } from 'caStore/rootReducer';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as $$students from '../../ducks/students';
import { Student } from '../../ducks/students';

const StudentsList: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch($$students.actions.loadStudents());
    }, []);

    const students = useSelector<RootState, Student[] | null>(
        state => state.data.students,
    );

    return (
        <ul>
            {students?.map((student, idx) => {
                const { firstName, lastName } = student;
                return (
                    <li key={`${firstName}${lastName}${idx}`}>
                        <StudentComponent student={student} />
                    </li>
                );
            })}
        </ul>
    );
};

export default StudentsList;
