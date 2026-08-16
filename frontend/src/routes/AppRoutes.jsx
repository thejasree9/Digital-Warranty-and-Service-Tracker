import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/profile/Profile";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Notifications from "../pages/notifications/Notifications";
import ProductList from "../pages/products/ProductList";
import AddProduct from "../pages/products/AddProduct";
import EditProduct from "../pages/products/EditProduct";
import ProductDetails from "../pages/products/ProductDetails";
import WarrantyList from "../pages/warranty/WarrantyList";
import AddWarranty from "../pages/warranty/AddWarranty";
import WarrantyDetails from "../pages/warranty/WarrantyDetails";
import EditWarranty from "../pages/warranty/EditWarranty";
import ServiceList from "../pages/service/ServiceList";
import AddService from "../pages/service/AddService";
import ServiceDetails from "../pages/service/ServiceDetails";
import EditService from "../pages/service/EditService";

import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../components/layout/MainLayout";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />

        {/* Products */}
        <Route path="products" element={<ProductList />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="products/:id" element={<ProductDetails />} />

        {/* Warranty */} 
        <Route path="warranty" element={<WarrantyList />} />
<Route path="warranty/add" element={<AddWarranty />} />
<Route path="warranty/:productId" element={<WarrantyDetails />} />
<Route path="warranty/edit/:productId" element={<EditWarranty />} />

        {/* Service */}
       <Route path="services" element={<ServiceList />} />
<Route path="services/add" element={<AddService />} />
<Route path="services/:id" element={<ServiceDetails />} />
<Route path="services/edit/:id" element={<EditService />} />
<Route
    path="notifications"
    element={<Notifications />}
/>
      </Route>
      
     

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;