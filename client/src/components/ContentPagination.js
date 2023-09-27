import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './ContentPagination.css';


function ContentPagination(props) {
  const [items, setItems] = useState([]);
  const [currentPage,setCurrentPage]= useState(1);
  const [pagecount,setPagecount]= useState(0);
  const [open, setOpen] = React.useState(false);

  
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

  useEffect( () => { 
    async function fetch(){
      const dataFromServer = await fetchData(currentPage)
      setItems(dataFromServer);
    }
    fetch();
  }, [currentPage,props.input]);
  useEffect(() => {
    
      const getData = async()=>{
        if (props.api === 'http://localhost:3001/api/search/') {
      const res = await fetch("http://localhost:3001/api/searchall/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {"searchvalue":props.input
        }
        )

      });
      const data = await res.json();
      console.log(data);
      let total =0;
      data.forEach(element => {
         total++
      });
      console.log("total",total);
      setPagecount(Math.ceil(total/15))
      total =0;
      console.log(total);
    }else{
      const res = await fetch(
          `http://localhost:3001/api/exercise/`
      )
      const data = await res.json();
      let total =0;
      data.forEach(element => {
         total =total+1
      });
      setPagecount(Math.ceil(total/15))
      total =0;
      console.log(total);
     }
    }
      getData();
   }, [currentPage,props.input]);
  console.log(items);

  const fetchData = async (currentPage) => {
    console.log("input",props.input);
    console.log('api',props.api);
    console.log("currentpage",currentPage);
    if (props.api === 'http://localhost:3001/api/search/') {
      const res = await fetch(props.api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {"searchvalue":props.input,
          'currentPage':currentPage
        }
        )

      });
      const data = await res.json();
      return data;
    } else{
      console.log('api',props.api);
      const res = await fetch(
        `http://localhost:3001/api/exercise/${currentPage}`
      )
      const data = await res.json();
    
      return data;
    }
  }
  document.getElementById('Home')?.addEventListener('click',(e)=>{
    props.setIsSearching()
  })
  const handlePageClick = async (data) => {
    console.log(data.selected);
    setCurrentPage(data.selected + 1)
    const dataFromServer = await fetchData(data.selected + 1)
    console.log("data from server:",dataFromServer);
    setItems(dataFromServer)
  }

  function capitalizeWords(str) {
    return str.replace(/\b\w/g, function(txt) {
      return txt.toUpperCase();
    });
  }

  const handleAddToFavourites = (event) => {
    event.preventDefault();
    console.log(event);
    console.log(event.target.id);

    //a homeból idehozni a teljes fav listát, végigmappelni, és csak akkor fetchelni, ha nincs benne

    

    //id elküldése a szervernek, ő kikeresi az adatbázisból az objectet és beleteszi a favourites collectionbe
    //a Home-ban amikor van értéke a showFavouritesnek, egy get request majd lekéri az objecteket és kilistázza
    fetch(`http://localhost:3001/api/favourites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {"favouriteId":event.target.id},
        console.log("működik az add to favourites fetch"),
        console.log({"favouriteId":event.target.id})
      )
  

    });
    setOpen(true);
  }

  const handleAddToDailyWorkout = (e) => {
    //sends a POST to the server

    console.log(e.target.id)
    let newDailyExercise = items.filter(item => (item.id===e.target.id))

    return fetch("http://localhost:3001/api/dailyexercises", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDailyExercise),
    }).then((res) => res.json());
  }

  return (
    
    <div>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={pagecount}
        marginPagesDisplayed={3}
        pageRangeDisplayed={6}
        onPageChange={handlePageClick}
        containerClassName={'pagination justify-content-center'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'}
      />
      <div className="row m-2 cards">
        {items.map((item) => {
          return (
            <div key={item.id} className="col-sm-6 col-md-auto mr-auto ml-auto v my-3 ">
              <div id="exerciseCard" className="card shadow-sm w-100" style={{ minHeight: 225 }}>
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted text-center">
                    {capitalizeWords(item.name)}
                  </h6>
                  <p className="card-text">{capitalizeWords(item.target)}</p>
                  <img alt="gif" src={item.gifUrl}></img>
                  <button className='addFavoriteButton' id={item.id} onClick={(e)=>handleAddToFavourites(e)}>+</button>
                  <button className='addToDailyWorkout' id={item.id} onClick={(e)=>handleAddToDailyWorkout(e)}>Add to daily workout</button>
                </div>
  
              </div>
                <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Added to favourites"
                action={action}
                />
            </div>
          );
        })}
      </div>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={pagecount}
        marginPagesDisplayed={3}
        pageRangeDisplayed={6}
        onPageChange={handlePageClick}
        containerClassName={'pagination justify-content-center'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'}
      />
    </div>
  );
}

export default ContentPagination;