
import React, { useState, useContext, useMemo,useEffect } from 'react';
import {Link} from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Form, Button, Card, CardColumns, Image, Table, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

import SavedMovieContext from '../utils/SavedMovieContext';
import { saveMovie, searchOMDBMovies } from '../utils/API';
import Navbar from '../components/Navbar';
import queryString from 'query-string';
import {NewList} from './New';


function SearchMovies(props) {
    const { searchText } = queryString.parse(props.location.search)
    //create state for holding return OMDB api data
    const [searchedMovies, setSearchedMovies] = useState([]);

    //create state for holding our search field data
    const [searchInput, setSearchInput] = useState('');

    //get saved movies from app.js on load
    const { movies: savedMovies, getSavedMovies } = useContext(SavedMovieContext);
    useEffect(() => {
        if (searchText) {
            searchFor(searchText)
        }
    }, [searchText])

    const [filterSearch, setFilterSearch] = useState('');
    const [filterCriteria, setFilterCriteria] = useState('name');
    const [displayOption, setDisplayOption] = useState('grid');
    // {columnName: 'name, released, etc', direction: 'ascending'}
    const [sortConfig, setSortConfig] = useState(null);


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
                        movieId: movie.imdbID,
                        name: movie.Title,
                        imageURL: movie.Poster || '',
                        released: movie.Year
                    }))

                }
                console.log(movieData);
                return setSearchedMovies(movieData);
            })

            .then(() => setSearchInput(''))
            .catch((err) => console.log(err));
    };

    //create method to search for movies and set state on the form submit
    const handleSaveMovie = (movieId) => {
        //find the moviein 'searchedMovies' state by the matching id
        const movieToSave = searchedMovies.find((movie) => movie.movieId == movieId);
        console.log(movieToSave)

        //send the movies data to our api
        saveMovie(movieToSave)
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
        const sortedMovies = [...searchedMovies];

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
    }, [searchedMovies, sortConfig]);



    return (
        <>

            {/* <Jumbotron fluid bg='dark' className="text-light bg-dark"> */}
            <Container bg='dark' variant='dark'>
                {/* <h1> Search for Movies!</h1> */}
                <Form onSubmit={handleFormSubmit}>
                   
                       
                        <Col xs={12} md={3}>

                            <img
                                src="./searchright.PNG"
                                // width="90"
                                height="50"
                                className="d-inline-block align-top"
                            // alt="moviepal logo"
                            />
                        </Col>
                   
                </Form>

            </Container>
            {/* </Jumbotron> */}
            <Container fluid>


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


                <h3>{searchedMovies.length ? `Viewing ${searchedMovies.length} results:` : ''}</h3>


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
                                .filter((searchedMovies) => {
                                    return searchedMovies[filterCriteria].toLowerCase().includes(filterSearch.toLowerCase());
                                })
                                .map((searchedMovies, idx) => {
                                    return (
                                        <tr key={searchedMovies.movieid}>
                                            <td>{idx + 1}</td>
                                            <td>{searchedMovies.name}</td>
                                            <td>{searchedMovies.released}</td>
                                            <td>
                                                {searchedMovies.imageURL ? <Card.Img src={searchedMovies.imageURL} style={{ maxWidth: 150 }}
                                                    fluid alt={`the cover for ${searchedMovies.name}`} variant='top' /> :
                                                    null}

                                                {/* <Image
                              style={{ maxWidth: 150 }}
                              fluid
                              src={searchedMovies.imageUrl}
                              alt={`picture for ${searchedMovies.name}`}
                            /> */}
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </Table>
                ) : (
                    <CardColumns>
                                {searchedMovies
                                    .filter((searchedMovies) => {
                                        return searchedMovies[filterCriteria].toLowerCase().includes(filterSearch.toLowerCase());
                                    })
                                    .map((searchedMovies, idx) => {
                                        return (
                                            //   <Col key={searchedMovies.movieid} xs={12} md={6} lg={3} className='d-flex mb-3'>
                                            //     <Card border='primary'>
                                            //       <Card.Img
                                            //         variant='top'
                                            //         src={searchedMovies.imageUrl}
                                            //         alt={`picture for ${searchedMovies.name}`}
                                            //       />
                                            //       <Card.Body>
                                            //         <Card.Title>{searchedMovies.name}</Card.Title>
                                            //         <h5>{searchedMovies.released}</h5>                            
                                            //       </Card.Body>
                                            //     </Card>
                                            //   </Col>
                                            <Card key={searchedMovies.movieId} border='dark'>
                                                {searchedMovies.imageURL ? <Link to={'/moviedetails/'+searchedMovies.movieId}> <Card.Img src={searchedMovies.imageURL} alt={`the cover for ${searchedMovies.name}`} variant='top' /> </Link>:
                                                    null}
                                                <Card.Body>
                                                    <Card.Title>{searchedMovies.name}</Card.Title>
                                                    <Button
                                                        disabled={savedMovies.some((savedMovie) => savedMovie.movieId === searchedMovies.movieId)}
                                                        className="btn-block btn-info"
                                                        onClick={() => handleSaveMovie(searchedMovies.movieId)}>
                                                        {savedMovies.some(savedMovie => savedMovie.movieId === searchedMovies.movieId) ? 'In Watchlist!' : 'Add to Watchlist!'}
                                                    </Button>
                                                </Card.Body>
                                            </Card>
                                        );
                                    })}
                            </CardColumns>
                        
                    )}
                {/* 
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
                </CardColumns> */}
            </Container>
        </>
    );
}

export default SearchMovies;