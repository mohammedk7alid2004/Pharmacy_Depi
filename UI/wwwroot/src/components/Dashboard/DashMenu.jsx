
import { LogOut } from 'lucide-react';
import Button from './../../design/Button';
import secureLocalStorage from 'react-secure-storage';
import Loader from '../Loader';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
function DashMenu() {
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate=useNavigate();
    const pages = ["products", "orders", "categories", "comments"];
    const handleLogout = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 200);
        secureLocalStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login')
    };
    return (
        <>
            {loading ? <Loader visible={loading} /> : <>
                <div className={`fixed z-50 top-0 left-0 h-full bg-gray-100 transition-transform transform w-64`}>
                    <h1 className={`text-2xl font-bold text-blue-600 p-3`}>Dashboard</h1>
                    <div className={`flex flex-col gap-4 w-full`}>
                        <div className={`border-2 border-gray-300 p-4`}>
                            {pages.map(page => (
                                <Link key={page} to={`${page}/`} > 
                                <Button text={page} type="button" 
                                className={`w-full mt-2 ${location.pathname === `/dashboard/${page}/`
                                    ? 'bg-slate-600' : 'bg-blue-500 '}`} /></Link>)
                    )}
                        </div>
                        <div className="absolute bottom-0 z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-full">
                            <ul className="py-1">
                                <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                                    <LogOut className="mr-2" />
                                    Logout
                                </button>
                            </ul>
                        </div>
                    </div>
                </div>
            </>}</>
    )
}

export default DashMenu
