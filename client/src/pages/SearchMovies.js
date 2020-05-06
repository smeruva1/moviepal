import React, { useState, useContext,useEffect } from 'react';
import { Jumbotron, Container, Row, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import queryString from 'query-string';

import SavedMovieContext from '../utils/SavedMovieContext';

import { saveMovie, searchOMDBMovies } from '../utils/API';

function SearchMovies(props) {
    const { searchText } = queryString.parse(props.location.search)

    //create state for holding return OMDB api data
    const [searchedMovies, setSearchedMovies] = useState([]);

    //create state for holding our search field data
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        if (searchText) {
            searchFor(searchText)
        }
    }, [])
    

    //get saved movies from app.js on load
    const { movies: savedMovies, getSavedMovies } = useContext(SavedMovieContext);

    //create method to search for Movies and set state on form submit
    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }
        searchFor(searchInput)
        
    };

    function searchFor(title) {
        searchOMDBMovies(title)
            .then(({ data }) => {
                // console.log(JSON.stringify (data));
                let movieData = [];
                if (data != null && data != null) {
                    // movieData.push(data.Search)
                    movieData = data.Search.map((movie) => ({
                        id: movie.imdbID,
                        name: movie.Title,
                        ImageURL: movie.Poster,
                        Released: movie.Year
                    }))

                }
                // console.log(movieData);
                return setSearchedMovies(movieData);
            })

            .then(() => setSearchInput(''))
            .catch((err) => console.log(err));
    }

    //create method to search for movies and set state on the form submit
    const handleSaveMovie = (movieId) => {
        //find the moviein 'searchedMovies' state by the matching id
        const movieToSave = searchedMovies.find((movie) => movie.movieId == movieId);

        //send the movies data to our api
        saveMovie(movieToSave)
            .then(() => getSavedMovies())
            .catch((err) => console.log(err));
    };


    return (
        <>
            <Container fluid>
                <h2>{searchedMovies.length ? `Viewing ${searchedMovies.length} results:` : 'search for a movie to begin'}</h2>

                <CardColumns>
                    {searchedMovies.map((movie) => {
                        // console.log(searchedMovies)
                        return (
                            <Card key={movie.movieId} border='dark'>
                                {movie.imageURL ? <Card.Img src={movie.imageURL} alt={`the cover for ${movie.name}`} variant='top' /> :
                                    null}
                                <Card.Body>
                                    <Card.Title>{movie.name}</Card.Title>
                                    <Button
                                        disabled={savedMovies.some((savedMovie) => savedMovie.movieId === movie.movieId)}
                                        className="btn-block btn-info"
                                        onClick={() => handleSaveMovie(movie.movieId)}>
                                        {savedMovies.some(savedMovie => savedMovie.movieId === movie.movieId) ? 'In Watchlist!' : 'Add to Watchlist!'}
                                    </Button>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </CardColumns>
            </Container>
        </>
    );
}

export default SearchMovies;


