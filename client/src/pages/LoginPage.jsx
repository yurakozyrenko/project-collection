import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice';
import { clearStatus } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

export const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { status } = useSelector((state) => state.auth);
    const isAuth = useSelector(checkIsAuth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (status) {
            toast(status);
            dispatch(clearStatus());
        }
        if (isAuth) {
            navigate('/');
        }
    }, [status, isAuth, navigate, dispatch]);

    const handleSubmit = async () => {
        try {
            await dispatch(loginUser({ email, password }));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">Authorization</h2>
                <Form
                    className="d-flex flex-column"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <Form.Control
                        className="mt-3"
                        placeholder="Email..."
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Password..."
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Row className=" d-flex justify-content-between mt-3 p-2">
                        <div>
                            No account?
                            <NavLink to={'/registration'}>
                                Registration!
                            </NavLink>
                        </div>
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            className="mt-3"
                            variant="secondary"
                        >
                            Sign In
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};
