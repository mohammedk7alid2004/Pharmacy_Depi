import {Link} from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center p-8 bg-white rounded-lg">
                <h1 className="text-6xl font-bold text-red-500">404</h1>
                <p className="mt-4 text-lg text-gray-600">Oops! The page you are looking for could not be found.</p>
                <Link
                    to="/" 
                    className="mt-6 inline-block rounded bg-blue-500 px-4 py-2 
                    text-white font-semibold hover:bg-blue-600 transition">
                    Go back to Home
                </Link>
             </div>
        </div>
    );
};

export default NotFoundPage;