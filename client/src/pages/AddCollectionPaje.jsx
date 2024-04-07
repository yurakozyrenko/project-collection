import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearStatus,
    createCollection,
} from '../redux/features/collection/collectionSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import constants from '../constants/const';

export const AddCollectionPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const topics = constants.TOPICS;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [topic, setTopic] = useState('');
    const [image, setImage] = useState(null);

    const { status } = useSelector((state) => state.collection);

    useEffect(() => {
        if (status) {
            toast(status);
            if (status === constants.COLLECTION_CREATE_SUCCESS) {
                navigate('/collections');
            }
            dispatch(clearStatus());
        }
    }, [status, navigate, dispatch]);

    const submitHandler = () => {
        try {
            const data = new FormData();
            data.append('name', name);
            data.append('description', description);
            data.append('topic', topic);
            data.append('image', image);
            dispatch(createCollection(data));
        } catch (error) {
            console.log(error);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handlerGoBack = () => {
        navigate(-1);
    };

    const clearFormHandler = () => {
        setName('');
        setDescription('');
        setTopic('');
        setImage(null);
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Form
                style={{ maxWidth: '500px', width: '100%' }}
                onSubmit={(e) => e.preventDefault()}
            >
                <h2>Create new Collection</h2>
                <Form.Group controlId="formName" className="mt-3">
                    <Form.Label>Name Collection:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formDescription" className="mt-3">
                    <Form.Label>Description (Markdown):</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formCategory" className="mt-3">
                    <Form.Label>Topic:</Form.Label>
                    <Form.Control
                        as="select"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    >
                        <option value="" disabled>
                            Select topic
                        </option>
                        {topics.map((element) => (
                            <option key={element} value={element}>
                                {element}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formImage" className="mt-3">
                    <Form.Label>Image:</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
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
                        Cancel
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
