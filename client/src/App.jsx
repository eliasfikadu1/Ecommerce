import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const addToCart = (product) => {
    const existingProduct = cartItems.find(
      (item) => item._id === product._id
    );

    if (existingProduct) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <BrowserRouter>
      <AppContent
        cartItems={cartItems}
        setCartItems={setCartItems}
        addToCart={addToCart}
        totalCartItems={totalCartItems}
        user={user}
        setUser={setUser}
      />
    </BrowserRouter>
  );
}

function AppContent({
  cartItems,
  setCartItems,
  addToCart,
  totalCartItems,
  user,
  setUser,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 md:px-12 py-5 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-blue-600"
        >
          My Ecommerce
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Products
          </Link>

          <Link
            to="/cart"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Cart 🛒 ({totalCartItems})
          </Link>

          <Link
            to="/my-orders"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            My Orders 📦
          </Link>

          {/* Logged In User */}
          {user ? (
            <>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Profile 👤
              </Link>

              <span className="font-semibold text-green-600">
                Welcome, {user.name || user.fullname || "User"} 👋
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-blue-600 font-bold"
              >
                Login
              </Link>
<Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Pages */}
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/home" element={<Home />} />

        <Route
          path="/products"
          element={<Products addToCart={addToCart} />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetails addToCart={addToCart} />}
        />

        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          }
        />

        <Route
          path="/my-orders"
          element={<MyOrders />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={
            <Login
              setUser={setUser}
            />
          }
        />

        <Route
          path="/profile"
          element={
            <Profile
              user={user}
              setUser={setUser}
            />
          }
        />

      </Routes>
    </div>
  );
}

export default App;
