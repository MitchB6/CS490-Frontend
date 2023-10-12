import React , { useState, useEffect } from 'react'

function Movies() {
  const [showDetails, setShowDetails] = useState(false);
  const [showMovies, setShowMovies] = useState(true);

  const [customerList, setCustomerList] = useState([]);
  const [customer_id, setCustomer_id] = useState('');

  const [movieList, setMovieList] = useState([]);
  const [search_movie, setSearch_movie] = useState('');
  const [film_id, setFilm_id] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [release_year, setRelease_year] = useState('');
  const [rental_rate, setRental_rate] = useState('');
  const [length, setLength] = useState('');
  const [rating, setRating] = useState('');
  const [replacement_cost, setReplacement_cost] = useState('');
  useEffect(() => {
    const fetchMovies = async () => {
      try{
        const moviesResponse = await fetch('http://localhost:5000/movie_search?search_movie=' + search_movie);
        if(moviesResponse.ok){
          const moviesData = await moviesResponse.json();
          setMovieList(moviesData);
        }else{
          throw new Error("Movie Retrieval Failed")
        }
      } catch (error) {
        console.error("Movie Retrieval Failed:", error);
      }
    };
    const fetchCustomers = async () => {
      try{
        const customersRes = await fetch('http://localhost:5000/customer_search?search_term=');
        if(customersRes.ok){
          const customersData = await customersRes.json();
          setCustomerList(customersData);
        }else{
          throw new Error("Customer Retrieval Failed")
        }
      }catch(error){
        console.error("Customer Retrieval Failed:", error);
      }
    }
    fetchMovies();
    fetchCustomers();
  }, [search_movie]);
  const handleMovieClick = (movie) => {
    setShowDetails(true);
    setShowMovies(false);

    setFilm_id(movie[0]);
    setTitle(movie[1]);
    setDescription(movie[2]);
    setRelease_year(movie[3]);
    setRental_rate(movie[4]);
    setLength(movie[5]);
    setRating(movie[6]);
    setReplacement_cost(movie[7]);
  }
  const handleBack = () => {
    setShowDetails(false);
    setShowMovies(true);

    setFilm_id('');
    setTitle('');
    setDescription('');
    setRelease_year('');
    setRental_rate('');
    setLength('');
    setRating('');
    setReplacement_cost('');
  }
  const handleRent = async (customer_id) => {
    try{
      const movieRentalRes = await fetch('http://localhost:5000/rent_movie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: customer_id,
          film_id: film_id,
        }),
      });
      if(movieRentalRes.ok){
        const movieRentalData = await movieRentalRes.json();
        // console.log(movieRentalData);
      }else{
        throw new Error("Movie Rental Failed");
      }
    }catch{
      console.error("Movie Rental Failed:", Error);
    }
    window.location.reload();
  };
  return (
    <div>
      {showMovies &&
      <div>
        <h3>Movies</h3>
        <input type="text" value={search_movie} onChange={(event) => setSearch_movie(event.target.value)} placeholder="Search for a movie" />
        <table>
          {movieList.map((movie) => (
            <tr key={movie[0]} onClick={() => handleMovieClick(movie)}>{movie[1]}</tr>
          ))}
        </table>
      </div>}
      {showDetails &&
      <div>
        <h3>Movie Details</h3>
        <table>
          <tr>
            <td>Film ID:</td>
            <td>{film_id}</td>
          </tr>
          <tr>
            <td>Title:</td>
            <td>{title}</td>
          </tr>
          <tr>
            <td>Description:</td>
            <td>{description}</td>
          </tr>
          <tr>
            <td>Release Year:</td>
            <td>{release_year}</td>
          </tr>
          <tr>
            <td>Rental Rate:</td>
            <td>{rental_rate}</td>
          </tr>
          <tr>
            <td>Length:</td>
            <td>{length}</td>
          </tr>
          <tr>
            <td>Rating:</td>
            <td>{rating}</td>
          </tr>
          <tr>
            <td>Replacement Cost:</td>
            <td>{replacement_cost}</td>
          </tr>
          <tr>
          <td><button onClick={(event) => handleRent(customer_id)}>Rent to</button></td>
            <td><select onChange={(event) => setCustomer_id(event.target.value)}>
              {customerList.map((customer) => (
                <option key={customer[0]} value={customer[0]}>{customer[0]}: {customer[1]} {customer[2]}</option>
              ))  
              }
            </select></td>
          </tr>
        </table>
        <p><button onClick={handleBack}>Back</button></p>
      </div>}
    </div>
  )
}

export default Movies