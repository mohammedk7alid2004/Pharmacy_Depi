import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ProductCard from './ProductCard';
import { useProducts } from '../contexts/ProductsContext';
import image1 from '../assets/Bloom-22.jpg';
const ProductSwiper = ({start,stop}) => {
  const products=useProducts();
  const displayedProducts=products.slice(start, stop);
  return (
    <Swiper
      spaceBetween={15}
      slidesPerView={5}
      navigation={true}
      pagination={{ clickable: true }}
      preventClicks={false}
      preventClicksPropagation={false}
      loop={true}
      modules={[Navigation, Pagination, Scrollbar]} 
      className="py-10 w-[94%]"
    >
      {displayedProducts.map(product => (
        <SwiperSlide key={product.productId}>
          <ProductCard
            id={product.productId}
            productImg={image1}
            productName={product.productName}
            productPrice={product.price}
            beforeDiscount={product.beforeDiscount}
            isDisabled={product.isDisabled}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSwiper;


