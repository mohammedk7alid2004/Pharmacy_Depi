function IconCategory({ text,catImg }) {
    return (
        <div className='flex flex-col items-center gap-1'>
            <img src={catImg} alt="category" className='w-16 h-16 filter hue-rotate-180' />
            <h1 className="text-sm text-blue-700 capitalize font-medium">{text}</h1>
        </div>
    )
}

export default IconCategory
