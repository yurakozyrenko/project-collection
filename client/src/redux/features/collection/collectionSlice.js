import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const handleAsyncError = (error) => {
    if (error.response && error.response.data.message) {
        return error.response.data.message;
    } else {
        return error.message;
    }
};

const initialState = {
    collections: [],
    loading: false,
    status: null,
};

export const createCollection = createAsyncThunk(
    'collection/createCollection',
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/collections', params);
            return data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

export const getAllCollections = createAsyncThunk(
    'collection/getAllCollections',
    async () => {
        try {
            const { data } = await axios.get('/collections');
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getCollectionById = createAsyncThunk(
    'collection/getCollectionById',
    async ({ id, sortBy, sortOrder }, { rejectWithValue }) => {
        try {
            const url = `/collections/${id}?sortBy=${sortBy}&sortOrder=${sortOrder}`;
            const { data } = await axios.get(url);
            return data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

export const getTopCollections = createAsyncThunk(
    'collection/getAllCollections',
    async () => {
        try {
            const { data } = await axios.get('/collections/top');
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const updateCollection = createAsyncThunk(
    'collection/updateCollection',
    async ({ id, name, description, topic }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`/collections/${id}`, {
                name,
                description,
                topic,
            });
            return data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

export const removeCollection = createAsyncThunk(
    'collection/removeCollection',
    async ({ id }, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`/collections/${id}`);
            return data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

export const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        clearStatus: (state) => {
            state.status = null;
        },
    },
    extraReducers: (builder) => {
        builder

            // create collection
            .addCase(createCollection.pending, (state) => {
                state.loading = true;
                state.status = null;
            })
            .addCase(createCollection.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.status = payload.message;
            })
            .addCase(createCollection.rejected, (state, { payload }) => {
                state.status = payload;
                state.loading = false;
            })

            // get AllCollections
            .addCase(getAllCollections.pending, (state) => {
                state.loading = true;
                state.status = null;
            })
            .addCase(getAllCollections.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.status = payload.message;
                state.collections = payload.collections;
            })
            .addCase(getAllCollections.rejected, (state, { payload }) => {
                state.status = payload;
                state.loading = false;
            })

            // get Collection by id
            .addCase(getCollectionById.pending, (state) => {
                state.loading = true;
                state.status = null;
            })
            .addCase(getCollectionById.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.status = payload.message;
                state.collections = payload.collection;
            })
            .addCase(getCollectionById.rejected, (state, { payload }) => {
                state.status = payload;
                state.loading = false;
            })

            // update Collection
            .addCase(updateCollection.pending, (state) => {
                state.loading = true;
                state.status = null;
            })
            .addCase(updateCollection.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.status = payload.message;
            })
            .addCase(updateCollection.rejected, (state, { payload }) => {
                state.status = payload;
                state.loading = false;
            })

            // delete Collection
            .addCase(removeCollection.pending, (state) => {
                state.loading = true;
                state.status = null;
            })
            .addCase(removeCollection.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.status = payload.message;
            })
            .addCase(removeCollection.rejected, (state, { payload }) => {
                state.status = payload;
                state.loading = false;
            });
    },
});

export const { clearStatus } = collectionSlice.actions;

export default collectionSlice.reducer;
