import React, { useState, useContext, useMemo } from 'react';
import { Jumbotron, Container, Row, Col, Form, Button, Card, CardColumns, Image, Table, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

//import context from global state
import SavedMovieContext from '../utils/SavedMovieContext';

//import getSavedMovies and deleteMovie from API file
import * as API from '../utils/API';

function SavedMovies() {
    const { movies: savedMovies, getSavedMovies } = useContext(SavedMovieContext);

    const [filterSearch, setFilterSearch] = useState('');
    const [filterCriteria, setFilterCriteria] = useState('name');
    const [displayOption, setDisplayOption] = useState('grid');
    // {columnName: 'name, released, etc', direction: 'ascending'}
    const [sortConfig, setSortConfig] = useState(null);


    // create function tht accepts the movie's mongo _id value as param and deletes the movie from the database
    const handleDeleteMovie = (mongoId) => {
        API.deleteMovie(mongoId)
            .then(() => getSavedMovies())
            .catch((err) => console.log(err));
    };

    const handleSort = (columnName) => {
        // set initial direction
        let direction = 'ascending';
        if (sortConfig?.columnName === columnName && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        setSortConfig({ columnName, direction });
    };

    const sortedMovies = useMemo(() => {
        const sortedMovies = [...savedMovies];

        if (sortConfig !== null) {
            sortedMovies.sort((a, b) => {
                if (a[sortConfig.columnName] < b[sortConfig.columnName]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.columnName] > b[sortConfig.columnName]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortedMovies;
    }, [savedMovies, sortConfig]);



    return (
        <>
            {/* <Jumbotron fluid bg='dark' className="text-light bg-dark"> */}
            <Container>
                <h1> Watch list!</h1>
            </Container>

            <Container fluid>
                {/* <h2>{savedMovies.length ? `Viewing ${savedMovies.length} results:` : 'You have no movies added to your watchlist'}</h2> */}
                <Row>
                    <br />
                </Row>
                <Form className='text-light'>
                    <Row>
                        <Col xs={12} md={4}>
                            <Form.Group>
                                <Form.Label>Filter results</Form.Label>
                                <Form.Control
                                    name='filterSearch'
                                    onChange={(e) => setFilterSearch(e.target.value)}
                                    value={filterSearch}
                                    type='text'
                                    placeholder='Start typing...'
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Group>
                                <Form.Label>Select Category to Filter By</Form.Label>
                                <Form.Control as='select' onChange={(e) => setFilterCriteria(e.target.value)}>
                                    <option value='name'>Name</option>
                                    <option value='released'>Released</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Group>
                                <Form.Label>Pick a Display Option</Form.Label>
                                <br />
                                <ToggleButtonGroup name='display-options'>
                                    <ToggleButton type='radio' value='table' onChange={(e) => setDisplayOption(e.target.value)}>
                                        Table
                  </ToggleButton>
                                    <ToggleButton type='radio' value='grid' onChange={(e) => setDisplayOption(e.target.value)}>
                                        Grid
                  </ToggleButton>
                                </ToggleButtonGroup>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>


                <h3>{savedMovies.length ? `Viewing ${savedMovies.length} results:` : ''}</h3>


                {displayOption === 'table' ? (
                    <Table bordered hover striped responsive='md'>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort(null)}>#</th>
                                <th onClick={() => handleSort('name')}>
                                    <span className='mr-3'>Name</span>
                                    {sortConfig?.columnName === 'name' && (
                                        <span>{sortConfig.direction === 'ascending' ? '⬆️' : '⬇️'}</span>
                                    )}
                                </th>
                                <th onClick={() => handleSort('released')}>
                                    <span className='mr-3'>released</span>
                                    {sortConfig?.columnName === 'released' && (
                                        <span>{sortConfig.direction === 'ascending' ? '⬆️' : '⬇️'}</span>
                                    )}
                                </th>

                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedMovies
                                .filter((savedMovies) => {
                                    return savedMovies[filterCriteria].toLowerCase().includes(filterSearch.toLowerCase());
                                })
                                .map((savedMovies, idx) => {
                                    return (
                                        <tr key={savedMovies.movieid}>
                                            <td>{idx + 1}</td>
                                            <td>{savedMovies.name}</td>
                                            <td>{savedMovies.released}</td>
                                            <td>
                                                {savedMovies.imageURL ? <Card.Img src={savedMovies.imageURL} style={{ maxWidth: 150 }}
                                                    fluid alt={`the cover for ${savedMovies.name}`} variant='top' /> :
                                                    null}

                                                {/* <Image
                              style={{ maxWidth: 150 }}
                              fluid
                              src={savedMovies.imageUrl}
                              alt={`picture for ${savedMovies.name}`}
                            /> */}
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </Table>
                ) : (
                        <Row>
                            {/* <CardColumns> */}
                            {/* <Container className="smallerCards"> */}
                                {savedMovies
                                    .filter((savedMovies) => {
                                        return savedMovies[filterCriteria].toLowerCase().includes(filterSearch.toLowerCase());
                                    })
                                    .map((savedMovies, idx) => {
                                        return (
                                            //   <Col key={savedMovies.movieid} xs={12} md={6} lg={3} className='d-flex mb-3'>
                                            //     <Card border='primary'>
                                            //       <Card.Img
                                            //         variant='top'
                                            //         src={savedMovies.imageUrl}
                                            //         alt={`picture for ${savedMovies.name}`}
                                            //       />
                                            //       <Card.Body>
                                            //         <Card.Title>{savedMovies.name}</Card.Title>
                                            //         <h5>{savedMovies.released}</h5>                            
                                            //       </Card.Body>
                                            //     </Card>
                                            //   </Col>
                                            //   <Col key={savedMovies.movieid} xs={12} md={3} lg={3} className='mb-3'>
                                            <Card key={savedMovies.movieId} border='dark'>
                                                {savedMovies.imageURL ? <Card.Img src={savedMovies.imageURL} alt={`the cover for ${savedMovies.name}`} variant='top' /> :
                                                    null}
                                                <Card.Body>
                                                    <Card.Title>{savedMovies.name}</Card.Title>
                                                    <Button className="btn-block btn-danger" onClick={() => handleDeleteMovie(savedMovies._id)}>Delete from Watchlist</Button>
                                                </Card.Body>
                                            </Card>
                                            // </Col>
                                        );
                                    })}
                            {/* </Container> */}
                            {/* </CardColumns> */}
                        </Row>
                    )}

                {/* <CardColumns>
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
                </CardColumns> */}


            </Container>
        </>
    );
}

export default SavedMovies;