function FooterCard({ title, description , icon}) {
    return (
        <div className="flex flex-col h-full text-white relative">
            <img src={icon} alt={icon} className='absolute top-[-28%] right-0 w-[14%] h-fit'/>
            <h1 className="text-md font-normal capitalize pb-4">{title}</h1>
            <p className="text-sm text-white w-5/6 leading-6 ">
                {description}
            </p>
        </div>
    );
}

export default FooterCard;
