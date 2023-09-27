import React, { useState, useEffect } from 'react';
//import axios from 'axios'
import Exercise from './Exercise';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'ce547aae30msh24ff5c6780cf21cp124f08jsn23e36d9f3239',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
};


function Exercises(props) {
    const [exercises, setExercises] = useState([]);
    useEffect(() => {
        fetch('https://exercisedb.p.rapidapi.com/exercises/target/abs', options)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                setExercises(data)})
            .catch(err => console.error(err));
    }, []);

    return (
        <div className='Exercises' >
            {exercises.map(exercise => 
            <Exercise  key={exercise.id} id={exercise.id} bodypart={exercise.bodypart} name={exercise.name} equipment={exercise.equipment} gifUrl={exercise.gifUrl} target={exercise.target}/>
            )}
        </div>
    );
}

export default Exercises;