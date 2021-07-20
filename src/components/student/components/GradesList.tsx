import React from 'react';
import styles from './GradesList.scss';

interface Props {
    grades: string[];
}

const GradesList: React.FC<Props> = ({ grades }) => {
    return (
        <table>
            {grades.map((grade, idx) => {
                return (
                    <tr key={grade + idx}>
                        <td>
                            {`Test${idx + 1}:`}
                            <span className={styles.grade}>{`${grade}%`}</span>
                        </td>
                    </tr>
                );
            })}
        </table>
    );
};

export default GradesList;
