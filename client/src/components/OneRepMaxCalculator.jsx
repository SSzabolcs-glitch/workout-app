import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';


function OneRepMaxCalculator(props) {

    function calculate1RM(weight, reps) {
        return Math.round(weight * (1 + reps / 30));
    }
    const [isChecked, setIsChecked] = useState('')
    const [oneRepMax, setOneRepMax] = useState(0)
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.value);
    };
    const options = [];
    for (let i = 1; i <= 20; i++) {
        options.push(<option key={i} value={i}>{i}</option>);
    }

    const [inputValue, setInputValue] = useState("")
    const [result, showResult] = useState(false)
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        console.log(event.target.value);
        setSelectedValue(event.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault()
        showResult(true)
        setOneRepMax(calculate1RM(inputValue, selectedValue))

    }
    const onInputChange = (e) => {
        e.preventDefault()
        console.log(e.target.value);
        setInputValue(e.target.value)
    }

    return (
        <div >
            <div className='NavBar'>
                <div className='options'>
                    <Link to="/">Home</Link>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: "50px" }}>
                    <div className='oneRM'>
                        <div style={{ marginBottom: "10px" }}>
                            <h1>1 RM calculator</h1>
                            <div>
                                <input type='radio' name='exercise' value='squat'
                                    onChange={handleCheckboxChange} /> Squat
                            </div>
                            <div>
                                <input type='radio' name='exercise' value='bench'
                                    onChange={handleCheckboxChange} /> Bench
                            </div>
                            <div>
                                <input type='radio' name='exercise' value='deadlift'
                                    onChange={handleCheckboxChange} /> Deadlift
                            </div>
                        </div>
                        <input onChange={(e) => onInputChange(e)} id='Bench' placeholder="Weight" type='text' style={{ marginBottom: "10px" }}></input>
                        <select id='selectReps' value={selectedValue} onChange={handleChange} style={{ marginBottom: "10px", marginLeft: "10px" }}>
                            {options}
                        </select>
                        <button type='submit' style={{ marginBottom: "10px" }}>Calculate 1RM </button>

                        {result ?
                            <div id='Result' style={{ marginTop: "10px" }}>
                                {oneRepMax === 0 ? 'Please type in the weight' : `Your One Rep ${isChecked} Max is: ${oneRepMax} kgs`}
                            </div>
                            :
                            <></>
                        }
                    </div>

                </form>
            </div>
            <h1>Max weight (1RM) Calculator Instructions</h1>
            <h6>This calculator can be used to work out your approximate 1 REP MAX for any exercise. The way this works is it takes the amount of weight you can lift for a certain number of reps and uses a formula to calculate your approximate 1 REP MAX. Obviously, these figures are not 100% accurate.
                To use it simply enter the weight in the first box provided and select the number of reps from the drop down box. For example, if I benched 225lbs for 10 reps I would enter 225 and select 10 reps. The calculator works in both pounds and kilograms.</h6>
        </div>
    );
}

export default OneRepMaxCalculator;