import React from 'react';
import NavBar from './NavBar';
import { Container } from 'react-bootstrap';

export const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Container>
                <NavBar />
                {children}
            </Container>
        </React.Fragment>
    );
};
