import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Navbar, Nav, Container, Form } from 'react-bootstrap';

function AppNavbar() {
    const [searchInput, setSearchInput] = useState('');
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        document.getElementById('searchTextField').addEventListener('keypress', (e) => {
            if (e.charCode === 13) {
                setRedirect(true);
            }
        })
        return () => {
            document.getElementById('searchTextField').removeEventListener('keypress')
        }
    }, [])

    return redirect ? <Redirect to={`/Search?searchText=${searchInput}`} /> : (
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
                        <Nav.Link as={Link} to='/new'>
                            New Movies
                    </Nav.Link>
                        <Nav.Link as={Link} to='/popular'>
                            Popular
                    </Nav.Link>
                        <Nav.Link as={Link} to='/top'>
                            Top Rated
                    </Nav.Link>

                        <Nav.Link as={Link} to='/saved'>
                            Watchlist
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Form.Control
                    id="searchTextField"
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                    type='text'
                    size='sm-1'
                    placeholder='Search for a Movie'
                />


            </Container>
        </Navbar>
    )
}

export default AppNavbar;