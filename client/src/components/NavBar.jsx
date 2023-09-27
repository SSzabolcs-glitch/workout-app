import React from 'react';
import { Link } from 'react-router-dom';

function NavBar(props) {

    return (
        <div>
            <div className='NavBar'>
                <div className='options'>
                    <a id='Home' className='navbarItem'>Home</a>
                    <a className='navbarItem'>Exercises</a>
                    <button onClick={(e)=>props.handleShowFavourites(e)} className="favouritesButton navbarItem">Favourites</button>
                    <a><Link to="/onerepmax">1RM calculator</Link></a>
                </div>
            </div>
        </div>
    );
}

export default NavBar;