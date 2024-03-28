import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getItemById,
    updateItem,
    clearStatus,
} from '../redux/features/item/itemSlice';
import axios from '../utils/axios';
import { toast } from 'react-toastify';
import constants from '../constants/const';

export const EditItemPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [tags, setTags] = useState('');
    const [collectionId, setCollectionId] = useState('');
    const [loading, setLoading] = useState(true);
    const [collections, setCollections] = useState([]);

    const { status } = useSelector((state) => state.item);
    const { id } = useParams();

    const handlerGoBack = () => {
        navigate(-1);
    };

    const submitHandler = async (id) => {
        try {
            await dispatch(updateItem({ id, name, tags, collectionId }));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (status) {
            toast(status);
            if (status === constants.ITEM_UPDATE_SUCCESS) {
                navigate(`/items/${id}`);
            }
            dispatch(clearStatus());
        }
    }, [status, navigate, dispatch, id]);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const { data } = await axios.get('/collections/user');
                setCollections(data.collections);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCollections();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await dispatch(getItemById({ id }));
                setName(response.payload.item.name);
                setTags(response.payload.item.tags);
                setCollectionId(response.payload.item.collectionId);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [dispatch, id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Form onSubmit={(e) => e.preventDefault()}>
                <h2>Edit Item</h2>

                <Form.Group controlId="formName" className="mt-3">
                    <Form.Label>Item name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formCategory" className="mt-3">
                    <Form.Label>Select Collection:</Form.Label>
                    <Form.Control
                        as="select"
                        value={collectionId}
                        onChange={(e) => setCollectionId(e.target.value)}
                    >
                        <option value="" disabled>
                            Select Collection
                        </option>
                        {collections.map((collection) => (
                            <option key={collection.id} value={collection.id}>
                                {collection.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formTags" className="mt-3">
                    <Form.Label>Tags:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Tags..."
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </Form.Group>

                <div className="d-flex justify-content-evenly">
                    <Button
                        variant="success"
                        className="mt-3"
                        onClick={() => submitHandler(id)}
                    >
                        Update
                    </Button>
                    <Button
                        variant="primary"
                        className="mt-3"
                        onClick={handlerGoBack}
                    >
                        Back
                    </Button>
                </div>
            </Form>
        </Container>
    );
};
