import React from 'react';
import { Container, Form } from 'react-bootstrap';

function FilterForm({
    filter,
    handleFilterChange,
    selectedField,
    handleFieldChange,
}) {
    return (
        <Container>
            <h4>Filter...</h4>
            <Form.Group controlId="filter">
                <Form.Control
                    type="text"
                    placeholder="Enter search keyword"
                    value={filter}
                    onChange={handleFilterChange}
                />
                <Form.Control
                    as="select"
                    value={selectedField}
                    onChange={handleFieldChange}
                >
                    <option value="name">Name</option>
                    <option value="tags">Tags</option>
                </Form.Control>
            </Form.Group>
        </Container>
    );
}

export default FilterForm;
