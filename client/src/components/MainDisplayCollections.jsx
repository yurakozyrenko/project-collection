import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function DisplayCollections({ data }) {
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/collections/${id}`);
    };

    return (
        <Container>
            {data?.map((item, index) => (
                <Card
                    key={index}
                    className="mb-3"
                    style={{
                        cursor: 'pointer',
                    }}
                    onClick={() => handleClick(item.id)}
                >
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>Topic: {item.topic}</Card.Text>
                        <Card.Text>Author: {item.user.email}</Card.Text>
                        <Card.Text>
                            Items:{' '}
                            {item.itemscount
                                ? item.itemscount
                                : item.items.length}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
}

export default DisplayCollections;
