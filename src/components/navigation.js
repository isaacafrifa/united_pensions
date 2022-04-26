import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap'
import '../assets/css/navigation.css';

const Navigation = () => {
    return (
        <div className="row">
            <div className="col-md-12">
                <Navbar className="navbar"
                    collapseOnSelect
                    // fixed="top"
                     sticky="top" 
                    expand='md' bg='' variant='light'>
                    <Container fluid>

                        <Navbar.Toggle aria-controls='basic-navbar-nav' />
                        <Navbar.Collapse id='basic-navbar-nav' className="justify-content-center">
                            <Nav className="" activeKey={window.location.pathname}>
                            <LinkContainer to="/dashboard">
                                    <Nav.Link className='nav-link'>Dashboard</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/add-client">
                                    <Nav.Link className='nav-link'>add clients</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/all-clients">
                                    <Nav.Link className='nav-link'>view clients</Nav.Link>
                                </LinkContainer>
                                </Nav>
                        </Navbar.Collapse>

                    </Container>
                </Navbar>
            </div>
        </div>
    );
}

export default Navigation;