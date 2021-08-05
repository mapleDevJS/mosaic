import React from 'react';
import StudentCard from '@components/StudentCard/StudentCard';
import { Student } from '@ducks/students';
import styles from './StudentsList.scss';
import Message from '@components/Message/Message';

interface Props {
    students: Student[];
}

const StudentsList: React.FC<Props> = ({ students }) => {
    if (students.length) {
        return (
            <ul className={styles.studentsList}>
                {students.map(student => {
                    return (
                        <li key={student.id}>
                            <StudentCard student={student} />
                        </li>
                    );
                })}
            </ul>
        );
    }

    return <Message message={'No students found'} />;
};

export default StudentsList;
