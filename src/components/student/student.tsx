import React from 'react';
import { Student } from 'caDucks/students';

interface Props {
    student: Student;
}

const StudentComponent: React.FC<Props> = ({ student }) => {
    const { pic, firstName, lastName, email, company, skill, grades } = student;
    const averageGrade =
        grades.reduce((total, grade) => total + parseInt(grade), 0) /
        grades.length;

    return (
        <ul>
            <li>
                <img src={pic} />
            </li>
            <li>
                {firstName} {lastName}
            </li>
            <li>Email: {email}</li>
            <li>Company: {company}</li>
            <li>Skill: {skill}</li>
            <li>Average: {averageGrade}%</li>
        </ul>
    );
};

export default StudentComponent;
