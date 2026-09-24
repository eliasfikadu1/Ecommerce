import React from "react";
import { Link } from "react-router-dom";

const API_URL = "https://ecommerce-eg1n.onrender.com";

function Cart({ cartItems, setCartItems }) {
  const increaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((items) =>
      items.filter((item) => item._id !== id)
    );
  };

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-orange-50 p-6 md:p-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-orange-600">
        🛒 Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center bg-white p-10 rounded-xl shadow border-t-4 border-orange-500">
          <h2 className="text-2xl font-bold mb-4">
            Your cart is empty
          </h2>

          <Link
            to="/products"
            className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition"
          >
            🛍 Start Shopping
          </Link>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white p-5 rounded-xl shadow border-l-4 border-orange-500 flex flex-col md:flex-row gap-5"
              >
                <img
                  src={`${API_URL}/images/${item.image}`}
                  alt={item.name}
                  className="w-full md:w-40 h-40 object-cover rounded-lg"
                  onError={(e) => {
                    console.error(
                      "Cart image failed:",
                      `${API_URL}/images/${item.image}`
                    );
                  }}
                />

                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {item.name}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    {item.description}
                  </p>

                  <p className="text-lg font-bold text-orange-600 mt-3">
                    {Number(item.price)} Birr
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item._id)}
                      className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-bold hover:bg-orange-200"
                    >
                      −
                    </button>

                    <span className="text-xl font-bold">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(item._id)}
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-600"
                    >
                      +
                    </button>
                  </div>

                  {/* Item Total */}
                  <p className="text-xl font-bold text-gray-800 mt-4">
                    Total:{" "}
                    {Number(item.price) * item.quantity} Birr
                  </p>
{/* Remove - RED */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item._id)}
                    className="mt-4 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    🗑 Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-xl shadow h-fit border-t-4 border-orange-500">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Order Summary
            </h2>

            <div className="flex justify-between mb-4">
              <span className="text-gray-600">
                Products
              </span>

              <span className="font-bold">
                {cartItems.length}
              </span>
            </div>

            <div className="border-t pt-5 flex justify-between">
              <span className="text-xl font-bold">
                Total
              </span>

              <span className="text-2xl font-bold text-orange-600">
                {total} Birr
              </span>
            </div>

            {/* Checkout */}
            <Link
              to="/checkout"
              className="block w-full mt-6 bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 text-center transition"
            >
              💳 Checkout
            </Link>
          </div>

        </div>
      )}
    </div>
  );
}

export default Cart;
