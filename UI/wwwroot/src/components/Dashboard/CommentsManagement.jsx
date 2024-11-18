import { useEffect, useState } from 'react';
import { Edit2, Trash2, PlusCircle } from 'lucide-react';


const CommentsManagement = () => {
    const [comments, setComments] = useState([]);
        useEffect(() => {
        fetch(`http://pharmacy1.runasp.net/api/ProductReview/GetAll`)
        .then(res => {
            if (!res.ok) {
                throw new Error("failed to fetch reviews product");
            }
            return res.json();
        }).then(data => {
            console.log(data);
            setComments(data);
        })
        .catch(err=>{
        console.log("error on fetching ", err);
        })}, [])

        useEffect(() => {
            fetch(`http://pharmacy1.runasp.net/api/ProductReview/GetAll`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("failed to fetch reviews product");
                }
                return res.json();
            }).then(data => {
                console.log(data);
                setComments(data);
            })
            .catch(err=>{
            console.log("error on fetching ", err);
            })}, [])
    
    

    const handleDeleteComment = (id) => {
        fetch(`http://pharmacy1.runasp.net/api/ProductReview/Delete?id=${id}`, { method: "delete" })
        .catch(err => {
            console.log("error on fetching ", err);
        })
        setComments(comments.filter(comment => comment.id !== id));
    };

    return (
        <div className="ml-64 p-4">
            <h1 className="text-xl font-bold mb-4">Comments Management</h1>
            
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-200 p-2">ID</th>
                        <th className="border border-gray-200 p-2">Author</th>
                        <th className="border border-gray-200 p-2">Comment</th>
                        <th className="border border-gray-200 p-2">ProductId</th>
                        <th className="border border-gray-200 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map(comment => (
                        <tr key={comment.reviewId}>
                            <td className="border border-gray-200 p-2">{comment.reviewId}</td>
                            <td className="border border-gray-200 p-2">{comment.userName}</td>
                            <td className="border border-gray-200 p-2">{comment.contentReview}</td>
                            <td className="border border-gray-200 p-2">{comment.productId}</td>
                            <td className="border border-gray-200 p-2">
                                <button onClick={() => handleDeleteComment(comment.reviewId)} className="ml-2">
                                    <Trash2 className="inline text-red-500" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CommentsManagement;