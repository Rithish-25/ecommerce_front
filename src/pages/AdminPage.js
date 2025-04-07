import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '', price: '', description: '', ratings: '', images: [{ image: '' }],
        category: '', seller: '', stock: ''
    });
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/admin/products')
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "image") {
            setNewProduct({ ...newProduct, images: [{ image: value }] });
        } else {
            setNewProduct({ ...newProduct, [name]: value });
        }
    };

    const addProduct = async () => {
        try {
            const res = await axios.post('http://localhost:8000/api/v1/admin/products', newProduct);
            setProducts([...products, res.data.product]);
            clearForm();
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/admin/products/${id}`);
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const startEdit = (product) => {
        setEditingProduct(product);
        setNewProduct({
            name: product.name,
            price: product.price,
            description: product.description,
            ratings: product.ratings,
            images: product.images,
            category: product.category,
            seller: product.seller,
            stock: product.stock
        });
    };

    const updateProduct = async () => {
        try {
            const res = await axios.put(`http://localhost:8000/api/v1/admin/products/${editingProduct._id}`, newProduct);
            setProducts(products.map(p => (p._id === editingProduct._id ? res.data.updatedProduct : p)));
            setEditingProduct(null);
            clearForm();
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const clearForm = () => {
        setNewProduct({
            name: '', price: '', description: '', ratings: '', images: [{ image: '' }],
            category: '', seller: '', stock: ''
        });
    };

    return (
        <div className="admin-wrapper">
            <h2>Admin Dashboard - Manage Products</h2>

            <div className="form-container">
                <input type="text" name="name" placeholder="Name" value={newProduct.name} onChange={handleChange} />
                <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleChange} />
                <input type="text" name="description" placeholder="Description" value={newProduct.description} onChange={handleChange} />
                <input type="number" name="ratings" placeholder="Ratings" value={newProduct.ratings} onChange={handleChange} />
                <input type="text" name="image" placeholder="Image URL" value={newProduct.images[0].image} onChange={handleChange} />
                <input type="text" name="category" placeholder="Category" value={newProduct.category} onChange={handleChange} />
                <input type="text" name="seller" placeholder="Seller" value={newProduct.seller} onChange={handleChange} />
                <input type="number" name="stock" placeholder="Stock" value={newProduct.stock} onChange={handleChange} />

                {editingProduct ? (
                    <button className="btn update" onClick={updateProduct}>Update Product</button>
                ) : (
                    <button className="btn add" onClick={addProduct}>Add Product</button>
                )}
            </div>

            <ul className="product-list">
                {products.map(product => (
                    <li key={product._id}>
                        <strong>{product.name}</strong> - {product.description}
                        <div className="actions">
                            <button className="btn edit" onClick={() => startEdit(product)}>Edit</button>
                            <button className="btn delete" onClick={() => deleteProduct(product._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            <style jsx="true">{`
                .admin-wrapper {
                    padding: 20px;
                    font-family: sans-serif;
                    background: linear-gradient(to right, #e0eafc, #cfdef3);
                    min-height: 100vh;
                }

                h2 {
                    text-align: center;
                    margin-bottom: 30px;
                }

                .form-container {
                    max-width: 600px;
                    margin: auto;
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }

                input {
                    width: 100%;
                    margin-bottom: 12px;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 6px;
                }

                .btn {
                    padding: 10px 16px;
                    margin-right: 8px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                }

                .btn.add {
                    background: #28a745;
                    color: white;
                }

                .btn.update {
                    background: #007bff;
                    color: white;
                }

                .btn.edit {
                    background: #ffc107;
                    color: black;
                }

                .btn.delete {
                    background: #dc3545;
                    color: white;
                }

                .product-list {
                    margin-top: 30px;
                    list-style: none;
                    padding: 0;
                }

                .product-list li {
                    background: #fff;
                    margin: 10px auto;
                    padding: 15px;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                    max-width: 700px;
                }

                .actions {
                    margin-top: 10px;
                }
            `}</style>
        </div>
    );
};

export default AdminPage;
