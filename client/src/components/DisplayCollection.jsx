import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Container, Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { checkIsAuth } from '../redux/features/auth/authSlice';
import { removeItem, clearStatus } from '../redux/features/item/itemSlice';
import { getCollectionById } from '../redux/features/collection/collectionSlice';
import { toast } from 'react-toastify';
import FilterForm from '../helpers/fiter';
import constants from '../constants/const';

function DisplayCollection() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuth = useSelector(checkIsAuth);
    const [loading, setLoading] = useState(true);
    const { collections } = useSelector((state) => state.collection);
    const { user } = useSelector((state) => state.auth);
    const { id } = useParams();
    const { status } = useSelector((state) => state.item);

    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('DESC');
    const [filter, setFilter] = useState('');
    const [selectedField, setSelectedField] = useState('name');

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getCollectionById({ id, sortBy, sortOrder }));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch, id, sortBy, sortOrder]);

    useEffect(() => {
        if (status) {
            toast(status);
            dispatch(clearStatus());
            dispatch(getCollectionById({ id, sortBy, sortOrder }));
        }
    }, [status, navigate, dispatch, id, sortBy, sortOrder]);

    const handleClick = (id) => {
        navigate(`/items/${id}`);
    };

    const handleDelete = async (id, e) => {
        try {
            e.stopPropagation();
            const confirmDelete = window.confirm(constants.DELETE_ITEM_MSG);
            if (confirmDelete) {
                await dispatch(removeItem({ id }));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (id, e) => {
        e.stopPropagation();
        navigate(`/items/${id}/edit`);
    };

    const handleSort = (field) => {
        setSortOrder(sortBy === field && sortOrder === 'DESC' ? 'ASC' : 'DESC');
        setSortBy(field);
    };

    const renderSortIcon = (field) => {
        if (sortBy === field) {
            return sortOrder === 'ASC' ? '↑' : '↓';
        }
        return null;
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleFieldChange = (e) => {
        setSelectedField(e.target.value);
    };

    const filteredItems = collections.items?.filter((item) =>
        item[selectedField].toLowerCase().includes(filter.toLowerCase())
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div>
                <h2>Collection: {collections.name}</h2>
                <h3>Description: {collections.description}</h3>
                <FilterForm
                    filter={filter}
                    handleFilterChange={handleFilterChange}
                    selectedField={selectedField}
                    handleFieldChange={handleFieldChange}
                />
                <h4>Items</h4>
            </div>
            <Container style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th onClick={() => handleSort('name')}>
                                Name {renderSortIcon('name')}
                            </th>
                            <th onClick={() => handleSort('tags')}>
                                Tags {renderSortIcon('tags')}
                            </th>
                            <th> Topic</th>
                            <th>Author</th>
                            <th onClick={() => handleSort('createdAt')}>
                                Date created {renderSortIcon('createdAt')}
                            </th>
                            {isAuth && collections.user.id === user.id && (
                                <th>Action</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems?.map((item, index) => (
                            <tr
                                key={index}
                                style={{
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleClick(item.id)}
                            >
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.tags}</td>
                                <td>{collections.topic}</td>
                                <td>{collections.user.email}</td>

                                <td>
                                    {moment(item.createdAt).format(
                                        'DD.MM.YYYY, HH:mm'
                                    )}
                                </td>

                                {isAuth && collections.user.id === user.id && (
                                    <td>
                                        <Button
                                            variant="primary"
                                            onClick={(e) =>
                                                handleEdit(item.id, e)
                                            }
                                            size="sm"
                                            style={{
                                                marginRight: '5px',
                                            }}
                                        >
                                            Edit Item
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={(e) =>
                                                handleDelete(item.id, e)
                                            }
                                            size="sm"
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default DisplayCollection;
