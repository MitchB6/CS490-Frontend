import React , { useState, useEffect } from 'react'

function Movies() {
  const [showDetails, setShowDetails] = useState(false);
  const [showMovies, setShowMovies] = useState(true);

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
    fetchMovies();
  }, [search_movie]);
  const handleMovieClick = () => {
    setShowDetails(true);
    setShowMovies(false);

    setFilm_id(movieList[0][0]);
    setTitle(movieList[0][1]);
    setDescription(movieList[0][2]);
    setRelease_year(movieList[0][3]);
    setRental_rate(movieList[0][4]);
    setLength(movieList[0][5]);
    setRating(movieList[0][6]);
    setReplacement_cost(movieList[0][7]);
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
  return (
    <div>
      {showMovies &&
      <div>
        <h3>Movies</h3>
        <input type="text" value={search_movie} onChange={(event) => setSearch_movie(event.target.value)} placeholder="Search for a movie" />
        <table>
          {movieList.map((movie) => (
            <tr key={movie[0]} onClick={() => handleMovieClick(movie[0])}>{movie[1]}</tr>
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
        </table>
        <p><button onClick={handleBack}>Back</button></p>
      </div>}
    </div>
  )
}

export default Movies