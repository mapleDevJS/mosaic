import React, { useState } from 'react';
import { Student } from '@ducks/students';
import styles from './StudentCard.scss';
import GradesList from './components/GradesList';
import Tags from './components/Tags';
import { useDispatch } from 'react-redux';
import * as $$students from '@ducks/students';

interface Props {
    student: Student;
}

const StudentCard: React.FC<Props> = ({ student }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const [tag, setTag] = useState<string>('');

    const { pic, firstName, lastName, email, company, skill, grades, tags } =
        student;
    const averageGrade =
        grades.reduce((total, grade) => total + parseInt(grade), 0) /
        grades.length;

    const clickCollapseButtonHandler = () => {
        setOpen((open: boolean) => !open);
    };

    const inputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setTag(evt.target.value);
    };

    const onKeyPressHandler = (evt: React.KeyboardEvent) => {
        if (evt.key === 'Enter' && tag.trim()) {
            setTag('');
            dispatch($$students.actions.addTag(student.id, tag));
        }
    };

    const tagClickHandler = (tag: string, studentId: string) => {
        dispatch($$students.actions.removeTag(studentId, tag));
    };

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

                <div className={styles.gradesList}>
                    {open && <GradesList grades={grades} />}
                </div>

                <div>
                    {tags && (
                        <Tags
                            tags={tags}
                            onTagClickHandler={tagClickHandler}
                            studentId={student.id}
                        />
                    )}
                </div>

                <input
                    className={styles.addTag}
                    type="text"
                    placeholder="Add a tag"
                    onChange={inputChangeHandler}
                    value={tag}
                    onKeyPress={onKeyPressHandler}
                />
            </div>
            <button
                className={`${styles.collapseButton} ${
                    open ? styles.minus : styles.plus
                }`}
                type="button"
                aria-label="show/hide student's grades"
                onClick={clickCollapseButtonHandler}
            ></button>
        </article>
    );
};

export default StudentCard;
