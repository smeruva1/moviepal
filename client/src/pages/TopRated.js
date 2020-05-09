import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { Jumbotron, Container, Row, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

const NewList = () =>  {

    
    const [movies, setMovies] = useState([])

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=1fec72236532ee89a303c5cc707f12e4&language=en-US&page=1`)
        
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
    return (
        <CardColumns>
            {movies.map((movie) => {
                return (
                    <Card key={movie.title} border='dark'>
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
    )
    
}


export default NewList;