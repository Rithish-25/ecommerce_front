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
        const { name, price, description, ratings, images, category, seller, stock } = newProduct;
    
        // Check for empty fields
        if (!name || !price || !description || !ratings || !images[0].image || !category || !seller || !stock) {
            alert("Please fill in all the fields before adding a product.");
            return;
        }
    
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
            <h2>🛠️ Admin Dashboard - Manage Products</h2>

            <div className="form-container glass">
                <div className="form-grid">
                    <input type="text" name="name" placeholder="Name" value={newProduct.name} onChange={handleChange} />
                    <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleChange} />
                    <input type="text" name="description" placeholder="Description" value={newProduct.description} onChange={handleChange} />
                    <input type="number" name="ratings" placeholder="Ratings" value={newProduct.ratings} onChange={handleChange} />
                    <input type="text" name="image" placeholder="Image URL" value={newProduct.images[0].image} onChange={handleChange} />
                    <input type="text" name="category" placeholder="Category" value={newProduct.category} onChange={handleChange} />
                    <input type="text" name="seller" placeholder="Seller" value={newProduct.seller} onChange={handleChange} />
                    <input type="number" name="stock" placeholder="Stock" value={newProduct.stock} onChange={handleChange} />
                </div>

                <div className="form-actions">
                    {editingProduct ? (
                        <button className="btn update" onClick={updateProduct}>Update Product</button>
                    ) : (
                        <button className="btn add" onClick={addProduct}>Add Product</button>
                    )}
                </div>
            </div>

            <ul className="product-list">
                {products.map(product => (
                    <li key={product._id}>
                        <div className="product-info">
                            <strong>{product.name}</strong>
                            <p>{product.description}</p>
                        </div>
                        <div className="actions">
                            <button className="btn edit" onClick={() => startEdit(product)}>Edit</button>
                            <button className="btn delete" onClick={() => deleteProduct(product._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            <style jsx="true">{`
                .admin-wrapper {
                    padding: 50px 20px;
                    font-family: 'Poppins', sans-serif;
                    background: linear-gradient(135deg, #c3ecf4 0%, #f5f7fa 100%);
                    min-height: 100vh;
                    animation: fadeIn 1s ease-in;
                }

                h2 {
                    text-align: center;
                    font-size: 32px;
                    margin-bottom: 40px;
                    color: #333;
                    font-weight: 600;
                }

                .glass {
                    background: rgba(255, 255, 255, 0.25);
                    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border-radius: 16px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .form-container {
                    max-width: 850px;
                    margin: auto;
                    padding: 35px;
                    transition: 0.4s ease;
                }

                .form-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 20px;
                }

                input {
                    padding: 14px;
                    border: none;
                    border-radius: 10px;
                    font-size: 15px;
                    background: rgba(255,255,255,0.8);
                    box-shadow: inset 0 2px 5px rgba(0,0,0,0.05);
                    outline: none;
                    transition: 0.3s;
                }

                input:focus {
                    box-shadow: 0 0 0 2px #007bff33;
                }

                .form-actions {
                    margin-top: 30px;
                    text-align: right;
                }

                .btn {
                    padding: 12px 22px;
                    border: none;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 14px rgba(0,0,0,0.1);
                }

                .btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(0,0,0,0.15);
                }

                .btn.add {
                    background: linear-gradient(to right, #00b09b, #96c93d);
                    color: white;
                }

                .btn.update {
                    background: linear-gradient(to right, #1d8cf8, #3358f4);
                    color: white;
                }

                .btn.edit {
                    background: #ffdd57;
                    color: #333;
                }

                .btn.delete {
                    background: #f5365c;
                    color: white;
                }

                .product-list {
                    margin-top: 50px;
                    padding: 0;
                    list-style: none;
                }

                .product-list li {
                    background: white;
                    border-radius: 12px;
                    padding: 25px;
                    max-width: 850px;
                    margin: 20px auto;
                    box-shadow: 0 6px 16px rgba(0,0,0,0.06);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    transition: transform 0.2s;
                }

                .product-list li:hover {
                    transform: scale(1.01);
                }

                .product-info strong {
                    font-size: 18px;
                    display: block;
                    margin-bottom: 5px;
                    color: #222;
                }

                .product-info p {
                    margin: 0;
                    color: #666;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default AdminPage;
