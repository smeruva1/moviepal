import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getMovieDetails } from '../utils/API';
import { Jumbotron, Container, Row, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

function MovieDetails(props) {

    const { match: { params } } = props;
    const [MovieDetail, setMovieDetail] = useState([]);

    const [Movieinfo, setMovieinfo] = useState({});
    //console.log(params.id);

    useEffect(() => {

        getMovieDetails(params.id)
            .then(({ data }) => {
                console.log("------111-------");
                console.log(data);
                console.log("------222-------");
                console.log(data.utellydata.collection.locations);
                console.log("------333-------");
                console.log(data.movie);
                setMovieinfo(data.movie);
                return setMovieDetail(data.utellydata.collection.locations);
            })
            .catch((err) => console.log(err));

    }, [])
    return (
        <>
            <Row>
                <Col xs={12} md={6}>
                    <CardColumns className="singlecol">
                        <Card key={Movieinfo._id} border='info' className="singlecol">
                            {Movieinfo.imageURL ? <Card.Img src={Movieinfo.imageURL} alt={`the cover for ${Movieinfo.name}`} variant='top' /> :
                                null}
                            <Card.Body>
                                <Card.Title>{Movieinfo.name}</Card.Title>
                            </Card.Body>
                        </Card>
                    </CardColumns>
                </Col>
                <Col xs={12} md={6}>
                    < CardColumns >
                        {
                            MovieDetail.map((movie) => {
                                return (
                                    <Card key={movie.id} border='dark'>
                                        <Card.Body>
                                            <Card.Link href={movie.url} target="_blank">
                                                {movie.icon ? <Card.Img src={movie.icon}
                                                    className="streamSrc" alt={`the cover for ${movie.display_name}`} variant='top' /> : <Card.Img src=
                                                        'https://via.placeholder.com/150' className="streamSrc" alt={`the cover for ${movie.display_name}`} variant='top' />}
                                            </Card.Link>
                                        </Card.Body>
                                    </Card>)
                            })
                        }
                    </CardColumns >
                </Col>
            </Row>
        </>
    )

}

export default MovieDetails;