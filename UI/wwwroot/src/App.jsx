import { BrowserRouter, Routes, Route } from "react-router-dom";

// import images
import "./App.css";
// import components
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Sidebar from "./components/Sidebar";
import ProductDetails from "./components/ProductDetails";
import Protected from "./components/Protected";
import Dashboard from "./components/Dashboard/Dashboard";
import NotFoundPage from "./components/NotFoundPage";
//contexts
import { ProductProvider } from "./contexts/ProductsContext";
import { CartProvider } from './contexts/CartContext';
import { useAuth } from './contexts/AuthContext'
import { AuthProvider } from "./contexts/AuthContext";
import Cart from "./components/Cart";



function App() {
  return (
    <>
      <AuthProvider>
        <ProductProvider>
            <CartProvider>
              <BrowserRouter>
                <Sidebar />
                <AppRoutes />
              </BrowserRouter>
            </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </>
  );
}

function AppRoutes() {
    return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/details/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/dashboard" element={
        <Protected isAuthorized={useAuth()}>
          <Dashboard />
        </Protected>
      } />
      <Route path='/dashboard/*' element={  
        <Protected isAuthorized={useAuth()}>
          <Dashboard />
        </Protected>} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}
export default App;
