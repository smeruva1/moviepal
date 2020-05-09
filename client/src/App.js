import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import SearchMovies from './pages/SearchMovies';
import SavedMovies from './pages/SavedMovies';
import TopRated from './pages/TopRated';
import TvShows from  './pages/TvShows';
import New from './pages/New';
import Home from './pages/Home';
import Popular from './pages/Popular';
import Navbar from './components/Navbar';

import * as API from './utils/API';
import AuthService from './utils/auth';


//import our context object from state
import SavedMovieContext from './utils/SavedMovieContext';

function App() {
  const [userInfo, setUserInfo] = useState({
    savedBooks: [],
    username: '',
    email: '',
    bookCount: 0,
    // method to get user data after logging in
    getUserData: () => {
      // if user's logged in get the token or return null
      const token = AuthService.loggedIn() ? AuthService.getToken() : null;

      if (!token) {
        return false;
      }
      API.getMe(token)
        .then(({ data: { username, email, savedBooks, bookCount } }) =>
          setUserInfo({ ...userInfo, username, email, savedBooks, bookCount })
        )
        .catch((err) => console.log(err));
    },
  });

  // on load, get user data if a token exists
  useEffect(() => {
    userInfo.getUserData();
  });
  

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
        <UserInfoContext.Provider value={userInfo}>
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
              <Route render={() => <h1 className='display-2'>Wrong Page!</h1>} />
            </Switch>
          </SavedMovieContext.Provider>
        </Container>
        </UserInfoContext.Provider>

      </>
    </Router>
  );
}

export default App;
