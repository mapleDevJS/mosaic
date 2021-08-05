import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './StudentsContainer.scss';
import * as $$students from '@ducks/students';
import { RootState } from '@store/rootReducer';
import { Student } from '@ducks/students';
import Message from '@components/Message/Message';
import { useDebounce } from '../../hooks/useDebounce';
import StudentsList from '@components/Students/StudentsList';

const filterStudentsByNameAndTag = (students: Student[] | null, name: string, tag: string) => {
    return students && (name.length !== 0 || tag.length !== 0)
        ? students.filter(student => {
              const { firstName, lastName, tags = [] } = student;
              const fullName = `${firstName} ${lastName}`.trim().toLowerCase();

              return fullName.includes(name) && tags.join('').trim().toLowerCase().includes(tag);
          })
        : students;
};

const StudentsContainer = () => {
    const dispatch = useDispatch();

    const [searchInputs, setSearchInputs] = useState<{ [k in string]: string }>({
        name: '',
        tag: '',
    });

    const { name, tag } = searchInputs;

    const debouncedSearchName = useDebounce(name, 300);
    const debouncedSearchTag = useDebounce(tag, 300);

    useEffect(() => {
        dispatch($$students.actions.loadStudents());
    }, []);

    const students = useSelector<RootState, Student[] | null>(state => state.data.students);

    const isFetching = useSelector<RootState, boolean>(state => state.data.isFetching);

    const [filteredStudents, setFilteredStudents] = useState(students);

    useEffect(() => {
        if (debouncedSearchName || debouncedSearchTag) {
            setFilteredStudents(
                filterStudentsByNameAndTag(students, debouncedSearchName, debouncedSearchTag),
            );
        } else {
            setFilteredStudents(students);
        }
    }, [students, debouncedSearchName, debouncedSearchTag]);

    const inputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evt.target;

        setSearchInputs({
            ...searchInputs,
            [name]: value,
        });
    };

    return (
        <div className={styles.container}>
            {isFetching ? (
                <Message message={'Loading...'} />
            ) : (
                <>
                    <div className={styles.filter}>
                        <input
                            className={styles.searchInput}
                            type="text"
                            name="name"
                            placeholder="Search by name"
                            onChange={inputChangeHandler}
                            value={name}
                        />
                        <input
                            className={styles.searchInput}
                            type="text"
                            name="tag"
                            placeholder="Search by tag"
                            onChange={inputChangeHandler}
                            value={tag}
                        />
                    </div>
                    {filteredStudents && <StudentsList students={filteredStudents} />}
                </>
            )}
        </div>
    );
};

export default StudentsContainer;
