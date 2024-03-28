import React, { useState, useEffect } from 'react';
import { getSocket, initSocket } from '../helpers/socketHelper';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DisplayItem from '../components/DisplayItem';
import { checkIsAuth } from '../redux/features/auth/authSlice';
import { clearStatus, getItemById } from '../redux/features/item/itemSlice';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';
import {
    createComment,
    getItemComments,
} from '../redux/features/comment/commentSlice';
import DisplayComment from '../components/DisplayComment';
import constants from '../constants/const';

export const ItemPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isAuth = useSelector(checkIsAuth);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    const [socket, setSocket] = useState(getSocket());
    const [comments, setComments] = useState([]);

    const { id } = useParams();
    const { status } = useSelector((state) => state.item);
    const { items } = useSelector((state) => state.item);
    const { user } = useSelector((state) => state.auth);

    const handlerGoBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        initSocket();
        setSocket(getSocket());

        return () => {
            if (socket) {
                socket.off('data');
            }
        };
    }, [socket]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getItemById({ id }));
                const response = await dispatch(getItemComments({ id }));
                setComments(response.payload.comments);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [dispatch, id]);

    useEffect(() => {
        if (socket) {
            socket.on('data', (data) => {
                if (data.itemId === +id) {
                    setComments((prevComments) => [...prevComments, data]);
                }
            });
        }
    }, [socket, id]);

    useEffect(() => {
        if (status) {
            toast(status);
            if (status === constants.ITEM_DELETE_SUCCESS) {
                navigate('/items');
            }

            console.log(status);
            navigate('/items');
            dispatch(clearStatus());
        }
    }, [status, navigate, dispatch]);

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            if (!comment.trim()) {
                toast.error('Please enter a non-empty comment.');
                return;
            }
            const itemId = items.id;

            await dispatch(createComment({ comment, itemId }));
            if (socket) {
                const name = user.email;
                socket.emit('new_comment', { comment, itemId, name });
            }
            setComment('');
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <div className="mt-4">
                <Button variant="info" onClick={handlerGoBack} size="sm">
                    <FaArrowLeft /> Back
                </Button>
            </div>
            <div className="mt-4">
                <div className="mt-4">
                    <DisplayItem item={items} />
                </div>
                {isAuth && (
                    <div className="mt-4">
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="formName" className="mt-3">
                                <Form.Label>Add Comment:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Comment..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </Form.Group>
                            <Button
                                variant="success"
                                size="sm"
                                className="mt-3"
                                type="submit"
                            >
                                Add Comment
                            </Button>
                        </Form>
                    </div>
                )}

                <div className="mt-4">
                    <h4>Comments</h4>
                    <DisplayComment comments={comments} />
                </div>
            </div>
        </Container>
    );
};
