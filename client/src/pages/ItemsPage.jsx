import React from 'react';
import { Container, Button } from 'react-bootstrap';
import DisplayItem from '../components/DisplayItems';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export const ItemsPage = () => {
    const navigate = useNavigate();

    const handlerGoBack = () => {
        navigate(-1);
    };

    const handleCreateItem = () => {
        navigate('/newItem');
    };

    return (
        <Container>
            <div className="mt-4">
                <Button variant="info" onClick={handlerGoBack} size="sm">
                    <FaArrowLeft /> Back
                </Button>
            </div>
            <div className="mt-4">
                <Button variant="success" onClick={handleCreateItem} size="sm">
                    Create Item
                </Button>
            </div>
            <div className="mt-4">
                <h2>My Items</h2>
                <div className="mt-4">
                    <DisplayItem />
                </div>
            </div>
        </Container>
    );
};
