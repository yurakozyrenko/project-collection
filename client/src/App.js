import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { MainPage } from './pages/MainPage';
import { ItemsPage } from './pages/ItemsPage';
import { ItemPage } from './pages/ItemPage';
import { AddItemPage } from './pages/AddItemPage';
import { AddCollectionPage } from './pages/AddCollectionPaje';
import { RegistrationPage } from './pages/RegistrationPage';
import { LoginPage } from './pages/LoginPage';
import { EditItemPage } from './pages/EditItemPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { checkAuth } from './redux/features/auth/authSlice';
import { CollectionsPage } from './pages/CollectionsPage';
import { CollectionPage } from './pages/CollectionPage';
import { EditCollectionPage } from './pages/EditCollectionPage';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="items" element={<ItemsPage />} />
                <Route path="collections" element={<CollectionsPage />} />
                <Route path="collections/:id" element={<CollectionPage />} />
                <Route path="items/:id" element={<ItemPage />} />
                <Route path="items/:id/edit" element={<EditItemPage />} />
                <Route
                    path="collections/:id/edit"
                    element={<EditCollectionPage />}
                />
                <Route path="newItem" element={<AddItemPage />} />
                <Route path="newCollection" element={<AddCollectionPage />} />
                <Route path="registration" element={<RegistrationPage />} />
                <Route path="login" element={<LoginPage />} />
            </Routes>

            <ToastContainer position="bottom-right" />
        </Layout>
    );
};

export default App;
