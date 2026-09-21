import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("URL ID:", id);

        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );

        console.log("PRODUCT DETAILS:", response.data);

        setProduct(response.data);
      } catch (err) {
        console.error("GET PRODUCT ERROR:", err);
        console.error("SERVER RESPONSE:", err.response?.data);

        setError(
          err.response?.data?.message ||
            "Product could not be loaded."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">
          Loading product...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-600 text-xl mb-4">
          {error}
        </p>

        <button
          onClick={() => navigate("/products")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Back to Products
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">
          Product not found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">

          {/* Product Image */}
          <div className="flex items-center justify-center bg-gray-50 rounded-xl p-6">
            <img
              src={`http://localhost:5000/images/${product.image}`}
              alt={product.name}
              className="w-full max-w-md h-96 object-contain rounded-xl"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">

            <p className="text-sm text-blue-600 font-semibold uppercase mb-2">
              {product.category || "Product"}
            </p>

            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>

            <p className="text-3xl font-bold text-green-600 mb-6">
              {product.price} Birr
            </p>

            <p className="text-gray-600 text-lg leading-7 mb-8">
              {product.description || "No description available."}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">

              <button
                onClick={() => {
                  addToCart(product);
                  navigate("/cart");
                }}
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg transition"
              >
                🛒 Add to Cart
              </button>

              <button
                onClick={() => navigate("/products")}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg transition"
              >
                ← Back to Products
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;