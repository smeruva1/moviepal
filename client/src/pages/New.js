import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
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



    const Star = () => {

        const [rating, setRating] = useState(null);
        const [hover, setHover] = useState(null)
        return (
            <div>
                {[...Array(5)].map((star, i) => {
                    const rateValue = i + 1;

                    return (
                    <label>
                        <input type='radio'
                            name='rating'
                            value={rateValue}
                            onClick={() => setRating(rateValue)}
                        />
                        <FaStar className='star'
                            color={rateValue <=(hover ||rating) ? "yellow" : "gray"}
                            onMouseEnter={() => setHover(rateValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    
                    </label>
                    )
                })}

            </div>
        )
    }

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
                            <Star />
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