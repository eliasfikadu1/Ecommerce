import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "https://ecommerce-eg1n.onrender.com";

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products`)
      .then((response) => {
        console.log("API DATA:", response.data);
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("GET PRODUCTS ERROR:", error);
        setError("Products ማምጣት አልተቻለም");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🍔</div>
          <p className="text-xl font-semibold text-orange-500">
            Loading Products...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <div className="text-5xl mb-4">😕</div>
          <p className="text-red-500 text-lg font-semibold">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 px-5 md:px-8 py-12">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">

          <p className="text-orange-500 font-bold uppercase tracking-wider mb-2">
            FoodExpress Menu
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Our Delicious Products 🍴
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Choose your favorite food and order now.
          </p>

          <div className="w-20 h-1 bg-orange-500 mx-auto mt-5 rounded-full"></div>
        </div>

        {/* PRODUCTS */}
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <div className="text-6xl mb-4">🍽️</div>

            <p className="text-xl text-gray-500 font-semibold">
              No products found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition duration-300"
              >

                {/* IMAGE */}
                <div className="relative overflow-hidden">
                  <img
                    src={`${API_URL}/images/${product.image}`}
                    alt={product.name}
                    className="w-full h-60 object-cover hover:scale-105 transition duration-500"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/600x400?text=No+Image";
                    }}
                  />

                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                    <span className="text-orange-500 font-bold">
                      Fresh
                    </span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">

                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {product.name}
                  </h2>

                  <p className="text-gray-500 min-h-[48px] mb-4">
                    {product.description ||
                      "Delicious and fresh food prepared just for you."}
                  </p>

                  <div className="flex items-center justify-between mb-5">
                    <p className="text-2xl font-extrabold text-orange-500">
                      {product.price} Birr
                    </p>

                    <span className="text-yellow-500">
                      ★★★★★
                    </span>

                  </div>

                  {/* BUTTONS */}
                  <div className="flex gap-3">

                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-orange-500 text-white px-4 py-3 rounded-xl font-bold hover:bg-orange-600 transition shadow-sm"
                    >
                      Add to Cart 🛒
                    </button>

                    <Link
                      to={`/products/${product._id}`}
                      className="flex-1 text-center border-2 border-orange-500 text-orange-500 px-4 py-3 rounded-xl font-bold hover:bg-orange-500 hover:text-white transition"
                    >
                     View Details
                    </Link>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

        {/* BOTTOM CTA */}
        <div className="mt-16 bg-orange-500 rounded-3xl p-8 md:p-10 text-center text-white shadow-lg">

          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            Hungry? We've Got You! 🍔
          </h2>

          <p className="text-orange-100 mb-6">
            Pick your favorite food and enjoy fresh taste delivered to you.
          </p>

          <Link
            to="/cart"
            className="inline-block bg-white text-orange-500 px-7 py-3 rounded-xl font-bold hover:bg-orange-50 transition"
          >
            View Cart 🛒
          </Link>

        </div>

      </div>
    </div>
  );
};

export default Products;