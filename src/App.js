import { useState } from 'react';
import Main from './Main';
import Customer from './Customer';
import Movies from './Movies';
import Reports from './Reports';
import './styles.css';

function App() {
  const [showMain, setShowMain] = useState(true);
  const [showMovies, setShowMovies] = useState(false);
  const [showCustomer, setShowCustomer] = useState(false);
  const [showReports, setShowReports] = useState(false);

  const mainClickHandler = () => {
    setShowMain(true);
    setShowMovies(false);
    setShowCustomer(false);
    setShowReports(false);
  }
  const moviesClickHandler = () => {
    setShowMain(false);
    setShowMovies(true);
    setShowCustomer(false);
    setShowReports(false);
  }
  const customerClickHandler = () => {
    setShowMain(false);
    setShowMovies(false);
    setShowCustomer(true);
    setShowReports(false);
  }
  const reportsClickHandler = () => {
    setShowMain(false);
    setShowMovies(false);
    setShowCustomer(false);
    setShowReports(true);
  }

  return (
    <div>
      <p><button onClick={mainClickHandler}>Home</button></p>
      <button onClick={moviesClickHandler}>Movies</button>
      <button onClick={customerClickHandler}>Customer</button>
      <button onClick={reportsClickHandler}>Reports</button>
      {showMain && <Main/>}
      {showMovies && <Movies/>}
      {showCustomer && <Customer/>}
      {showReports && <Reports/>}
    </div>
  );
}

export default App;
