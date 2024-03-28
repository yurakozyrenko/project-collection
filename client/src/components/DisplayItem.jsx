import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Table, Button } from 'react-bootstrap';
import { removeItem } from '../redux/features/item/itemSlice';
import { checkIsAuth } from '../redux/features/auth/authSlice';
import axios from '../utils/axios';
import constants from '../constants/const';

function DisplayItem({ item }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuth = useSelector(checkIsAuth);
    const { user } = useSelector((state) => state.auth);
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState([]);
    const [likesCount, setLikesCount] = useState(likes.length);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const { data } = await axios.get(`likes/items/${id}`);
                if (data.likes) {
                    setLikes(data.likes);
                    setLikesCount(data.likes.length);
                }
                if (user) {
                    const isLikedByUser = data.likes.some(
                        (like) => like.userId === user.id
                    );
                    setIsLiked(isLikedByUser);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchLikes();
    }, [id, user]);

    const handleLike = async () => {
        try {
            const { data } = await axios.post(`likes/items/${id}`);
            if (data.message === 'like') {
                setIsLiked(true);
                setLikesCount(likesCount + 1);
            }
            if (data.message === 'unlike') {
                setIsLiked(false);
                setLikesCount(likesCount - 1);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        try {
            const confirmDelete = window.confirm(constants.DELETE_ITEM_MSG);
            if (confirmDelete) {
                await dispatch(removeItem({ id }));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (id, e) => {
        e.stopPropagation();
        navigate(`/items/${id}/edit`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Tags</th>
                        <th>Collection</th>
                        <th>Topic</th>
                        <th>Date created</th>
                        {isAuth && item.user.id === user.id && <th>Action</th>}
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.tags}</td>
                        <td>{item.collection.name}</td>
                        <td>{item.collection.topic}</td>
                        <td>
                            {moment(item.createdAt).format('DD.MM.YYYY, HH:mm')}
                        </td>
                        {isAuth && item.user.id === user.id && (
                            <td>
                                <Button
                                    variant="primary"
                                    onClick={(e) => handleEdit(item.id, e)}
                                    size="sm"
                                    style={{ marginRight: '5px' }}
                                >
                                    Edit Item
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={(e) => handleDelete(item.id, e)}
                                    size="sm"
                                >
                                    Delete
                                </Button>
                            </td>
                        )}
                    </tr>
                </tbody>
            </Table>
            {isAuth && (
                <Button
                    variant={isLiked ? 'success' : 'outline-success'}
                    onClick={handleLike}
                    size="sm"
                >
                    {isLiked ? 'Liked' : 'Like'}
                </Button>
            )}
            <h5>likes:{likesCount}</h5>
        </Container>
    );
}

export default DisplayItem;
