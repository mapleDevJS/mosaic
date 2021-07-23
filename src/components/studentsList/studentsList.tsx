import React from 'react';
import StudentCard from '@components/StudentCard/StudentCard';
import { Student } from '@ducks/students';
import styles from './studentsList.scss';
import Notification from '@components/Notification/Notification';

interface Props {
    students: Student[];
}

const StudentsList: React.FC<Props> = ({ students }) => {
    if (students.length) {
        return (
            <ul className={styles.studentsList}>
                {students.map((student, idx) => {
                    const { firstName, lastName } = student;
                    return (
                        <li key={`${firstName}${lastName}${idx}`}>
                            <StudentCard student={student} />
                        </li>
                    );
                })}
            </ul>
        );
    }

    return <Notification message={'No students found'} />;
};

export default StudentsList;
