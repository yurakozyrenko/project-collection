import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
    comments: [],
    loading: false,
};

export const createComment = createAsyncThunk(
    'comment/createComment',
    async ({ comment, itemId }) => {
        try {
            const { data } = await axios.post(`/comments`, {
                itemId,
                comment,
            });
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getItemComments = createAsyncThunk(
    'comment/getItemComments',
    async ({ id }) => {
        try {
            const { data } = await axios.get(`comments/items/${id}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // create comment
            .addCase(createComment.pending, (state) => {
                state.loading = true;
            })
            .addCase(createComment.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.status = payload.message;
                state.comments.push(payload.newComment);
            })
            .addCase(createComment.rejected, (state) => {
                state.loading = false;
            })

            // get comments
            .addCase(getItemComments.pending, (state) => {
                state.loading = true;
            })
            .addCase(getItemComments.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.comments = payload.comments;
            })
            .addCase(getItemComments.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default commentSlice.reducer;
