import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, CardColumns } from 'react-bootstrap';

const PopularList = () =>  {
    
    const [movies, setMovies] = useState([])

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=1fec72236532ee89a303c5cc707f12e4&language=en-US&page=1`)
            .then(res => {
                setMovies(res.data.results);
            })
    }, [])
    return (
        <CardColumns>
            {movies.map((movie) => {
                return (
                    <Card key={movie.title} border='dark'>
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
    )
    
}


export default PopularList;