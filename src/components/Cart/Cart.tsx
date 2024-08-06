import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { removeFromCart, Product } from '../../redux/productSlice';
import styles from './Cart.module.css';

const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.products.cart);
  const dispatch = useDispatch();

 return (
    <div className={styles.cart}>
      <h2>Cart</h2>
      <ul>
        {cart.map((product: Product) => (
          <li key={product.id}>
            {product.name} ({product.count}) - ${product.price}
            <button onClick={() => dispatch(removeFromCart(product.id))}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
