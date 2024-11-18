function Brand({ brandImg, brandName }) {
    return (
        <a href="#" className="flex flex-col w-[10%] gap-1 pb-6 shadow-md overflow-hidden">
            <img
                src={brandImg}
                alt="brand"
                className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
            />
            <p className="text-sm text-gray-800 font-medium capitalize hover:text-blue-700 pl-2">
                {brandName}
            </p>
        </a>
    );
}

export default Brand;
