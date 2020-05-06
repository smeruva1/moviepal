import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Row, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { Layout, Header, Navigation, Drawer, Content, Textfield } from 'react-mdl';
import Navbar from '../components/Navbar';

import { saveMovie, searchOMDBMovies } from '../utils/API';

function SearchMovies() {
    //create state for holding return OMDB api data
    const [searchedMovies, setSearchedMovies] = useState([]);

    //create state for holding our search field data
    const [searchInput, setSearchInput] = useState('');

    //create method to search for Movies and set state on form submit
    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        searchOMDBMovies(searchInput)
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
    };

    return (
        <>
            <Jumbotron fluid bg='dark' className="text-light bg-dark">
                <Container>
                    <h1> Search for Movies!</h1>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Row>
                            <Col xs={12} md={8}>
                                <Form.Control
                                    name='searchInput'
                                    value={searchInput}
                                    onChange={(event) => setSearchInput(event.target.value)}
                                    type='text'
                                    size='lg'
                                    placeholder='Search for a Movie'
                                />
                            </Col>
                            {/* <Textfield
                            name='searchInput'
                            value={searchInput}
                            onChange={(event) => setSearchInput(event.target.value)}
                           label="text"
                           expandable
                           expandableIcon="submit" /> */}
                            <Col xs={12} md={4}>
                                <Button type="submit">Submit Search</Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Container>
            </Jumbotron>
            <Container fluid>
                <h2>{searchedMovies.length ? `Viewing ${searchedMovies.length} results:` : 'search for a movie to begin'}</h2>

                <CardColumns>
                    {searchedMovies.map((movie) => {
                        // console.log(searchedMovies)
                        return (

                            <Card key={movie.id}>

                                {movie.ImageURL ? <Card.Img src={movie.ImageURL} alt={`the cover for ${movie.name}`} variant='top' /> :
                                    null}
                                <Card.Body>
                                    <Card.Title>{movie.name}</Card.Title>
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