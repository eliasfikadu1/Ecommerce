import React, { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "https://ecommerce-eg1n.onrender.com";

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      setError("Please login to see your orders.");
      setLoading(false);
      return;
    }

    let user;

    try {
      user = JSON.parse(savedUser);
    } catch (err) {
      setError("Please login again.");
      setLoading(false);
      return;
    }

    const userId = user?._id || user?.id;

    if (!userId) {
      setError("Please login again to see your orders.");
      setLoading(false);
      return;
    }

    axios
      .get(`${API_URL}/api/orders/${userId}`)
      .then((response) => {
        console.log("MY ORDERS:", response.data);
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("ORDERS ERROR:", error);
        setError(
          error.response?.data?.message ||
            "Orders ማምጣት አልተቻለም"
        );
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">
          Loading Orders...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 px-5">
        <h1 className="text-red-500 text-2xl font-bold">
          {error}
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-5">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
          My Orders 📦
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow text-center">
            <p className="text-gray-500">
              No orders found.
            </p>
          </div>
        ) : (
          orders.map((order, index) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-md p-6 mb-6"
            >

              <div className="flex justify-between items-start mb-5">
                <div>
                  <h2 className="text-xl font-bold">
                    Order #{index + 1}
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : ""}
                  </p>
                </div>

                <div className="text-orange-500 font-bold text-xl">
                  {order.total} ETB
                </div>
              </div>

              <div className="border-t pt-4">

                <h3 className="font-bold mb-3">
                  Products
                </h3>

                {order.items?.map((item, itemIndex) => (
                  <div
                    key={item._id || itemIndex}
                    className="flex justify-between items-center bg-gray-50 p-3 rounded-lg mb-2"
                  >

                    <div className="flex items-center gap-3">

                      {item.image && (
                        <img
                          src={`${API_URL}/images/${item.image}`}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}

                      <div>
                        <p className="font-semibold">
                          {item.name}
                        </p>

                        <p className="text-gray-500">
                          Quantity: {item.quantity}
                        </p>

                        <p className="text-orange-600 text-sm font-semibold">
                          {Number(item.price)} ETB each
                        </p>
                      </div>
</div>

                    <p className="font-bold">
                      {Number(item.price) * item.quantity} ETB
                    </p>

                  </div>
                ))}

              </div>

              <div className="border-t mt-5 pt-5 text-gray-600">

                <p>
                  <strong>Customer:</strong>{" "}
                  {order.customerName}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {order.phone}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {order.address}
                </p>

              </div>

              <div className="text-right mt-5">
                <span className="text-2xl font-bold text-orange-600">
                  Total: {order.total} ETB
                </span>
              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default MyOrders;
