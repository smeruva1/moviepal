import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { Container, Card, CardColumns } from 'react-bootstrap';

const Home = () => {

    const [movies, setMovies] = useState({})

    const categories = ['popular', 'top_rated', 'upcoming']

    useEffect(() => {
        const films = {}
        categories.forEach(async el => {
            try {
                await axios.get(`https://api.themoviedb.org/3/movie/${el}?api_key=1fec72236532ee89a303c5cc707f12e4&language=en-US&page=1`)
                    .then(res => {

                        films[el] = res.data.results
                    })
            } catch (err) {
                console.log(err)
            }
        }

        )
        setMovies(films);
    }, [])


    return (
        <Container>
            <CardColumns>
                {/* {renderMovies()} */}
                
                {(Object.keys(movies).length > 0) && movies.top_rated ?
                    (movies.top_rated.map((movie) => {
                        console.log(movie)
                        return (
                            <Card key={movie.titles} border='dark'>
                                {movie.poster_path ? <Card.Img src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={`the cover for ${movie.title}`} variant='top' /> :
                                    null}
                                <Card.Body>
                                    {/* <Card.Title>
                                    <Star />
                                    </Card.Title> */}
                                </Card.Body>
                            </Card>
                        )
                    })) : null

                }
            </CardColumns>
        
    <br></br>
       
            <CardColumns>


                {(Object.keys(movies).length > 0) && movies.popular ?
                    (movies.popular.map((movie) => {
                        console.log(movie)
                        return (
                            <Card key={movie.titl} border='dark'>
                                {movie.poster_path ? <Card.Img src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={`the cover for ${movie.title}`} variant='top' /> :
                                    null}
                                <Card.Body>
                                    {/* <Card.Title>
                                        {movie.title}
                                    </Card.Title> */}
                                </Card.Body>
                            </Card>
                        )
                    })) : null
                }


            </CardColumns>
        </Container>
    )

}


export default Home;