import { Navigate } from "react-router-dom";

function Protected({ children, isAuthorized }) {
    if (!isAuthorized) {
        return <Navigate to='/' replace />
    }
    return (
        children
    )
}

export default Protected
