import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
// import { ProtectedRoute, AdminRoute } from "./routes/ProtectedRoute.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage.jsx";
import CartPage from "./pages/CartPage/CartPage.jsx";
import OrderConfirmationPage from "./pages/OrderConfirmationPage/OrderConfirmationPage.jsx";
import MyOrdersPage from "./pages/MyOrdersPage/MyOrdersPage.jsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.jsx";

const PUBLIC_NO_NAV = ["/login", "/register"];

function Layout({ children, noNav }) {
  return (
    <>
      {!noNav && <Navbar />}
      <main>{children}</main>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Auth pages — no navbar */}
      <Route
        path="/login"
        element={
          <Layout noNav>
            <LoginPage />
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout noNav>
            <RegisterPage />
          </Layout>
        }
      />

      {/* Public */}
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/products/:id"
        element={
          <Layout>
            <ProductDetailsPage />
          </Layout>
        }
      />

      {/* Protected */}
      <Route
        path="/cart"
        element={
          <Layout>
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/order-confirmation"
        element={
          <Layout>
            <ProtectedRoute>
              <OrderConfirmationPage />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/orders"
        element={
          <Layout>
            <ProtectedRoute>
              <MyOrdersPage />
            </ProtectedRoute>
          </Layout>
        }
      />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <Layout>
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          </Layout>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
