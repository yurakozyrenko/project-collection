import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, clearStatus } from '../redux/features/item/itemSlice';
import axios from '../utils/axios';
import { toast } from 'react-toastify';
import constants from '../constants/const';

function DisplayItems() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const { status } = useSelector((state) => state.item);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const { data } = await axios.get('/items/user');
                if (data.items) {
                    setItems(data.items);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    useEffect(() => {
        if (status) {
            toast(status);
            dispatch(clearStatus());
        }
    }, [status, dispatch]);

    const handleClick = (id) => {
        navigate(`/items/${id}`);
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        try {
            const confirmDelete = window.confirm(constants.DELETE_ITEM_MSG);
            if (confirmDelete) {
                await dispatch(removeItem({ id }));
                setItems(items.filter((item) => item.id !== id));
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
        <Container style={{ maxHeight: '350px', overflowY: 'auto' }}>
            {items.length > 0 ? (
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Tags</th>
                            <th>Collection</th>
                            <th>Topic</th>
                            <th>Author</th>
                            <th>Date created</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items?.map((item, index) => (
                            <tr
                                key={index}
                                style={{
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleClick(item.id)}
                            >
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.tags}</td>
                                <td>
                                    {item.collection && item.collection.name
                                        ? item.collection.name
                                        : item.name}
                                </td>
                                <td>{item.collection.topic}</td>
                                <td>{item.user.email}</td>
                                <td>
                                    {moment(item.createdAt).format(
                                        'DD.MM.YYYY, HH:mm'
                                    )}
                                </td>
                                <td>
                                    <Button
                                        variant="primary"
                                        onClick={(e) => handleEdit(item.id, e)}
                                        style={{ marginRight: '5px' }}
                                    >
                                        Edit Item
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={(e) =>
                                            handleDelete(item.id, e)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Alert variant="info">{constants.CREATE_ITEM_MSG}</Alert>
            )}
        </Container>
    );
}

export default DisplayItems;
