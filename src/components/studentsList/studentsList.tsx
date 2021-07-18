import React from 'react';
import StudentComponent from '@components/student/student';
import { Student } from '@ducks/students';
import styles from './studentsList.scss';
import Notification from '@components/notification/Notification';

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
                            <StudentComponent student={student} />
                        </li>
                    );
                })}
            </ul>
        );
    }

    return <Notification message={'No students found'} />;
};

export default StudentsList;
