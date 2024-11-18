import React from 'react'
import Button from '../design/Button'
import { useNavigate } from 'react-router-dom'

function Ad({ title, description, btnText, image }) {
    const navigate=useNavigate();
    const handleClick=()=>{
        navigate('/shop');
    }
    return (
        <div className='flex items-center justify-center h-[86vh] p-[4%]'>
            <div className='flex flex-col justify-center gap-4 pl-[4%] bg-blue-50 h-full'>
                <h1 className='text-3xl font-normal capitalize'>{title}</h1>
                <p className='text-md text-gray-800 w-5/6 leading-8 '>{description}</p>
                <Button type='button' text={btnText} onClick={handleClick}/>
            </div>
            <img src={image} alt="ad" className='w-5/6 h-full' />
        </div>
    )
}

export default Ad
