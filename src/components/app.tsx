import React from 'react';
import { RootState } from '@store/rootReducer';
import { useSelector } from 'react-redux';
import styles from './app.scss';
import utilsStyles from '../styles/utils.scss';
import Notification from '@components/Notification/Notification';
import StudentsContainer from './StudentsContainer/StudentsContainer';

export const App = () => {
    const error = useSelector<RootState, Error | null>(
        state => state.data.error,
    );

    return (
        <div className={styles.app}>
            <h1 className={utilsStyles.visuallyHidden}>
                Search of the Students
            </h1>
            {error ? (
                <Notification message={error.message} />
            ) : (
                <StudentsContainer />
            )}
        </div>
    );
};
