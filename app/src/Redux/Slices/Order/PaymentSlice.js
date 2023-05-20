import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import setAuthToken from '../../../Auth';

// Set the header
const token = localStorage.getItem('token');
setAuthToken(token);

export const paymentCard = createAsyncThunk(    
  'paymentC/paymentCard',
  async () => {
      const response =  await axios.post('http://127.0.0.1:8000/userorder/payment/')
      .then(response => {
        return response.data; // Return the response data, not the entire response object
      }).catch(res =>{
          return res.response.data.checkouturl
      }).then(res =>{return res})

      return response;

  }
);

export const PaymentSlice = createSlice({
  name: 'paymentC',
  initialState: {
    payment: {},
    orderStatus: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(paymentCard.pending, (state) => {
        state.orderStatus = 'loading';
      })
      .addCase(paymentCard.fulfilled, (state, action) => {
        state.orderStatus = 'succeeded';
        state.payment = action.payload;
      })
      .addCase(paymentCard.rejected, (state, action) => {
        state.orderStatus = 'failed';
        state.error = action.payload; // Access the error message from the action.payload
      });
  },
});

export default PaymentSlice.reducer;