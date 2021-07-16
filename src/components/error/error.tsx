import React from 'react';

interface Props {
    error: Error;
}

export const Error: React.FC<Props> = ({ error }): JSX.Element => {
    return (
        <div>
            <p>{error.message}</p>
        </div>
    );
};

export default Error;
