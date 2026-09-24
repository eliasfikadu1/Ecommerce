import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API_URL = "https://ecommerce-eg1n.onrender.com";

function ProductDetails({ addToCart }) {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Product ማምጣት አልተቻለም");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-500">
          {error || "Product not found"}
        </h2>

        <Link
          to="/products"
          className="inline-block mt-5 bg-orange-500 text-white px-6 py-3 rounded-lg"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">

        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>
            <img
              src={`${API_URL}/images/${product.image}`}
              alt={product.name}
              className="w-full h-[400px] object-cover rounded-2xl"
            />
          </div>

          <div>
            <p className="text-orange-500 font-semibold mb-2">
              Fresh Food
            </p>

            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>

            <p className="text-3xl font-bold text-orange-500 mb-6">
              {product.price} ETB
            </p>

            <p className="text-gray-600 text-lg leading-8 mb-8">
              {product.description}
            </p>

            <button
              onClick={() => addToCart(product)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl text-lg"
            >
              🛒 Add to Cart
            </button>

            <Link
              to="/products"
              className="block text-center mt-4 border border-gray-300 py-3 rounded-xl"
            >
              ← Back to Products
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;