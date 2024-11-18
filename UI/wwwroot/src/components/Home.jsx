import Ad from "./Ad";
import bloomHome from "../assets/Bloom-22.jpg";
import TitleLine from './../design/TitleLine';
import img from "../assets/Bloom-22.jpg";
import Categories from "./Categories";
import ProductSwiper from "./Products";
import logo from "../assets/dalida.jpg";
import Footer from './Footer';
import NavBar from './NavBar';
import { useState } from "react";
import Loader from "./Loader";
function Home() {
    const [loading, setLoading] = useState(true);
    setTimeout(() => {
        setLoading(false);
    }, 1200);
    return (
        <>
            {loading ? <Loader visible={loading} /> : (<>
                <NavBar logo={logo} />
                <Ad
                    title="Discover Your New Favorite Products"
                    description="Explore our wide range of products tailored to your needs."
                    btnText="Shop Now"
                    image={bloomHome}
                />
                <TitleLine title="Featured products" />
                <ProductSwiper start={11} stop={18} />
                <Categories />

                <TitleLine title="What's new" />
                <ProductSwiper start={20} stop={28} />

                <TitleLine title="Best Sellers" />
                <ProductSwiper start={40} stop={48} />
                <Ad
                    title="Must-Have Marvels!"
                    description="Discover the ultimate secrets to radiant skin and luscious locks with these trending products that are truly worth the hype."
                    btnText="Shop Now"
                    image={img}
                />
                <TitleLine title="dalida's offer" />
                <ProductSwiper start={30} stop={38} />
                <Footer />
            </>)}
        </>
    );
}

export default Home;
