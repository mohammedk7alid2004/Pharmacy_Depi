import { useEffect, useState } from 'react';
import Comment from './Comment';
import Details from './Details';
import { useParams } from 'react-router-dom';
import Footer from './Footer';
import NavBar from './NavBar';
import logo from "../assets/dalida.jpg";
import img from "../assets/Bloom-22.jpg";
import secureLocalStorage from "react-secure-storage";
import Loader from './Loader';

const ProductDetails = () => {
    const { id } = useParams();
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
        fetch(`http://pharmacy1.runasp.net/api/Product/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch product details");
                }
                return res.json();
            })
            .then(data => {
                setProduct(data);
            })
            .catch(err => {
                console.log("Error fetching product details: ", err);
            });
    }, [id]);

    useEffect(() => {
        fetch(`http://pharmacy1.runasp.net/api/ProductReview/GetAll`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch product reviews");
                }
                return res.json();
            })
            .then(data => {
                setComments(data);
            })
            .catch(err => {
                console.log("Error fetching product reviews: ", err);
            });
    }, [id]);

    const userData = JSON.parse(secureLocalStorage.getItem('user'));

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const newCommentData = {
            ProductId: id,
            email: userData.email,
            ContentReview: newComment,
        };

        setNewComment("");  

        fetch(`http://pharmacy1.runasp.net/api/ProductReview/Add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCommentData)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to submit product review");
                }
                return res.json();
            })
            .then(data => {
                setComments(prevComments => [data, ...prevComments]);
            })
            .catch(err => {
                console.log("Error submitting comment: ", err);
            });
    };

    return (
        <>
            {loading ? <Loader visible={loading} /> : (
                <>
                    <NavBar logo={logo} />
                    <div className="container mx-auto p-5 w-[90%]">
                        <Details
                            imageUrl={img}
                            name={product.productName}
                            desc={product.description}
                            price={product.price}
                            quantity={product.quantityInStock}
                            shippingInfo={"dkkdkd"}
                        />

                        <div className="mt-10">
                            <h2 className="text-xl font-semibold">Comments</h2>
                            <form onSubmit={handleCommentSubmit} className="mt-4">
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Leave a comment..."
                                    rows="4"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                                <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                    Submit Comment
                                </button>
                            </form>

                            <div className="mt-6">
                                {comments.map(comment => (
                                    <Comment key={comment.reviewId} comment={comment} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <Footer />
                </>
            )}
        </>
    );
};

export default ProductDetails;
