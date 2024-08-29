import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { axiosFetch } from "../../hooks/useAxios";

const initialState = {
  loading: false,
  products: null,
  error: null,
};

export const productFetch = createAsyncThunk(
  "products/productFetch",
  async (productData) => {
    try {
      const res = await axiosFetch.post("/products", productData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Your Register has been Success",
          showConfirmButton: false,
          timer: 1500,
        });
        return res.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get the product from server
export const productGet = createAsyncThunk("products/productGet", async () => {
  try {
    const res = await axiosFetch.get("/products");
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(productFetch.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(productFetch.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(productFetch.rejected, (state, action) => {
      state.error = action.error.message;
    });

    // prodduct get
    builder.addCase(productGet.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(productGet.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(productGet.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;
