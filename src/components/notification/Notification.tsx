import React from 'react';
import styles from './Notification.scss';

interface Props {
    message: string;
}

export const Notification: React.FC<Props> = ({ message }): JSX.Element => {
    return (
        <div className={styles.notification}>
            <p>{message}</p>
        </div>
    );
};

export default Notification;
