import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import SavedMovieContext from '../utils/SavedMovieContext';
import {saveMovie} from '../utils/API';
import { Jumbotron, Container, Row, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

const NewList = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=1fec72236532ee89a303c5cc707f12e4&language=en-US&page=1`)

            .then(res => {
                
                setMovies(res.data.results);
            })
    }, [])

    const { movies: savedMovies, getSavedMovies } = useContext(SavedMovieContext);

    const handleSaveMovie = (movieId) => {
        console.log(movieId)
        const movieToSave = movies.find((movie) => movie.id == movieId);

        console.log(movieToSave)
        saveMovie({
            movieId: movieToSave.id,
            name: movieToSave.title,
            imageURL: movieToSave.poster_path,
            released: movieToSave.releasedYear,
        })
            .then(() => getSavedMovies())
            .catch((err) => console.log(err));

    }

    return (
        <section>
        <CardColumns>
            {movies.map((movie) => {
                return (
                    <Card key={movie.id} border='dark' className = 'image'>
                        {movie.poster_path ? <Card.Img src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={`the cover for ${movie.title}`} variant='top' /> :
                            null}
                        <Card.Body>
                            <Card.Title>
                                Title:{movie.title}
                            </Card.Title>
                        </Card.Body>
                    </Card>
                )
            })}
        </CardColumns>
        </section>
    )

}


export default NewList;