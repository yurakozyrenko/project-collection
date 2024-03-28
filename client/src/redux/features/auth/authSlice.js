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
    user: null,
    token: null,
    isLoading: false,
    status: null,
};

export const registrationUser = createAsyncThunk(
    'auth/registerUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/users/registration', {
                email,
                password,
            });

            if (data.token) {
                window.localStorage.setItem('token', data.token);
            }
            return data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/users/login', {
                email,
                password,
            });

            if (data.token) {
                window.localStorage.setItem('token', data.token);
            }
            return data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
    try {
        const { data } = await axios.get('/users/auth');
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoading = false;
            state.status = null;
        },
        clearStatus: (state) => {
            state.status = null;
        },
    },
    extraReducers: (builder) => {
        builder

            // registration

            .addCase(registrationUser.pending, (state) => {
                state.isLoading = true;
                state.status = null;
            })
            .addCase(registrationUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.status = payload.message;
                state.user = payload.user;
                state.token = payload.token;
            })
            .addCase(registrationUser.rejected, (state, { payload }) => {
                state.status = payload;
                state.isLoading = false;
            })

            // login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.status = null;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.status = payload.message;
                state.user = payload.user;
                state.token = payload.token;
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.status = payload;
                state.isLoading = false;
            })

            // checkAuth
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
                state.status = null;
            })
            .addCase(checkAuth.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.status = null;
                state.user = payload?.user;
                state.token = payload?.token;
            })
            .addCase(checkAuth.rejected, (state, { payload }) => {
                state.status = payload;
                state.isLoading = false;
            });
    },
});

export const checkIsAuth = (state) => Boolean(state.auth.token);

export const { clearStatus } = authSlice.actions;
export const { logout } = authSlice.actions;
export default authSlice.reducer;
