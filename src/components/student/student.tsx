import React from 'react';
import { Student } from '@ducks/students';
import styles from './student.scss';

interface Props {
    student: Student;
}

const StudentComponent: React.FC<Props> = ({ student }) => {
    const { pic, firstName, lastName, email, company, skill, grades } = student;
    const averageGrade =
        grades.reduce((total, grade) => total + parseInt(grade), 0) /
        grades.length;

    return (
        <article className={styles.studentCard}>
            <div className={styles.avatar}>
                <img
                    src={pic}
                    className={styles.picture}
                    alt={'Avatar of' + `${firstName} ${lastName}`}
                    width="136"
                    height="136"
                />
            </div>

            <div className={styles.studentInfo}>
                <h2 className={styles.names}>{`${firstName} ${lastName}`}</h2>

                <ul className={styles.detailsList}>
                    <li className={styles.detail}>Email: {email}</li>
                    <li className={styles.detail}>Company: {company}</li>
                    <li className={styles.detail}>Skill: {skill}</li>
                    <li className={styles.detail}>Average: {averageGrade}%</li>
                </ul>
            </div>
        </article>
    );
};

export default StudentComponent;
