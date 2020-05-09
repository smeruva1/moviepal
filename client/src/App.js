import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import SearchMovies from './pages/SearchMovies';
import SavedMovies from './pages/SavedMovies';
import TopRated from './pages/TopRated';
import TvShows from  './pages/TvShows';
import MovieDetails from './pages/MovieDetails';
import New from './pages/New';
import Home from './pages/Home';
import Popular from './pages/Popular';
import Navbar from './components/Navbar';

import * as API from './utils/API';


//import our context object from state
import SavedMovieContext from './utils/SavedMovieContext';

function App() {

  //create state for our saved
  const [savedMovieState, setSavedMovieState] = useState({
    movies: [],
    getSavedMovies: () => {
      API.getSavedMovies()
        .then(({ data }) => setSavedMovieState({ ...savedMovieState, movies: data }));
    },
  });

  //get saved movies on load
  useEffect(() => {
    savedMovieState.getSavedMovies();
  }, []);


  return (
    <Router>
      <>
        <Navbar />
        <Container className='my-4'>
          <SavedMovieContext.Provider value={savedMovieState}>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route  exact path='/new' component={New} />
              <Route  exact path='/top' component={TopRated} />
              <Route  exact path='/tv' component={TvShows} />
              <Route  exact path='/popular' component={Popular} />
              <Route exact path='/search' component={SearchMovies} />
              <Route exact path='/saved' component={SavedMovies} />
              <Route exact path='/moviedetails/:id' component={MovieDetails} />
              <Route render={() => <h1 className='display-2'>Wrong Page!</h1>} />
            </Switch>
          </SavedMovieContext.Provider>
        </Container>

      </>
    </Router>
  );
}

export default App;
