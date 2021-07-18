import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StudentsList from '@components/studentsList/studentsList';
import styles from './StudentsContainer.scss';
import * as $$students from '@ducks/students';
import { RootState } from '@store/rootReducer';
import { Student } from '@ducks/students';
import Notification from '@components/notification/Notification';

const StudentsContainer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch($$students.actions.loadStudents());
    }, []);

    const students = useSelector<RootState, Student[] | null>(
        state => state.data.students,
    );

    const isFetching = useSelector<RootState, boolean>(
        state => state.data.isFetching,
    );

    const [searchName, setSearchName] = useState<string>('');

    const inputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setSearchName(evt.target.value);
    };

    const filteredStudents = students
        ? students.filter(({ firstName, lastName }) => {
              const fullName = `${firstName} ${lastName}`.trim().toLowerCase();
              return fullName.includes(searchName);
          })
        : [];
    return (
        <div className={styles.container}>
            {isFetching ? (
                <Notification message={'Loading...'} />
            ) : (
                <>
                    <input
                        className={styles.searchName}
                        type="text"
                        placeholder="Search by name"
                        onChange={inputChangeHandler}
                        value={searchName}
                    />
                    <StudentsList students={filteredStudents} />
                </>
            )}
        </div>
    );
};

export default StudentsContainer;
