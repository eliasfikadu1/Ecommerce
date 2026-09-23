import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("HOME PRODUCTS ERROR:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <section className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

          <div className="text-white">
            <p className="text-lg font-semibold mb-4">
              🍴 Welcome to My Ecommerce
            </p>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Great Taste,
              <br />
              Delivered Fresh
            </h1>

            <p className="mt-6 text-lg text-white/90 max-w-xl">
              Discover delicious food and order your favorite products
              quickly and easily.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                to="/products"
                className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-gray-100"
              >
                Order Now →
              </Link>

              <Link
                to="/products"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-orange-600"
              >
                View Products
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-white p-5 rounded-3xl shadow-2xl rotate-2">
              <div className="w-72 h-64 bg-orange-100 rounded-2xl flex items-center justify-center">
                <span className="text-8xl">🍕</span>
              </div>

              <div className="text-center mt-5">
                <h2 className="text-2xl font-bold text-gray-800">
                  Delicious Food
                </h2>
                <p className="text-gray-500 mt-2">
                  Fresh & Delicious ⭐️⭐️⭐️⭐️⭐️
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-7 rounded-2xl shadow-md text-center">
            <div className="text-5xl mb-4">🍕</div>
            <h3 className="text-xl font-bold">Fresh Food</h3>
            <p className="text-gray-500 mt-2">
              Fresh and delicious meals prepared for you.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl shadow-md text-center">
            <div className="text-5xl mb-4">🚚</div>
            <h3 className="text-xl font-bold">Fast Delivery</h3>
            <p className="text-gray-500 mt-2">
              Get your favorite food quickly and safely.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl shadow-md text-center">
            <div className="text-5xl mb-4">⭐️</div>
            <h3 className="text-xl font-bold">Quality Guaranteed</h3>
            <p className="text-gray-500 mt-2">
              Quality products and great shopping experience.
            </p>
          </div>

        </div>
      </section>

      {/* PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 pb-16">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800">
              Popular Products
            </h2>

            <p className="text-gray-500 mt-2">
              Choose your favorite food 🍴
            </p>
          </div>
<Link
            to="/products"
            className="text-orange-600 font-bold hover:text-orange-700"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {products.slice(0, 8).map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
            >

              <img
                src={`http://localhost:5000/images/${product.image}`}
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">

                <h3 className="text-xl font-bold text-gray-800">
                  {product.name}
                </h3>

                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {product.description}
                </p>

                <p className="text-xl font-extrabold text-orange-500 mt-3">
                  {product.price} Birr
                </p>

                <div className="flex gap-2 mt-4">

                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700"
                  >
                    Add 🛒
                  </button>

                  <Link
                    to={`/products/${product._id}`}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-center font-bold hover:bg-blue-700"
                  >
                    Details
                  </Link>

                </div>

              </div>
            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white text-center px-6 py-16">

        <h2 className="text-3xl md:text-4xl font-extrabold">
          Ready to Taste Something Great?
        </h2>

        <p className="text-gray-300 mt-3">
          Explore our products and order your favorite food today.
        </p>

        <Link
          to="/products"
          className="inline-block mt-7 bg-orange-500 px-9 py-3 rounded-full font-bold hover:bg-orange-600"
        >
          Explore Products →
        </Link>

      </section>

    </div>
  );
}

export default Home;
