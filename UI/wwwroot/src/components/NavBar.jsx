import { Pill, Search, Store, UserRound, ShoppingBag, Menu, LogOut } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useEffect, useState } from "react";
import secureLocalStorage from 'react-secure-storage';
import Button from "../design/Button";
import Loader from "./Loader";
import { useAuth } from '../contexts/AuthContext'

function NavBar({ logo }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [DropOpen, setDropDown] = useState(false);
    const [loading, setLoading] = useState(false);
    const {isAuth}=useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 200);
        secureLocalStorage.removeItem('user');
        localStorage.removeItem('token');
        toggleDropdown();
        navigate('/login')
    };

    const toggleDropdown = () => {
        setDropDown(!DropOpen);
    };

    const toggleCart = () => {
        setIsOpen(!isOpen);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    }, []);

    const userName = () => {
        if (isLogged) {
            try {
                return JSON.parse(secureLocalStorage.getItem('user')).firstName;
            } catch (error) {
                console.log("Cannot JSON parse the user data", error);
                return 'Guest';
            }
        }
        return 'Guest';
    };
    return (
        <>
            {loading ? <Loader visible={loading} /> : <>
                <nav className="flex items-end px-10 py-3 justify-between">
                    <Link to="/" className="w-1/5 h-full"><img src={logo} alt="logo" className="w-full h-auto " /> </Link>
                    <div className="flex items-end gap-2 ml-5">
                        <button
                            className="flex gap-2 text-lg font-semibold capitalize w-[100px] items-end"
                            onClick={toggleSidebar}
                        >
                            <Menu /> menu
                        </button>
                        <Link
                            to='/shop'
                            className="flex gap-2 text-lg font-semibold capitalize w-[300px] items-end"
                        >
                            <Pill /> Pharmacy Prescriptions
                        </Link>
                    </div>

                    <div className="flex items-center bg-gray-100 rounded-sm h-12 mx-4 w-full">
                        <Search className="text-gray-500 w-6 h-auto mx-2" />
                        <input
                            type="text"
                            placeholder="Search everything"
                            className="border-none outline-none w-full text-gray-500 bg-gray-100 p-2"
                        />
                    </div>
                    <div className="flex items-center gap-4 w-2/5 h-full justify-end">
                        {/* <div >
                        <Link to="/store-finder" className="flex flex-col items-center">
                            <Store />
                            <span>Store Finder</span>
                        </Link>
                    </div> */}
                        <div >
                            <Link to={isLogged ? "" : "/login"} onClick={toggleDropdown} className="flex flex-col items-center">
                                <UserRound />
                                <span>
                                    {userName()}
                                </span>
                            </Link>
                            {DropOpen && isLogged && (
                                <div className="absolute right-0 z-10 w-64 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                                    <ul className="py-1">
                                        <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                                            <LogOut className="mr-2" />
                                            Logout
                                        </button>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div>
                            <button className="flex flex-col items-center" onClick={toggleCart} >
                                <ShoppingBag />
                                <span>My Bag</span>
                            </button>

                            {isOpen && (
                                <div className="absolute right-0 z-10 w-64 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                                    <ul className="py-1">
                                        <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                                            Logout
                                        </li>
                                        <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                                            Logout
                                        </li>
                                        <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                                            Logout
                                        </li>
                                        <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                                            Logout
                                        </li>
                                    </ul>
                                    <Link to="/cart">
                                        <Button text="all orders" className={"mt-3 px-10 py-2 w-full bg-blue-600 hover:bg-blue-200"} type="button" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
               {isAuth?  <div className="w-full h-10">
                    <Link to="/dashboard">
                        <Button text="go to Dashboard" className={"mt-3 px-10 py-2 w-full bg-blue-600 hover:bg-blue-200"} type="button" />
                    </Link>
                </div>:<></>}
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </>}</>

    );
}
export default NavBar;
