import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    removeCollection,
    clearStatus,
} from '../redux/features/collection/collectionSlice';
import { toast } from 'react-toastify';
import axios from '../utils/axios';
import constants from '../constants/const';

function DisplayCollections() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [collections, setCollections] = useState([]);

    const { status } = useSelector((state) => state.collection);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const { data } = await axios.get('/collections/user');
                if (data.collections) {
                    setCollections(data.collections);
                }
                dispatch(clearStatus());
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCollections();
    }, [dispatch]);

    useEffect(() => {
        if (status === constants.COLLECTION_DELETE_SUCCESS) {
            toast(status);
            dispatch(clearStatus());
        }
    }, [status, dispatch]);

    const handleClick = (id) => {
        navigate(`/collections/${id}`);
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        try {
            const confirmDelete = window.confirm(
                constants.DELETE_COLLECTION_MSG
            );
            if (confirmDelete) {
                await dispatch(removeCollection({ id }));
                setCollections(
                    collections.filter((collection) => collection.id !== id)
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (id, e) => {
        e.stopPropagation();
        navigate(`/collections/${id}/edit`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {collections.length > 0 ? (
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Topic</th>
                            <th>Author</th>
                            <th>Items</th>
                            <th>Date created</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {collections?.map((item, index) => (
                            <tr
                                key={index}
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleClick(item.id)}
                            >
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.topic}</td>
                                <td>{item.user.email}</td>
                                <td>{item.items.length}</td>
                                <td>
                                    {moment(item.createdAt).format(
                                        'DD.MM.YYYY, HH:mm'
                                    )}
                                </td>
                                <td>
                                    <Button
                                        variant="primary"
                                        onClick={(e) => handleEdit(item.id, e)}
                                        size="sm"
                                        style={{ marginRight: '5px' }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={(e) =>
                                            handleDelete(item.id, e)
                                        }
                                        size="sm"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Alert variant="info">{constants.CREATE_COLLECTION_MSG}</Alert>
            )}
        </Container>
    );
}

export default DisplayCollections;
