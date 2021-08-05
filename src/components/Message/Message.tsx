import React from 'react';
import styles from './Message.scss';

interface Props {
    message: string;
}

const Message: React.FC<Props> = ({ message }) => {
    return (
        <div className={styles.message}>
            <p>{message}</p>
        </div>
    );
};

export default Message;
