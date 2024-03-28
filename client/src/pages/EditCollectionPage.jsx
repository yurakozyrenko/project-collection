import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearStatus,
    getCollectionById,
    updateCollection,
} from '../redux/features/collection/collectionSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import constants from '../constants/const';

export const EditCollectionPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const topics = constants.TOPICS;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [topic, setTopic] = useState('');

    const { status } = useSelector((state) => state.collection);
    const { id } = useParams();

    const handlerGoBack = () => {
        navigate(-1);
    };

    const submitHandler = async (id) => {
        try {
            await dispatch(updateCollection({ id, name, description, topic }));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (status) {
            toast(status);
            if (status === constants.COLLECTION_UPDATE_SUCCESS) {
                navigate('/collections');
            }
            dispatch(clearStatus());
        }
    }, [status, navigate, dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await dispatch(
                    getCollectionById({
                        id,
                        sortBy: 'createdAt',
                        sortOrder: 'DESC',
                    })
                );
                setName(response.payload.collection.name);
                setDescription(response.payload.collection.description);
                setTopic(response.payload.collection.topic);
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
            <Form
                style={{ maxWidth: '500px', width: '100%' }}
                onSubmit={(e) => e.preventDefault()}
            >
                <h2>Update Collection</h2>
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
                    <Form.Label> Topic:</Form.Label>
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
