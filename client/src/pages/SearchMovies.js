import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

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
            .then(({ data }) => 
            {
                // console.log(data);
                // console.log(searchInput);
                setSearchedMovies(data);
            }
            )
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
                            <Col xs={12} md={4}>
                                <Button type="submit">Submit Search</Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Container>
            </Jumbotron>
        </>
    );
}

export default SearchMovies;