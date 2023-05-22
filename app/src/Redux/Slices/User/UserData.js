import {createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import setAuthToken from '../../../Auth';
import axios from 'axios';

// Set the header

export const fetchUser = createAsyncThunk('userData/fetchUser', async () => {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    const response = await axios.get(`http://127.0.0.1:8000/account/user/`);
    return response.data;
  });
  
  export const userDataSlice = createSlice({
    name: "userData",
    initialState: {
      user: {},
      status: 'idle',
      error: null
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUser.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.user = action.payload;

        })
        .addCase(fetchUser.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });
  
  export default userDataSlice.reducer;