import ProductCard from './ProductCard';
import image1 from '../assets/Bloom-22.jpg';
import { useProducts } from '../contexts/ProductsContext';
import { useEffect, useState } from 'react';
import TitleSection from '../design/TitleSection';
import Footer from './Footer';
import NavBar from './NavBar';
import logo from "../assets/dalida.jpg";
import Loader from './Loader';
const Shop = () => {
    const numberOfProducts = 12;
    const products = useProducts();
    const countOfPages = Math.ceil(products.length / numberOfProducts);
    const [showedProducts, setShowedProducts] = useState(products.slice(0, numberOfProducts));
    const [loading,setLoading]=useState(true);
    const handleClick = (pageNumber) => {
        const start = (pageNumber - 1) * numberOfProducts;
        const end = start + numberOfProducts;
        setShowedProducts(products.slice(start, end));
    };
    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false);
        },700)
    },[])

    const pagesNumbers = () => {
        return Array.from({ length: countOfPages }, (_, i) => i + 1);
    };

    const pages = pagesNumbers();

    return (
        <>
        {loading ? <Loader visible={loading} /> : 
        <>
            <NavBar logo={logo} />
            <div className="w-[90%] mx-auto">
                <TitleSection title="Browse Shop Products" />
                <div className="py-10 flex flex-wrap justify-center gap-5 mx-auto">
                    {showedProducts.map(product => (
                        <ProductCard
                            key={product.productId}
                            id={product.productId}
                            productImg={image1}
                            productName={product.productName}
                            productPrice={product.price}
                            beforeDiscount={product.beforeDiscount}
                            isDisabled={product.isDisabled}
                            className="w-[23%] h-full" 
                        />
                    ))}
                </div>
                <div className='flex justify-center mb-10'>
                    {
                        pages.map((i) =>
                            <button onClick={() => handleClick(i)} key={i} className="border-blue-300 border-2 p-1 w-fit h-8 py-0 mx-1">
                                {i}
                            </button>
                        )}
                </div>
            </div>
            <Footer />
            </>}
            </>
    );
};

export default Shop;