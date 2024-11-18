import secureLocalStorage from 'react-secure-storage';
import image from '../assets/cash-icon.png';
import { useEffect, useState } from 'react';
function Comment({comment}) {
    return (
        <div className="border-b border-gray-300 py-3 shadow-md p-2 pt-4">
            <div className='flex items-center'>
                <img src={image} alt="image" className="w-10 h-10 rounded-full"/>
                <h3 className="font-semibold capitalize pl-2">{comment.userName}</h3>
            </div>
            <p className="text-gray-400 font-semibold ml-5">{comment.contentReview}</p>
        </div>
    )
}

export default Comment
