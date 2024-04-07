import React, { useState, useEffect } from 'react';
import { Button, Container, Alert } from 'react-bootstrap';
import DisplayCollection from '../components/DisplayCollection';
import { useSelector, useDispatch } from 'react-redux';
import { checkIsAuth } from '../redux/features/auth/authSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import {
    getCollectionById,
    clearStatus,
} from '../redux/features/collection/collectionSlice';
import { toast } from 'react-toastify';
import constants from '../constants/const';

export const CollectionPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isAuth = useSelector(checkIsAuth);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    const { status } = useSelector((state) => state.collection);
    const { collections } = useSelector((state) => state.collection);
    const { user } = useSelector((state) => state.auth);

    const handlerGoBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(
                    getCollectionById({
                        id,
                        sortBy: 'createdAt',
                        sortOrder: 'DESC',
                    })
                );
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch, id]);

    useEffect(() => {
        if (status) {
            toast(status);
            if (status === constants.COLLECTION_DELETE_SUCCESS) {
                navigate('/collections');
            }
            dispatch(clearStatus());
        }
    }, [status, navigate, dispatch]);

    const handleCreateItem = () => {
        navigate('/newItem');
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
                {isAuth && collections.user.id === user.id && (
                    <>
                        <div className="mt-4">
                            <Button
                                variant="success"
                                onClick={handleCreateItem}
                                size="sm"
                            >
                                Create Item
                            </Button>
                        </div>
                    </>
                )}
                <div className="mt-4">
                    {collections.items && collections.items.length > 0 ? (
                        <div className="mt-4">
                            <DisplayCollection />
                        </div>
                    ) : (
                        <Container>
                            {collections.imageSrc && (
                                <img
                                    src={collections.imageSrc}
                                    width={200}
                                    height={200}
                                    alt="Collection"
                                />
                            )}
                            <h2>Collection: {collections.name}</h2>
                            <h3>Description: {collections.description}</h3>
                            <Alert variant="info">
                                There are no items in this collection.
                            </Alert>
                        </Container>
                    )}
                </div>
            </div>
        </Container>
    );
};
