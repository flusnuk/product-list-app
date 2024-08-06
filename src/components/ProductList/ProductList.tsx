import React, { useState } from 'react';
import Modal from 'react-modal';
import { Product, addToCart } from '../../redux/productSlice';
import { useDispatch } from 'react-redux';
import styles from './ProductList.module.css';

interface ProductListProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onDeleteProduct: (id: number) => void;
  onSelectProduct: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddProduct, onDeleteProduct, onSelectProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({ name: '', count: 0, price: 0, description: '' });
  const dispatch = useDispatch();

  const handleAddProduct = () => {
    onAddProduct(newProduct);
    setNewProduct({ name: '', count: 0, price: 0, description: '' });
    setIsModalOpen(false);
  };

  const sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className={styles.productList}>
      <button onClick={() => setIsModalOpen(true)}>Add Product</button>
      <ul>
        {sortedProducts.map(product => (
          <li key={product.id}>
            {product.name} ({product.count})
            <div>
              <button onClick={() => onSelectProduct(product)}>View</button>
              <button onClick={() => onDeleteProduct(product.id)}>Delete</button>
              <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
            </div>
          </li>
        ))}
      </ul>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        shouldCloseOnOverlayClick={true}
        className={styles.modalContent} 
        overlayClassName={styles.modalOverlay} 
      >
        <h2>Add Product</h2>
        <form>
          <label>
            Name:
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
          </label>
          <label>
            Count:
            <input
              type="number"
              value={newProduct.count}
              onChange={(e) => setNewProduct({ ...newProduct, count: parseInt(e.target.value, 10) })}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
          </label>
          <button type="button" onClick={handleAddProduct}>Confirm</button>
          <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
};

export default ProductList;
