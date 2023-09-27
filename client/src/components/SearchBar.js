import React from 'react';
import { useState, useEffect } from 'react';
import ContentPagination from './ContentPagination';
import './SearchBar.css';

function SearchBar(props) {

  const [inputValue, setInputValue] = useState("");
  const [buttonClick, setButtonClick] = useState(false);
  const [submitValue, setSubmitValue] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [data,setData]=useState(null);
  console.log(isSearching);


  const handleInput = (event) => {
    event.preventDefault();
    console.log(event)
    console.log(event.target.value)
    setInputValue(event.target.value)
    console.log(inputValue)
  }

  let objToSend = 'asd';

  function handleButtonClick(e) {
    objToSend = { searchvalue: inputValue }
    console.log(objToSend);
    e.preventDefault()
    fetch('http://localhost:3001/api/search/', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objToSend)
    })
      .then(response => response.json())
      .then(response => 
        setData(response)
      )
      .catch(error => {
        console.log(error)
      })
    console.log(inputValue);
    setIsSearching(true)
  }


  return (
    <div >
      <div className='SearchBar'>
        <input onChange={(e) => handleInput(e)} type="text" placeholder='search'></input>
        <button className="searchButton" onClick={handleButtonClick}>Search</button>
      </div>
      {isSearching ? <ContentPagination setIsSearching={()=>setIsSearching(false)}data={data} input={inputValue} obj={objToSend} api='http://localhost:3001/api/search/' /> : <ContentPagination setIsSearching={()=>setIsSearching(false)} obj={objToSend} api='http://localhost:3001/api/exercise/1' />}
    </div>
  );
}

export default SearchBar