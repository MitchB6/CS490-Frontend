import './styles.css';
import React, {useState, useEffect} from 'react'

function App() {
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
  
  const [selectedMovie, setSelectedMovie] = useState(null);

  const movieClickHandler = (movieID) => {
    const movie = movies.find((movie) => movie[0] === movieID);
    setSelectedMovie(movie[3]);
  }

    return (
      <div>
        <a href="/">
          <h1 className="top">Home</h1>
        </a>
        <div className="row">
          <a href="https://google.com/">
            <h2 className="subsection">Movies</h2>
          </a>
          <a href="https://yahoo.com/">
            <h2 className="subsection">Customers</h2>
          </a>
          <a href="https://bing.com/">
            <h2 className="subsection">Reports</h2>
          </a>
        </div>
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
                <li key={actor[0]}>{actor[1]} {actor[2]}</li>
              ))}
            </ul>
          )}
        </div>
        {selectedMovie && <p>{selectedMovie}</p>}
      </div>
    );
  }

  test
  export default App
