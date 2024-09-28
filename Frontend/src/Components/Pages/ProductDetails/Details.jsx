import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Details.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function Details() {
    const { id } = useParams(); 
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`/api/products/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setDetails(data.product); 
                } else {
                    toast.error(data.message || 'Failed to load product details');
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
                toast.error('An error occurred while fetching product details');
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    if (loading) {
        return <div className={styles.details}>Loading...</div>;
    }

    if (!details) {
        return <div className={styles.details}>No details available.</div>;
    }

    const handleAddToCart = () => {
        // Add the product to the cart logic here
        toast.success('Item added to cart!');
    };

    return (
        <div className={styles.details}>
            {/* Product Image */}
            <div className={styles.imageContainer}>
                <img src={details.images[0]} alt={details.name} className={styles.productImage} />
            </div>

            {/* Product Information */}
            <div className={styles.infoContainer}>
                <h1>{details.name}</h1>
                <p><strong>Brand:</strong> {details.brand}</p>
                <p><strong>Category:</strong> {details.category}</p>
                <p><strong>Rating:</strong> {details.rating} / 5</p>
                <p><strong>Price:</strong> ₹{details.price}</p>
                <p><strong>Description:</strong> {details.description || 'No description available'}</p>
                <p>
                    <strong>Availability:</strong> {details.inStock ? 'In Stock' : 'Out of Stock'} 
                    ({details.inventory} units available)
                </p>
                <button onClick={handleAddToCart} className={styles.addToCartButton}>Add to Cart</button>
            </div>
        </div>
    );
}

export default Details;
