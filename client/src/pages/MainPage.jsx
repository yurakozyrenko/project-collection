import React, { useState, useEffect } from 'react';
import DisplayItems from '../components/MainDisplayItems';
import DisplayCollections from '../components/MainDisplayCollections';
import { Container, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllItems } from '../redux/features/item/itemSlice';
import { getTopCollections } from '../redux/features/collection/collectionSlice';

export const MainPage = () => {
    // const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const { items } = useSelector((state) => state.item);
    const { collections } = useSelector((state) => state.collection);
    const { loading } = useSelector((state) => state.collection);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getAllItems());
                await dispatch(getTopCollections());
            } catch (error) {
                console.error(error);
            }
            // finally {
            //     setLoading(false);
            // }
        };

        fetchData();
    }, [dispatch]);

    return (
        <Container>
            <Row>
                <Col md={6}>
                    {loading ? (
                        <div>Loading...</div>
                    ) : !items || !items.length ? (
                        <h2>Items do not exist</h2>
                    ) : (
                        <>
                            <h3>List last create items</h3>
                            <div className="mt-4">
                                <DisplayItems data={items} />
                            </div>
                        </>
                    )}
                </Col>
                <Col md={6}>
                    {loading ? (
                        <div>Loading...</div>
                    ) : !collections || !collections.length ? (
                        <h2>Collections do not exist</h2>
                    ) : (
                        <>
                            <h3>List 5 large collections</h3>
                            <div className="mt-4">
                                <DisplayCollections data={collections} />
                            </div>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};
