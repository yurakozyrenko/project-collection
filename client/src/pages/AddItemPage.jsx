import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { clearStatus, createItem } from '../redux/features/item/itemSlice';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { toast } from 'react-toastify';
import constants from '../constants/const';

export const AddItemPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [tags, setTags] = useState('');
    const [collectionId, setCollectionId] = useState('');
    const [collections, setCollections] = useState({});

    const { status } = useSelector((state) => state.item);

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
        if (status !== constants.CREATE_ITEM_MSG) {
            toast(status);
            if (status === constants.ITEM_CREATE_SUCCESS) {
                navigate('/collections');
            }
            dispatch(clearStatus());
        }
    }, [status, navigate, dispatch]);

    const submitHandler = async () => {
        try {
            await dispatch(createItem({ name, tags, collectionId }));
        } catch (error) {
            console.log(error);
        }
    };

    const handlerGoBack = () => {
        navigate(-1);
    };

    const clearFormHandler = () => {
        setName('');
        setTags('');
        setCollectionId('');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!collections || !collections.length) {
        return (
            <Container>
                <div className="mt-4">
                    <h2>Please, create Collection</h2>
                </div>
            </Container>
        );
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Form onSubmit={(e) => e.preventDefault()}>
                <h2>Create new Item</h2>

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
                        onClick={submitHandler}
                    >
                        Create
                    </Button>
                    <Button
                        variant="danger"
                        className="mt-3"
                        onClick={clearFormHandler}
                    >
                        Cansel
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
