import React, { useState, useEffect } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import {
    checkIsAuth,
    logout,
    checkAuth,
} from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import constants from '../constants/const';

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isAuth = useSelector(checkIsAuth);
    const { user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(checkAuth());
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [dispatch]);

    const logoutHandler = () => {
        dispatch(logout());
        window.localStorage.removeItem('token');
        toast(constants.LOGOUT_MSG);
        navigate('/');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand
                    as={NavLink}
                    to={'/'}
                    style={location.pathname === '/' ? { color: 'blue' } : null}
                >
                    Main
                </Navbar.Brand>
                {isAuth && (
                    <Nav className="ml-auto">
                        <Nav.Link
                            as={NavLink}
                            to={'/collections'}
                            style={
                                location.pathname === '/collections'
                                    ? { color: 'blue' }
                                    : null
                            }
                        >
                            My Collections
                        </Nav.Link>
                    </Nav>
                )}

                {isAuth && user && (
                    <Nav className="ml-auto">
                        <Nav.Item>
                            <Nav.Link> User: {user.email}</Nav.Link>
                        </Nav.Item>
                    </Nav>
                )}

                <Nav className="ml-auto">
                    {isAuth ? (
                        <Button onClick={logoutHandler} variant="secondary">
                            Sign Out
                        </Button>
                    ) : (
                        <Button
                            variant="secondary"
                            onClick={() => navigate('/login')}
                        >
                            Sign In
                        </Button>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;
