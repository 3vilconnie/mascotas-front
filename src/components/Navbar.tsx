import React from 'react';
import { Navbar as BSNavBar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export const Navbar: React.FC = () => {
    return (
        <BSNavBar bg="dark" variant="dark" expand="lg" className="shadow-sm">
            <Container>
                <BSNavBar.Brand as={NavLink} to="/">
                    Mascotas App 
                </BSNavBar.Brand>
                <BSNavBar.Toggle aria-controls="basic-navbar-nav" />
                <BSNavBar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/">
                            Mascotas
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/crear">
                            Registrar Mascota
                        </Nav.Link>
                    </Nav>
                </BSNavBar.Collapse>
            </Container>
        </BSNavBar>
    );
}