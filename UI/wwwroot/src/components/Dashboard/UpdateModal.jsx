import { useState } from 'react';

const UpdateModal = ({ isOpen, closeModal, fields, initialData, onSubmit }) => {
    const [formData, setFormData] = useState(initialData || {});

    const handleChange = (e, fieldName) => {
        setFormData({
            ...formData,
            [fieldName]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);  
        closeModal();     
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                <h2 className="text-xl font-bold mb-4">Update Details</h2>
                <form onSubmit={handleSubmit}>
                    {fields.map((field) => (
                        <div key={field.name} className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                {field.label}
                            </label>
                            <input
                                type={field.type || 'text'}
                                value={formData[field.name] || ''}
                                onChange={(e) => handleChange(e, field.name)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    ))}

                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateModal;
