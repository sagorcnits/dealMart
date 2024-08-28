import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosFetch } from "../../hooks/useAxios";

const initialState = {
  loading: false,
  status: null,
  error: null,
};

export const productFetch = createAsyncThunk(
  "products/productFetch",
  async (productData) => {
    axiosFetch
      .post("/products", productData)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((error) => {
        return error.message;
      });
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(productFetch.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(productFetch.fulfilled, (state, action) => {
        // console.log(action);
        state.loading = false;
        state.status = "done";
      })
      .addCase(productFetch.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
