import React, { useState } from 'react';
import { Link ,useHistory} from 'react-router-dom';
import { Navbar, Nav, Col, Container, Form } from 'react-bootstrap';

function AppNavbar() {
    const [searchInput, setSearchInput] = useState('');
    const history = useHistory()
    
    return  (
        <Navbar bg='dark' variant='dark' expand='lg'>
            <Container fluid>
                <Col xs={12} md={4}>
                    <Navbar.Brand as={Link} to='/'>
                        <img
                            src="./MoviePal.PNG"
                            // width="90"
                            height="50"
                            className="d-inline-block align-top"
                            alt="moviepal logo"
                        />{' '} Enrich your movie list wisely
            </Navbar.Brand>
                </Col><Col xs={12} md={4}>
                    <Navbar.Toggle aria-controls='navbar' />
                    <Navbar.Collapse id='navbar'>
                        <Nav className='ml-auto'>
                            <Nav.Link as={Link} to='/'>
                                Home
                    </Nav.Link>
                    
                            <Nav.Link as={Link} to='/new'>
                                NewMovies
                    </Nav.Link>
                        
                            <Nav.Link as={Link} to='/popular'>
                                Popular
                    </Nav.Link>

                    <Nav.Link as={Link} to='/tv'>
                                TVShows
                    </Nav.Link>
                        
                            <Nav.Link as={Link} to='/top'>
                                Top Rated
                    </Nav.Link>
                        
                            <Nav.Link as={Link} to='/saved'>
                                Watchlist
                    </Nav.Link>
                        
                    </Nav>
                    </Navbar.Collapse>
                </Col><Col xs={12} md={4}>
                    <Form.Control
                        id="searchTextField"
                        value={searchInput}
                        onKeyPress={(event)=>{
                            if (event.charCode===13){
                                history.push(`/search?searchText=${searchInput}`)
                                setSearchInput('')
                            }
                            
                        }}
                        onChange={(event) => setSearchInput(event.target.value)}
                        type='text'
                        placeholder='Search for a Movie'
                    />
                </Col>

            </Container>
        </Navbar>
    )
}

export default AppNavbar;