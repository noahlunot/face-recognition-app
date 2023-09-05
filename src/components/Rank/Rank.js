import React from 'react';

const Rank = ({name, entries}) => {
    return (
        <div>
            <div className='white f3 tc'>
            <p>{`Hello ${name}, your current entry is: ${entries}`}</p>
            </div>
        </div>
    )
}

export default Rank;