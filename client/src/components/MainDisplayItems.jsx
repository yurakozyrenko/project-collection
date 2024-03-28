import React from 'react';
import moment from 'moment';
import { Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function DisplayItems({ data }) {
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/items/${id}`);
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
                        <Card.Text>
                            Collection:{' '}
                            {item.collection && item.collection.name
                                ? item.collection.name
                                : item.name}
                        </Card.Text>
                        <Card.Text>Author: {item.user.email}</Card.Text>
                        <Card.Text>
                            Date created:{' '}
                            {moment(item.createdAt).format('DD.MM.YYYY, HH:mm')}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
}

export default DisplayItems;
