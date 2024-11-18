import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const fetchCartItems = async (cartId) => {
        try {
            const response = await fetch(`http://pharmacy1.runasp.net/api/ShoppingCart/GetByIdAsync?id=${cartId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch cart items');
            }
            const data = await response.json();
            setCartItems(data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const addToCart = async ({UserEmail,ProductId,Quantity,UnitPrice,LinePrice}) => {
        try {
            const response = await fetch('http://pharmacy1.runasp.net/api/ShoppingCartItem/Add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "ProductId":ProductId,
                    "Quantity": Quantity,
                    "UnitPrice":  UnitPrice,
                    "LineTotal": LinePrice,
                    "email": UserEmail
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add item to cart');
            }

            // Update local state after successful addition
            setCartItems((prevItems) => {
                const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
                if (existingItem) {
                    return prevItems.map(cartItem =>
                        cartItem.id === item.id
                            ? { ...cartItem, quantity: cartItem.quantity + 1 }
                            : cartItem
                    );
                }
                return [...prevItems, { ...item, quantity: 1 }];
            });
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    // Function to remove items from the cart by ID
    const removeFromCart = async (id) => {
        try {
            const response = await fetch(`http://pharmacy1.runasp.net/api/ShoppingCart/DeleteById?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to remove item from cart');
            }

            // Update local state after successful deletion
            setCartItems((prevItems) => 
                prevItems.filter(cartItem => cartItem.id !== id)
            );
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, fetchCartItems }}>
            {children}
        </CartContext.Provider>
    );
};