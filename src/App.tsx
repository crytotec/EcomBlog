import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Home from "./Pages/Home";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";

import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Account from "./Pages/Account";
import ProductDetails from "./Pages/ProductDetails";

import { UserProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import ProtectedRoute from "./Route/ProtectedRoute";

import { Toaster } from "react-hot-toast";
import NotFound from "./Pages/NotFound";


const authPages = [
  "/login",
  "/register",
  "/forgot-password",
];


function AppContent() {
  const location = useLocation();

  const isAuthPage = authPages.includes(location.pathname);


  if (isAuthPage) {
    return (
      <>
        <Routes>
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPasswordPage />}
          />
        </Routes>
      </>
    );
  }

  return (
    <div className="min-h-screen pt-4 flex flex-col">

      <Navbar />

      <main className="flex-1">
        <Routes>

          {/* Home */}
          <Route
            path="/"
            element={<Home />}
          />
          <Route path="*" element={<NotFound/>}/>
          {/* Product Details */}
          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          {/* Cart */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          
          {/* Checkout */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          {/* Account */}
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />

        </Routes>
      </main>

      <Footer />

    </div>
  );
}


function App() {
  return (
    <BrowserRouter>

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#ffffff",
            borderRadius: "12px",
          },
        }}
      />

      <UserProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </UserProvider>

    </BrowserRouter>
  );
}


export default App;
