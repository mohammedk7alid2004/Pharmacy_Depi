import { useState } from 'react';
import { Edit2, Trash2, PlusCircle } from 'lucide-react';
import { useProducts } from '../../contexts/ProductsContext';
import UpdateModal from './UpdateModal';

const ViewProducts = () => {
    const products = useProducts(); 
    const [displayProducts, setDisplayProducts] = useState(products); 
    const [newProductName, setNewProductName] = useState('');
    const [newProductDescription, setNewProductDescription] = useState('');
    const [newProductCategory, setNewProductCategory] = useState('');
    const [newProductStock, setNewProductStock] = useState(0);
    const [newProductPrice, setNewProductPrice] = useState(0); 
    const [selectedProduct, setSelectedProduct] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null); 
    };

    const handleProductUpdate = (updatedProduct) => {
        fetch('http://pharmacy1.runasp.net/api/Product/update', {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(updatedProduct)
        })
        setDisplayProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.productId === updatedProduct.productId ? updatedProduct : product
            )
        );
        closeModal(); 
    };

    const handleAddProduct = () => {
        const newProduct = {
            productName: newProductName,
            price: newProductPrice,
            description: newProductDescription,
            categoryId: newProductCategory,
            stock: newProductStock,
        };
        fetch('http://pharmacy1.runasp.net/api/Product/Create', {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newProduct)
        })
        setDisplayProducts([...displayProducts, newProduct]);
        setNewProductName('');
        setNewProductPrice(0);
        setNewProductDescription('');
        setNewProductCategory('');
        setNewProductStock(0);
    };

    const handleDeleteProduct = (id) => {
        fetch(`http://pharmacy1.runasp.net/api/Product/Delete?id=${id}`, { method: "DELETE" })
            .then(() => {
                setDisplayProducts(displayProducts.filter(product => product.productId !== id));
            })
            .catch(err => {
                console.log("Error while deleting product:", err);
            });
    };

    const productFields = [
        { name: 'productName', label: 'Product Name', type: 'text' },
        { name: 'price', label: 'Price', type: 'number' },
        { name: 'description', label: 'Description', type: 'text' },
        { name: 'categoryId', label: 'Category ID', type: 'text' },
        { name: 'stock', label: 'Stock Quantity', type: 'number' },
    ];

    return (
        <div className="ml-64 p-4">
            <h1 className="text-xl font-bold mb-4">Product Management</h1>

            <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Add New Product</h2>
                <div className="mb-2">
                    <label className="block font-medium">Product Name</label>
                    <input
                        type="text"
                        value={newProductName}
                        onChange={(e) => setNewProductName(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-2">
                    <label className="block font-medium">Price</label>
                    <input
                        type="number"
                        value={newProductPrice}
                        onChange={(e) => setNewProductPrice(Number(e.target.value))}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-2">
                    <label className="block font-medium">Description</label>
                    <input
                        type="text"
                        value={newProductDescription}
                        onChange={(e) => setNewProductDescription(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-2">
                    <label className="block font-medium">Category ID</label>
                    <input
                        type="text"
                        value={newProductCategory}
                        onChange={(e) => setNewProductCategory(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-2">
                    <label className="block font-medium">Stock Quantity</label>
                    <input
                        type="number"
                        value={newProductStock}
                        onChange={(e) => setNewProductStock(Number(e.target.value))}
                        className="border p-2 w-full"
                    />
                </div>
                <button onClick={handleAddProduct} className="bg-blue-500 text-white p-2 mt-2 rounded">
                    <PlusCircle className="inline mr-1" /> Add Product
                </button>
            </div>

            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-200 p-2">ID</th>
                        <th className="border border-gray-200 p-2">Name</th>
                        <th className="border border-gray-200 p-2">Description</th>
                        <th className="border border-gray-200 p-2">Category ID</th>
                        <th className="border border-gray-200 p-2">Stock</th>
                        <th className="border border-gray-200 p-2">Price</th>
                        <th className="border border-gray-200 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {displayProducts.map(product => (
                        <tr key={product.productId}>
                            <td className="border border-gray-200 p-2">{product.productId}</td>
                            <td className="border border-gray-200 p-2">{product.productName}</td>
                            <td className="border border-gray-200 p-2">{product.description}</td>
                            <td className="border border-gray-200 p-2">{product.categoryId}</td>
                            <td className="border border-gray-200 p-2">{product.stock}</td>
                            <td className="border border-gray-200 p-2">${product.price}</td>
                            <td className="border border-gray-200 p-2">
                                <button onClick={() => openModal(product)} className="mr-2">
                                    <Edit2 className="inline" />
                                </button>
                                <button onClick={() => handleDeleteProduct(product.productId)}>
                                    <Trash2 className="inline text-red-500" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <UpdateModal
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                    fields={productFields}
                    initialData={selectedProduct}
                    onSubmit={handleProductUpdate}
                />
            )}
        </div>
    );
};

export default ViewProducts;
