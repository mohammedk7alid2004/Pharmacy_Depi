import { useEffect, useState } from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import logo from "../assets/dalida.jpg";
import Footer from './Footer';
import NavBar from './NavBar';
import Loader from './Loader';

const Cart = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500)
        fetch('http://pharmacy1.runasp.net/api/ShoppingCartItem/GetAll')
            .then(res => res.json())
            .then(data => {
                setOrders(data);
                console.log(data);
            }).catch(err => console.log(err))
    }, []);
    const updateOrderQuantity = (orderId, amount) => {
        const updatedOrders = orders.map(order =>
            order.id === orderId
                ? { ...order, quantity: Math.max(1, order.quantity + amount) }
                : order
        );
        setOrders(updatedOrders);
    };

    const removeOrder = orderId => {
        setOrders(orders.filter(order => order.id !== orderId));
    };

    const totalPrice = orders.reduce(
        (total, order) => total + order.price * order.quantity,
        0
    );

    return (
        <>
            {loading ? <Loader visible={loading} /> :
                <>
                    <NavBar logo={logo} />
                    <div className="flex flex-col md:flex-row justify-between p-6 bg-gray-50 rounded-lg shadow-lg max-w-7xl mx-auto my-10">
                        <div className="w-full md:w-2/3 space-y-6">
                            <h1 className="text-3xl font-bold mb-6">Cart</h1>
                            {orders.map(order => (
                                <div
                                    key={order.id}
                                    className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
                                >
                                    <div className="flex items-center">
                                        {/* <img
                                        src={order.image}
                                        alt={order.name}
                                        className="w-24 h-24 rounded-lg object-cover"
                                    /> */}
                                        <div className="ml-4">
                                            <h2 className="text-xl font-semibold">{order.name}</h2>
                                            <p className="text-sm text-gray-500">description: {order.description}</p>
                                            <p className="text-lg font-bold text-gray-800">${order.price}</p>
                                            <p
                                                className={`text-sm ${order.inStock ? 'text-green-500' : 'text-red-500'
                                                    }`}
                                            >
                                                {order.inStock ? 'In Stock' : `Available in ${order.availableIn}`}
                                            </p>
                                            <div className="flex items-center space-x-2 mt-2">
                                                <button
                                                    onClick={() => updateOrderQuantity(order.id, -1)}
                                                    className="p-1 bg-gray-100 rounded-md hover:bg-gray-200"
                                                >
                                                    <Minus className="w-4 h-4 text-gray-600" />
                                                </button>
                                                <span className="px-4 py-1 text-lg font-semibold bg-gray-100 rounded-md">
                                                    {order.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateOrderQuantity(order.id, 1)}
                                                    className="p-1 bg-gray-100 rounded-md hover:bg-gray-200"
                                                >
                                                    <Plus className="w-4 h-4 text-gray-600" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeOrder(order.id)}
                                        className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="w-full md:w-1/3 mt-6 md:mt-0 bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                            <div className="flex justify-between mb-4">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-bold">${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-4">
                                <span className="text-gray-600">Discount</span>
                                <span className="font-bold">-</span>
                            </div>
                            <div className="flex justify-between mb-4">
                                <span className="text-gray-600">Delivery</span>
                                <span className="font-bold">Free</span>
                            </div>
                            <div className="flex justify-between mb-4">
                                <span className="text-gray-600">Tax</span>
                                <span className="font-bold">$0.00</span>
                            </div>
                            <hr className="my-4" />
                            <div className="flex justify-between text-xl font-bold">
                                <span>Total</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <button className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                    <Footer />
                </>}
        </>
    );
};

export default Cart