import React from 'react';
import { Container, Button } from 'react-bootstrap';
import DisplayCollections from '../components/DisplayCollections';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export const CollectionsPage = () => {
    const navigate = useNavigate();
    const handlerGoBack = () => {
        navigate(-1);
    };

    const handleCreateCollection = () => {
        navigate('/newCollection');
    };

    return (
        <Container>
            <div className="mt-4">
                <Button variant="info" onClick={handlerGoBack} size="sm">
                    <FaArrowLeft /> Back
                </Button>
            </div>
            <div className="mt-4">
                <Button
                    variant="success"
                    onClick={handleCreateCollection}
                    size="sm"
                >
                    Create new Collection
                </Button>
            </div>
            <div className="mt-4">
                <h2>My Collections</h2>
                <div className="mt-4">
                    <DisplayCollections />
                </div>
            </div>
        </Container>
    );
};
