import { useEffect, useState } from 'react';
import { Edit2, PlusCircle } from 'lucide-react';
import UpdateModal from './UpdateModal';
import Loader from '../Loader';

const CategoriesManagement = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://pharmacy1.runasp.net/api/Category/GetAll');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleAddCategory = async () => {
        try {
            const response = await fetch('http://pharmacy1.runasp.net/api/Category/Add', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ categoryName: newCategoryName })
            });
    
            if (!response.ok) {
                throw new Error('Failed to add category');
            }
    
            const newCategory = await response.json(); 
            setCategories(prevCategories => [...prevCategories, newCategory]); 
            setNewCategoryName(''); 
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    const handleEditClick = (category) => {
        setCurrentCategory(category);
        setIsModalOpen(true); 
    };

    const handleUpdateCategory = async (updatedData) => {
        try {
            const response = await fetch(`http://pharmacy1.runasp.net/api/Category/Update?id=${currentCategory.categoryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(updatedData), 
            });
    
            if (!response.ok) {
                throw new Error('Failed to update category');
            }

            setCategories(prevCategories => 
                prevCategories.map(cat => cat.categoryId === currentCategory.categoryId ? { ...cat, ...updatedData } : cat)
            );
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    return (
        <div className="ml-64 p-4">
            <h1 className="text-xl font-bold mb-4">Categories Management</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Category Name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="border p-2 mr-2"
                />
                <button onClick={handleAddCategory} className="bg-blue-500 text-white p-2">
                    <PlusCircle className="inline mr-1" /> Add Category
                </button>
            </div>
            
            {isLoading ? (
                <Loader visible={isLoading} />
            ) : (
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-200 p-2">ID</th>
                            <th className="border border-gray-200 p-2">Category Name</th>
                            <th className="border border-gray-200 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category.categoryId}>
                                <td className="border border-gray-200 p-2">{category.categoryId}</td>
                                <td className="border border-gray-200 p-2">{category.categoryName}</td>
                                <td className="border border-gray-200 p-2">
                                    <button onClick={() => handleEditClick(category)}>
                                        <Edit2 className="inline" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <UpdateModal 
                isOpen={isModalOpen} 
                closeModal={() => setIsModalOpen(false)} 
                fields={[{ name: 'categoryName', label: 'Category Name' }]} 
                initialData={currentCategory} 
                onSubmit={handleUpdateCategory} 
            />
        </div>
    );
};

export default CategoriesManagement;