import React from 'react';
import { RootState } from '@store/rootReducer';
import { useSelector } from 'react-redux';

import styles from './app.scss';
import StudentsList from './studentsList/studentsList';
import Error from '@components/error/error';

export const App = (): JSX.Element => {
    const isFetching = useSelector<RootState, boolean>(
        state => state.data.isFetching,
    );

    const error = useSelector<RootState, Error | null>(
        state => state.data.error,
    );

    return (
        <section className={styles.app}>
            {isFetching && <p>Loading...</p>}
            {error ? <Error error={error} /> : <StudentsList />}
        </section>
    );
};
