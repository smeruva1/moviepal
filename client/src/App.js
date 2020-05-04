import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import SearchMovies from './pages/SearchMovies';
import SavedMovies from './pages/SavedMovies';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Container className='my-4'>
          <Switch>
            <Route exact path='/' component={SearchMovies} />
            <Route exact path='/saved' component={SavedMovies} />
            <Route render={() => <h1 className='display-2'>Wrong Page!</h1>} />
          </Switch>
        </Container>

      </>
    </Router>
  );
}

export default App;
