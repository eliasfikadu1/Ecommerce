import React, { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders")
      .then((response) => {
        console.log("ORDERS:", response.data);
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("ORDERS ERROR:", error);
        setError("Orders ማምጣት አልተቻለም");
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
      <div className="text-center py-20">
        <h1 className="text-red-500 text-2xl font-bold">
          {error}
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-10">
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

              <div className="flex justify-between mb-5">
                <div>
                  <h2 className="text-xl font-bold">
                    Order #{index + 1}
                  </h2>

                  <p className="text-gray-500 text-sm">
                    {new Date(order.createdAt).toLocaleString()}
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

                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between bg-gray-50 p-3 rounded-lg mb-2"
                  >
                    <div>
                      <p className="font-semibold">
                        {item.name}
                      </p>

                      <p className="text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="font-bold">
                      {item.price * item.quantity} ETB
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
                  <strong>Phone:</strong> {order.phone}
                </p>

                <p>
                  <strong>Address:</strong> {order.address}
                </p>
              </div>

              <div className="text-right mt-5">
                <span className="text-2xl font-bold">
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