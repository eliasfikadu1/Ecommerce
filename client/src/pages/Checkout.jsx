import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Checkout({ cartItems, setCartItems }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const API_URL = "https://ecommerce-eg1n.onrender.com";

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!name || !phone || !address) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (cartItems.length === 0) {
      setMessage("Your cart is empty.");
      return;
    }

    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      setMessage("Please login before placing an order.");
      return;
    }

    let user;

    try {
      user = JSON.parse(savedUser);
    } catch (error) {
      setMessage("Please login again.");
      return;
    }

    const userId = user?._id || user?.id;

    if (!userId) {
      setMessage("Please login again before placing an order.");
      return;
    }

    try {

  const orderData = {
  userId: String(userId),
  customerName: name,
  phone: phone,
  address: address,

  items: cartItems.map((item) => ({
    productId: item._id,
    name: item.name,
    price: Number(item.price),
    quantity: item.quantity,
    image: item.image,
  })),

  total: total,
};

console.log("USER:", user);
console.log("USER ID:", userId);
console.log("SENDING ORDER:", orderData);

const API_URL = "https://ecommerce-eg1n.onrender.com";

const response = await axios.post(
  `${API_URL}/api/orders`,
  orderData
);

console.log("ORDER SAVED:", response.data);

      console.log("ORDER SAVED:", response.data);

      setMessage("Order placed successfully! 🎉");

      setCartItems([]);

      setTimeout(() => {
        navigate("/my-orders");
      }, 1500);
    } catch (error) {
      console.error("ORDER SAVE ERROR:", error);

      setMessage(
        error.response?.data?.message ||
          "Order could not be saved. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-10">
          <p className="text-orange-500 font-semibold tracking-wide uppercase">
            Complete Your Purchase
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mt-2">
            Checkout 🛒
          </h1>

          <p className="text-gray-500 mt-3">
            Enter your delivery information and place your order.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Order Summary */}
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 h-fit">

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Order Summary
              </h2>

              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                {cartItems.length} Item
                {cartItems.length !== 1 ? "s" : ""}
              </span>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-4">🛒</div>

                <p className="text-gray-500">
                  Your cart is empty.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
{cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between gap-4 border border-gray-100 rounded-2xl p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-4">

                      {item.image && (
                        <img
                          src={`${API_URL}/images/${item.image}`}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-xl"
                        />
                      )}

                      <div>
                        <h3 className="font-bold text-gray-800">
                          {item.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>

                        <p className="text-sm text-orange-600 font-semibold mt-1">
                          {Number(item.price)} ETB each
                        </p>
                      </div>

                    </div>

                    <p className="font-bold text-gray-800 whitespace-nowrap">
                      {Number(item.price) * item.quantity} ETB
                    </p>
                  </div>
                ))}

              </div>
            )}

            <div className="border-t border-gray-200 mt-6 pt-6">
              <div className="flex justify-between items-center">

                <span className="text-xl font-semibold text-gray-700">
                  Total
                </span>

                <span className="text-3xl font-extrabold text-orange-600">
                  {total} ETB
                </span>

              </div>
            </div>

          </div>

          {/* Checkout Form */}
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Delivery Information
            </h2>

            <p className="text-gray-500 mb-7">
              Please provide your information for delivery.
            </p>

            <form onSubmit={handleSubmit}>

              <div className="mb-5">
                <label className="block text-gray-700 font-semibold mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                  required
                />
              </div>

              <div className="mb-5">
                <label className="block text-gray-700 font-semibold mb-2">
                  Phone Number
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Delivery Address
                </label>

                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your delivery address"
rows="5"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition resize-none"
                  required
                />
              </div>

              {message && (
                <div
                  className={`mb-5 p-4 rounded-xl text-center font-semibold ${
                    message.includes("successfully")
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Place Order
              </button>

              <p className="text-center text-sm text-gray-400 mt-4">
                Your order will be saved securely.
              </p>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Checkout;
