import React from 'react';
import styles from './Tags.scss';

interface Props {
    tags: string[];
    studentId: string;
    onTagClickHandler: (tag: string, studentId: string) => void;
}

const Tags: React.FC<Props> = ({ tags, studentId, onTagClickHandler }) => {
    return (
        <ul className={styles.tagsList}>
            {tags.map((tag, idx) => {
                return (
                    <li key={tag + idx} className={styles.tagItem}>
                        <button
                            className={styles.tag}
                            type="button"
                            aria-label="remove tag"
                            onClick={() => onTagClickHandler(tag, studentId)}
                        >
                            {tag}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

export default Tags;
