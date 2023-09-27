import './App.css';
import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import OneRepMaxCalculator from './components/OneRepMaxCalculator';
import NavBar from './components/NavBar';



  function saveExercises(event) {
    event.preventDefault();
    
    // Adatbázis elérés próba:
    fetch('http://localhost:3001/api/exercise')
      .then(response => response.json())
      .then(data => console.error(data))
      .catch(error => console.error(error));

    //-----------------------------Ne uncommenteld hacsak nem akarsz még 1300 edzést az adatbázisba xd-----------//
    /*let bodypart;
    let equipment;
    let gifUrl;
    let id;
    let name;
    let target;

    exercises.map(exercise => {
      bodypart = exercise.bodypart;
      equipment = exercise.equipment;
      gifUrl = exercise.gifUrl;
      id = exercise.id;
      name = exercise.name;
      target = exercise.target;

      const data = { bodypart, equipment, gifUrl, id, name, target };
  
      fetch('http://localhost:3001/api/exercise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(response => { console.log(response)})
        .catch(error => { console.log(error) })
    })*/

  }


  const router = createBrowserRouter([
    { 
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/", 
          element: <Home />,
        },
      ],
    },
    { 
      path: "/onerepmax",
      element: <OneRepMaxCalculator />,
      children: [
       
      ],
    },
  ]);
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
  
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
