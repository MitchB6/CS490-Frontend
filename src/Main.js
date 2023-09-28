import React, {useState, useEffect} from 'react'

function Main() {
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [topMoviesForActor, setTopMoviesForActor] = useState([]);
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/movies", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      fetch("http://localhost:5000/actors", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    ])
      .then(([moviesRes, actorsRes]) => {
        if (moviesRes != null && actorsRes != null) {
          return Promise.all([moviesRes.json(), actorsRes.json()]);
        } else {
          throw new Error(`Received status code ${moviesRes.status} and ${actorsRes.status}`);
        }
      })
      .then(([moviesData, actorsData]) => {
        setMovies(moviesData);
        setActors(actorsData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Fetch failed:", error);
        setIsLoading(false);
      });
  }, []);
  
  const movieClickHandler = (movieID) => {
    const movie = movies.find((movie) => movie[0] === movieID);
    setSelectedMovie(movie[3]);
  }
  const actorClickHandler = (actorID) => {
    fetch('http://localhost:5000/actors_movies', {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(actorMovieRes => {
      if (actorMovieRes.ok) {
        return actorMovieRes.json()
      } else {
        throw new Error(`Received status code ${actorMovieRes.status}`)
      }
    })
    .then(actorsMoviesData => {
      const filteredMovies = actorsMoviesData.filter(actorMovie => actorMovie[1] === actorID);
      const movieNames = filteredMovies.map(filteredMovie => filteredMovie[2]);
      setTopMoviesForActor(movieNames);
    })
    .catch(error => {
      console.error("Fetch failed:", error);
    });
  }

    return (
      <div>
        <div>
          <h3>Top 5 Movies</h3>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {movies.map((movie) => (
                <li key={movie[0]} onClick={() => movieClickHandler(movie[0])}>{movie[1]}</li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h3>Top 5 Actors</h3>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {actors.map((actor) => (
                <li key={actor[0]} onClick={() => actorClickHandler(actor[0])}>{actor[1]} {actor[2]}</li>
              ))}
            </ul>
          )}
        </div>
        <p>{selectedMovie}</p>
        <div>
          <ul> 
            {topMoviesForActor.slice(0, 5).map((movie) => (
              <li key={movie}>{movie}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  export default Main
