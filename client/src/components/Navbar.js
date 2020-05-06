import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Header, Navigation, Drawer, Content, Textfield } from 'react-mdl';

// import { Navbar, Nav, Container } from 'react-bootstrap';

function AppNavbar() {
    const [searchInput, setSearchInput] = useState('');
    return (
        <div className="demo-big-content" style={{ height: '300px', position: 'relative' }}>>

            <Layout fixedHeader fixedTabs>
                <Header className="header-color" title="MoviePal" scroll>
                    <Navigation>
                        <Link to="/landingPage">home</Link>
                        <Link to="/Search">SearchMovies</Link>
                        <Link to="/Saved">SavedMovies</Link>

                    </Navigation>
                    <Textfield
                        value={searchInput}
                        onChange={(event) => setSearchInput(event.target.value)}
                        label="text"
                        expandable
                        expandableIcon="search"
                    />
                </Header>

                <Content>
                    <div className="page-content" />

                </Content>
            </Layout>
        </div>
    );
}

export default AppNavbar;