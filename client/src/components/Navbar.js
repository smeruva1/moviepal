import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

function AppNavbar() {
    return (
        <Navbar bg='dark' variant='dark' expand='lg'>
            <Container fluid>
                <Navbar.Brand as={Link} to='/'>
                    <img
                        src="./MoviePal.PNG"
                        // width="90"
                         height="50"
                        className="d-inline-block align-top"
                        alt="moviepal logo"
                    />{' '} Enrich your movie list wisely
            </Navbar.Brand>
                <Navbar.Toggle aria-controls='navbar' />
                <Navbar.Collapse id='navbar'>
                    <Nav className='ml-auto'>
                        <Nav.Link as={Link} to='/'>
                            Search for Movies
                    </Nav.Link>
                        <Nav.Link as={Link} to='/saved'>
                            Watchlist
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>);
}

export default AppNavbar;