import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayed, setDisplayed] = useState(null);
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://pharmacy1.runasp.net/api/Category/GetAll');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className={`fixed z-50 top-0 left-0 h-full bg-gray-100 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64`}>
      <button className="p-4 pl-56 w-fit self-start" onClick={toggleSidebar}><X /></button>
      <ul>
        {categories && Array.isArray(categories) && categories.length > 0 ? (
          <>
            {console.log(categories, "from khaled")}
            {categories.slice(1, 10).map((category) => (
              <Link key={category.categoryId} to="/shop">
                <li className="border-spacing-1 border-gray-800 pb-4 px-4">{category.categoryName}</li>
              </Link>
            ))}
          </>
        ) : (
          <li className="border-spacing-1 border-gray-800 pb-4 px-4">No categories available</li>
        )}

      </ul>
    </div>
  );
};

export default Sidebar;