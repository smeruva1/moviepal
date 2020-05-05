import React from 'react';
// import {Switch, Route } from 'react-router-dom';
// import { Container } from 'react-bootstrap';
// import SearchMovies from './pages/SearchMovies';
import landingPage from '../pages/landingPage';
import SavedMovies from '../pages/SavedMovies';
// import Navbar from './components/Navbar';
import {Switch, Route} from 'react-router-dom';

const Main = () => (
    <Switch>
     <Route exact path = "/" component= {landingPage} />
     {/* <Route  path = "/home" component= {home} />
     <Route  path = "/popular" component= {popular} />
     <Route  path = "/watchlist" component= {watchlists} /> */}
     <Route  path = "/save" component= {SavedMovies} />
    </Switch>
)

export default Main;

