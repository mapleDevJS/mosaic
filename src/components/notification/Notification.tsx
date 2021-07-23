import React from 'react';
import styles from './Notification.scss';

interface Props {
    message: string;
}

const Notification: React.FC<Props> = ({ message }) => {
    return (
        <div className={styles.notification}>
            <p>{message}</p>
        </div>
    );
};

export default Notification;
