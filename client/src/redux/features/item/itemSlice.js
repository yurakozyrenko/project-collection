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
    items: [],
    loading: false,
    status: null,
};

export const createItem = createAsyncThunk(
    'item/createItem',
    async ({ name, tags, collectionId }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/items', {
                name,
                tags,
                collectionId,
            });
            return data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

export const updateItem = createAsyncThunk(
    'item/updateItem',
    async ({ id, name, tags, collectionId }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`/items/${id}`, {
                name,
                tags,
                collectionId,
            });
            return data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

export const removeItem = createAsyncThunk(
    'item/removeItem',
    async ({ id }, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`/items/${id}`);
            return data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

export const getAllItems = createAsyncThunk('item/getAllItems', async () => {
    try {
        const { data } = await axios.get('/items');
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const getItemById = createAsyncThunk(
    'item/getItemById',
    async ({ id }, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/items/${id}`);
            return data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

export const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        clearStatus: (state) => {
            state.status = null;
        },
    },
    extraReducers: (builder) => {
        builder

            // create item
            .addCase(createItem.pending, (state) => {
                state.loading = true;
                state.status = null;
            })
            .addCase(createItem.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.status = payload.message;
            })
            .addCase(createItem.rejected, (state, { payload }) => {
                state.status = payload;
                state.loading = false;
            })

            // get Allitems
            .addCase(getAllItems.pending, (state) => {
                state.loading = true;
                state.status = null;
            })
            .addCase(getAllItems.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.status = payload.message;
                state.items = payload.items;
            })
            .addCase(getAllItems.rejected, (state, { payload }) => {
                state.status = payload;
                state.loading = false;
            })

            // get Item by id
            .addCase(getItemById.pending, (state) => {
                state.loading = true;
                state.status = null;
            })
            .addCase(getItemById.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.status = payload.message;
                state.items = payload.item;
            })
            .addCase(getItemById.rejected, (state, { payload }) => {
                state.status = payload;
                state.loading = false;
            })
            // update Item
            .addCase(updateItem.pending, (state) => {
                state.loading = true;
                state.status = null;
            })
            .addCase(updateItem.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.status = payload.message;
            })
            .addCase(updateItem.rejected, (state, { payload }) => {
                state.status = payload;
                state.loading = false;
            })

            // delete Item
            .addCase(removeItem.pending, (state) => {
                state.loading = true;
                state.status = null;
            })
            .addCase(removeItem.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.status = payload.message;
            })
            .addCase(removeItem.rejected, (state, { payload }) => {
                state.status = payload;
                state.loading = false;
            });
    },
});
export const { clearStatus } = itemSlice.actions;

export default itemSlice.reducer;
