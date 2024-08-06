import React, { useState } from 'react';
import Modal from 'react-modal';
import { Product } from '../../redux/productSlice';
import styles from './ProductView.module.css';

// Define Comment interface if needed
interface Comment {
  id: number;
  text: string;
}

interface ProductViewProps {
  product: Product;
  onUpdateProduct: (product: Product) => void;
  onAddComment: (productId: number, comment: Comment) => void; // Modify as needed based on your logic
  comments: Comment[]; // Pass comments as a prop or fetch from Redux/store
}

const ProductView: React.FC<ProductViewProps> = ({ product, onUpdateProduct, onAddComment, comments }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState<Product>(product);
  const [newComment, setNewComment] = useState('');

  const handleUpdateProduct = () => {
    onUpdateProduct(updatedProduct);
    setIsModalOpen(false);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(product.id, { id: Date.now(), text: newComment }); // Use a unique ID for new comments
      setNewComment('');
    }
  };

  return (
    <div className={styles.productView}>
      <h2>Product View</h2>
      <p>Name: {product.name}</p>
      <p>Count: {product.count}</p>
      <p>Price: {product.price}</p>
      <p>Description: {product.description}</p>
      <button onClick={() => setIsModalOpen(true)}>Edit</button>
      <h3>Comments</h3>
      <div className={styles.commentsList}>
        {comments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            {comment.text}
          </div>
        ))}
      </div>
      <form className={styles.commentForm}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button type="button" onClick={handleAddComment}>Add Comment</button>
      </form>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        shouldCloseOnOverlayClick={true}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <div className={styles.modalContent}>
          <button
            className={styles.closeButton}
            onClick={() => setIsModalOpen(false)}
          >
            &times;
          </button>
          <h2>Edit Product</h2>
          <form>
            <label>
              Name:
              <input
                type="text"
                value={updatedProduct.name}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
              />
            </label>
            <label>
              Count:
              <input
                type="number"
                value={updatedProduct.count}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, count: parseInt(e.target.value, 10) })}
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                value={updatedProduct.price}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: parseFloat(e.target.value) })}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                value={updatedProduct.description}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
              />
            </label>
            <button type="button" onClick={handleUpdateProduct}>Confirm</button>
            <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ProductView;
