import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
  id: number;
  name: string;
  count: number;
  price: number;
  description: string;
}

interface ProductsState {
  products: Product[];
  cart: Product[];
  storeBucket: Product[];
  loading: boolean;
  error: string | null;
  selectedProduct: Product | null;
}

const initialState: ProductsState = {
  products: [],
  cart: [],
  storeBucket: [],
  loading: false,
  error: null,
  selectedProduct: null,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('http://localhost:5000/products');
  return response.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (product: Omit<Product, 'id'>) => {
  const response = await axios.post('http://localhost:5000/products', product);
  return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id: number) => {
  await axios.delete(`http://localhost:5000/products/${id}`);
  return id;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (product: Product) => {
  const response = await axios.put(`http://localhost:5000/products/${product.id}`, product);
  return response.data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    selectProduct(state, action: PayloadAction<Product | null>) {
      state.selectedProduct = action.payload;
    },
    addToCart(state, action: PayloadAction<Product>) {
      state.cart.push(action.payload);
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter(product => product.id !== action.payload);
    },
    addToStoreBucket(state, action: PayloadAction<Product>) {
      state.storeBucket.push(action.payload);
    },
    removeFromStoreBucket(state, action: PayloadAction<number>) {
      state.storeBucket = state.storeBucket.filter(product => product.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product.id !== action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(product => product.id === action.payload.id);
        if (index >= 0) {
          state.products[index] = action.payload;
        }
      });
  },
});

export const { selectProduct, addToCart, removeFromCart, addToStoreBucket, removeFromStoreBucket } = productsSlice.actions;

export default productsSlice.reducer;
