import React from 'react';
import { RootState } from 'caStore/rootReducer';
import { useSelector } from 'react-redux';

import styles from './app.module.css';
import StudentsList from './studentsList/studentsList';
import Error from 'caComponents/error/error';

export const App = (): JSX.Element => {
    const error = useSelector<RootState, Error | null>(
        state => state.data.error,
    );

    return (
        <div className={styles.app}>
            {error ? <Error error={error} /> : <StudentsList />}
        </div>
    );
};
