import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-600">
          Loading Products...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-red-500 text-lg">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Our Products
          </h1>

          <p className="text-gray-500 mt-2">
            Choose your favorite food and order now 🍴
          </p>
        </div>

        {/* Products */}
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">
              No products found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
              >

                {/* Product Image */}
                <img
                  src={`http://localhost:5000/images/${product.image}`}
                  alt={product.name}
                  className="w-full h-56 object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/600x400?text=No+Image";
                  }}
                />

                {/* Product Info */}
                <div className="p-5">

                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {product.name}
                  </h2>

                  <p className="text-gray-500 min-h-[48px] mb-3">
                    {product.description || "Delicious and fresh food."}
                  </p>

                  <p className="text-2xl font-extrabold text-orange-500 mb-5">
                    {product.price} Birr
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-3">

                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-green-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-green-700 transition"
                    >
                      Add to Cart 🛒
                    </button>

                    <Link
                      to={`/products/${product._id}`}
                      className="flex-1 text-center bg-blue-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-blue-700 transition"
                    >
                      Details
                    </Link>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default Products;
