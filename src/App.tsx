import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, deleteProduct, updateProduct, selectProduct } from './redux/productSlice';
import { RootState, AppDispatch } from './redux/store';
import ProductList from './components/ProductList/ProductList';
import ProductView from './components/ProductView/ProductView';
import Cart from './components/Cart/Cart';
import styles from './App.module.css';

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const selectedProduct = useSelector((state: RootState) => state.products.selectedProduct);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <h1>Product List App</h1>
      <div className={styles.container}>
        <div className={styles.section}>
          <ProductList 
            products={products} 
            onAddProduct={(product) => dispatch(addProduct(product))}
            onDeleteProduct={(id) => dispatch(deleteProduct(id))}
            onSelectProduct={(product) => dispatch(selectProduct(product))}
          />
        </div>
        {selectedProduct && (
          <div className={styles.section}>
            <ProductView 
              product={selectedProduct}
              onUpdateProduct={(product) => dispatch(updateProduct(product))}
              onAddComment={() => dispatch(fetchProducts())} comments={[]}            />
          </div>
        )}
        <div className={styles.section}>
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default App;
