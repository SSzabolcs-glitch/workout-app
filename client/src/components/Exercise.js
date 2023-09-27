import React from 'react';

function Exercise({id, bodypart, name, equipment, gifUrl, target }) {

    return (
        <div key={id}>
            {bodypart}
            {name}
            {equipment}
            <img alt='gif' src={gifUrl}></img>
            {target}
        </div>
    );
}

export default Exercise;