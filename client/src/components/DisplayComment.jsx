import React from 'react';
import moment from 'moment';
import { Container, Card } from 'react-bootstrap';

function DisplayComment({ comments }) {
    return (
        <Container style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {comments?.map((item, index) => (
                <Card key={index} className="mb-3">
                    <Card.Body>
                        <Card.Title>{item.author}</Card.Title>
                        <Card.Text>
                            {item.name
                                ? `User: ${item.name}`
                                : `User: ${item.user.email}`}
                        </Card.Text>
                        <Card.Text>{item.comment}</Card.Text>
                        <Card.Text className="text-muted">
                            {moment(item.createdAt).format('DD.MM.YYYY, HH:mm')}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
}

export default DisplayComment;
