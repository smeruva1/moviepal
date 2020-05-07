import React, { useContext } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

//import context from global state
import SavedMovieContext from '../utils/SavedMovieContext';

//import getSavedMovies and deleteMovie from API file
import * as API from '../utils/API';

function SavedMovies() {
    const { movies: savedMovies, getSavedMovies } = useContext(SavedMovieContext);

    // create function tht accepts the movie's mongo _id value as param and deletes the movie from the database
    const handleDeleteMovie = (mongoId) => {
        API.deleteMovie(mongoId)
            .then(() => getSavedMovies())
            .catch((err) => console.log(err));
    };

    return (
        <>
            {/* <Jumbotron fluid bg='dark' className="text-light bg-dark"> */}
                <Container>
                    <h1> Watch list!</h1>

                </Container>
            {/* </Jumbotron> */}

            <Container fluid>
                <h2>{savedMovies.length ? `Viewing ${savedMovies.length} results:` : 'You have no movies added to your watchlist'}</h2>
                <CardColumns>
                    {savedMovies.map((movie) => {
                        // console.log(savedMovies)
                        return (
                            <Card key={movie._id} border='info'>
                                {movie.imageURL ? <Card.Img src={movie.imageURL} alt={`the cover for ${movie.name}`} variant='top' /> :
                                    null}
                                <Card.Body>
                                    <Card.Title>{movie.name}</Card.Title>
                                    <Button className="btn-block btn-danger" onClick={() => handleDeleteMovie(movie._id)}>Delete from Watchlist</Button>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </CardColumns>
            </Container>
        </>
    );
}

export default SavedMovies;