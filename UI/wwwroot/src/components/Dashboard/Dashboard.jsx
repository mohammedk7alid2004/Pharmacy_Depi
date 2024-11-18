import { useEffect, useState } from "react";
import Loader from "../Loader";
import DashMenu from "./DashMenu";
import {Route, Routes } from 'react-router-dom';
import HelloDash from "./HelloDash";
import NotFoundPage from "../NotFoundPage";
import ViewProducts from "./ProductsManagement";
import OrdersManagement from "./OrdersManagement";
import CategoriesManagement from './CategoriesManagement';
import CommentsManagement from "./CommentsManagement";
import { ProductProvider } from "../../contexts/ProductsContext";
function Dashboard() {
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false);
        },1000)
    },[])
    return (
        <>
            {loading ? <Loader visible={loading} /> : (<>
                <DashMenu/>
                    <Routes>
                        <Route index element={ <HelloDash/>}/>
                        <Route path="/products" element={ <ViewProducts/>}/>
                        <Route path="/orders" element={ <OrdersManagement/>}/>
                        <Route path="/categories" element={ <CategoriesManagement/>}/>
                        <Route path="/comments" element={ <CommentsManagement/>}/>
                        <Route path="/*" element={<NotFoundPage />} />
                    </Routes>
            </>)}
        </>
    );
}

export default Dashboard
