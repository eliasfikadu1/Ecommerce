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
import Navbar from "./components/Navbar";

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

      {BrowserRouter}
      <Navbar
    cartItems={cartItems}
    user={user}
    setUser={setUser}
  />
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
