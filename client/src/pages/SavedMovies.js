import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

//import getSavedMovies and deleteMovie from API file
import { getSavedMovies, deleteMovie } from '../utils/API';


function SavedMovies() {

    //create state for our saved movies array coming from our API
    const [savedMovies, setSavedMovies] = useState([]);

    useEffect(() => {
        getMovies();
    }, []);

    //create function to run getSavedMovies and save our saved movies from the DB to state
    const getMovies = () => {
        getSavedMovies()
            .then(({ data }) => setSavedMovies(data))
            .catch((err) => console.log(err));
    };


// create function tht accepts the movie's mongo _id value as param and deletes the movie from the database
const handleDeleteMovie = (mongoId) => {
    console.log(mongoId);

    deleteMovie(mongoId)
    .then(() => getMovies())
    .catch((err) => console.log(err));
};


    return (
        <>
            <Jumbotron fluid bg='dark' className="text-light bg-dark">
                <Container>
                    <h1> Watch list!</h1>

                </Container>
            </Jumbotron>

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