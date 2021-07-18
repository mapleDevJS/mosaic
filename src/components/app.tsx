import React from 'react';
import { RootState } from '@store/rootReducer';
import { useSelector } from 'react-redux';
import styles from './app.scss';
import Notification from '@components/notification/Notification';
import StudentsContainer from './StudentsContainer/StudentsContainer';

export const App = (): JSX.Element => {
    const error = useSelector<RootState, Error | null>(
        state => state.data.error,
    );

    return (
        <section className={styles.app}>
            {error ? (
                <Notification message={error.message} />
            ) : (
                <StudentsContainer />
            )}
        </section>
    );
};
