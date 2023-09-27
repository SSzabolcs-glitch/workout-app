import React, { useState, useEffect } from 'react';
//import ContentPagination from './ContentPagination';
import SearchBar from './SearchBar';

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import './Home.css';

//import { Link } from "react-router-dom";
import DailyWorkout from "./DailyWorkout"
import { Link } from 'react-router-dom';

function Home(props) {

  const [showFavourites, setShowFavourites] = useState(false);
  const [myFavourites, setMyFavourites] = useState([]);
  const [open, setOpen] = React.useState(false);

  const [commenting, setCommenting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [commentingId, setCommentingId] = useState("");
  const [comment, setComment] = useState("");
  const [sendComment, setSendComment] = useState(false);

  const [showDailyWorkout, setShowDailyWorkout] = useState(false);

  const [showBMI, setShowBMI] = useState(false);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [bmiClass, setBmiClass] = useState('');


  //-------------SnackBar----------------------//
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  //---------------------------------------------------------//

  //handle clickbe tenni use effect helyett
  useEffect(() => {
    fetch("http://localhost:3001/api/favourites")
      .then(res => res.json())
      //.then(data => console.log(data))
      .then(data => setMyFavourites(data))
    setDeleting(false)
  }, [showFavourites, sendComment, deleting])


  /*
      function getFavourites () {
          fetch("http://localhost:3001/api/favourites")
          .then(res => res.json())
          //.then(data => console.log(data))
          .then(data => setMyFavourites(data))
      }
  */

  const handleShowFavourites = (event) => {
    event.preventDefault()
    console.log(event)
    setShowFavourites(true)

    //getFavourites()
    console.log(myFavourites)
  }

  const handleBMICalculator = (event) => {
    event.preventDefault()
    console.log(event)
    setShowBMI(true)

    console.log(myFavourites)
  }
  const handleBackButton = (event) => {
    event.preventDefault()
    console.log(event)
    setShowFavourites(false)
    setShowDailyWorkout(false)
    setShowBMI(false)
  }


  const handleRemoveFromFavourites = (event) => {
    event.preventDefault();
    console.log(event);
    console.log(event.target.id)

    setDeleting(true)

    //id elküldése a szervernek, ő kikeresi az adatbázisból az objectet és deleteli a favourites collectionből
    fetch(`http://localhost:3001/api/favourites/${event.target.id}`, {
      method: 'DELETE'
    });
    //getFavourites()
    setOpen(true);

  };

  useEffect(() => {
    fetch(`http://localhost:3001/api/favourites`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        { "buttonId": commentingId.slice(-4), "editedComment": comment },
        console.log("működik a patch"),
        console.log({ "buttonId": commentingId.slice(-4) })
      )
    });
    setSendComment(false)
  }, [sendComment])


  const handleAddComment = (event) => {
    event.preventDefault()
    console.log(event)
    console.log(event.target.id)
    //setCommenting(true), inputmező megjelenik, setComment(): megkapja az inputmező tartalmát
    //az inputmező tartalma és az id mehet a szervernek, aki beteszi findoneandupdate-tel a databasebe

    setCommentingId(event.target.id)
    setCommenting(true)
  }

  const handleSaveComment = (event) => {
    event.preventDefault()
    console.log(event)
    console.log(event)
    setSendComment(true)
    setCommenting(false)
    //getFavourites()
  }
  const handleShowDailyWorkout = (event) => {
    event.preventDefault()
    console.log(event)
    setShowDailyWorkout(true);
  }

  function capitalizeWords(str) {
    return str.replace(/\b\w/g, function (txt) {
      return txt.toUpperCase();
    });
  }

  const handleCalculate = () => {
    const heightM = height / 100;
    const bmiValue = (weight / (heightM * heightM)).toFixed(1);
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setBmiClass('Underweight');
    } else if (bmiValue < 25) {
      setBmiClass('Normal');
    } else if (bmiValue < 30) {
      setBmiClass('Overweight');
    } else {
      setBmiClass('Obese');
    }
  };

  const handleReset = () => {
    setAge('');
    setGender('male');
    setHeight('');
    setWeight('');
    setBmi('');
    setBmiClass('');
  };

  return (
    <>
      {showBMI ? (
        <>
          <div className="NavBar">
            <div className='options'>
              <h2 id='Home' onClick={(e) => handleBackButton(e)} className='navbarItem'>Home</h2>
            </div>
          </div>

          <div className="bmi-body">
            <div className="bmi-calculator">
              <h2>BMI Calculator</h2>
              <div>
                <label htmlFor="age">Age: </label>
                <input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} />

                <label htmlFor="gender">Gender: </label>
                <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label htmlFor="height">Height (cm): </label>
                <br />
                <input id="height" type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
              </div>
              <div>
                <label htmlFor="weight">Weight (kg): </label>
                <br />
                <input id="weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
              </div>
              <div>
                <br />
                <button onClick={handleCalculate}>Calculate</button>
                <button onClick={handleReset}>Reset</button>
              </div>
              <br />
              {bmi && (
                <div className="bmi-result">
                  <p>Your BMI: {bmi}</p>
                  <p>Your BMI class: {bmiClass}</p>
                </div>
              )}
            </div>
          </div>
        </>
      ) : showFavourites ? (
        <>
          <div className="NavBar">
            <div className='options'>
              <h2 id='Home' onClick={(e) => handleBackButton(e)} className='navbarItem'>Home</h2>
            </div>

          </div>

          <div className="row m-2 cards">
            {myFavourites.map((fav) => {
              return (
                <div key={fav.id} className="col-sm-6 col-md-auto mr-auto ml-auto v my-3 ">
                  <div id="exerciseCard" className="card shadow-sm w-100" style={{ minHeight: 225 }}>
                    <div className="card-body">
                      <h6 className="card-subtitle mb-2 text-muted text-center">
                        {capitalizeWords(fav.name)}
                      </h6>
                      <p className="card-text">{capitalizeWords(fav.target)}</p>
                      <img alt="gif" src={fav.gifUrl}></img>
                      <button id={fav.id} className="removeFavorites" onClick={(e) => handleRemoveFromFavourites(e)}>-</button>
                    </div>
                  </div>
                  {commenting ? (
                    fav.id === commentingId.slice(-4) ? (
                      <>
                        <button className="saveCommentButton" id={"saveCommentButton-" + (fav.id)} onClick={(e) => handleSaveComment(e)}>Save comment</button>
                        <div>
                          <input id="commentEditInput" type="text" defaultValue={fav.comment} onChange={event => {
                            setComment(event.target.value)
                            console.log(event.target.value)
                          }} />
                        </div>
                      </>
                    ) : (
                      <>
                        <button className="addCommentButton" id={"addCommentButton-" + (fav.id)} onClick={(e) => handleAddComment(e)}>Add comment</button>
                        <div className="commentDiv">{fav.comment}</div>
                      </>
                    )
                  ) : (
                    <>
                      <button className="addCommentButton" id={"addCommentButton-" + (fav.id)} onClick={(e) => handleAddComment(e)}>Add comment</button>
                      <div className="commentDiv">{fav.comment}</div>
                    </>
                  )}
                  <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message="Removed from favourites"
                    action={action}
                  />
                </div>
              );
            })}
          </div>

        </>
      ) : (showDailyWorkout ? (
        <>
          <div className="NavBar">
            <div className='homeNavigation'>
              <button onClick={(e) => handleBackButton(e)} className="backButton navbarItem"><h2>Home</h2></button>
            </div>
          </div>
          <DailyWorkout />
        </>

      ) : (
        <div className='Home'>
          <div className='NavBar'>
            <div className='options'>
              <h2 id='Home' className='navbarItem'>Home</h2>
              <h2 onClick={(e) => handleBMICalculator(e)} className='navbarItem'>BMI Calculator</h2>
              <h2 onClick={(e) => handleShowFavourites(e)} className="favouritesButton navbarItem">Favourites</h2>
              <Link className='navbarItem' to="/onerepmax"><h2 className='navbarItem'>1RM calculator</h2></Link>
              <h2 type="button" className='navbarItem' onClick={(e) => handleShowDailyWorkout(e)}>Daily workout planner</h2>
            </div>
          </div>
          <SearchBar></SearchBar>
        </div>
      ))
      }
    </>
  );
}

export default Home;