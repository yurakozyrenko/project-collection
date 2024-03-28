import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import itemSlice from './features/item/itemSlice';
import collectionSlice from './features/collection/collectionSlice';
import commentSlice from './features/comment/commentSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        item: itemSlice,
        collection: collectionSlice,
        comment: commentSlice,
    },
});
