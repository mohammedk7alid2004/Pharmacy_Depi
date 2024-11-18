import { createContext, useContext, useEffect, useState } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);
export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const response = await fetch('http://pharmacy1.runasp.net/api/Product/GetAll');
                const data = await response.json();
                setProducts(data);
            }catch (error){
                console.log("error is ",error)
            }
        };
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={products}>
            {children}
        </ProductContext.Provider>
    );
};
