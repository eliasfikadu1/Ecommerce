import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);

  const API_URL = "https://ecommerce-eg1n.onrender.com";

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log("Products error:", error);
      });
  }, []);

  return (
    <div className="bg-white text-gray-900">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50">

        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-orange-200 rounded-full opacity-40"></div>
        <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-yellow-100 rounded-full opacity-50"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">

          {/* Hero Text */}
          <div>

            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-bold text-sm mb-6">
              🔥 Fresh Food • Fast Delivery
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-gray-900">
              Great Taste,
              <span className="block text-orange-500">
                Delivered Fresh
              </span>
            </h1>

            <p className="text-gray-600 text-lg md:text-xl mt-6 max-w-xl leading-relaxed">
              Delicious meals made with love and delivered straight
              to your door. Order your favorite food today.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              <Link
                to="/products"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition"
              >
                Order Now 🛒
              </Link>

              <Link
                to="/products"
                className="bg-white border-2 border-orange-200 text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-2xl font-bold text-lg transition"
              >
                Explore Menu →
              </Link>

            </div>

            {/* Small stats */}
            <div className="flex gap-8 mt-10">

              <div>
                <p className="text-2xl font-black text-gray-900">
                  100%
                </p>
                <p className="text-sm text-gray-500">
                  Fresh Food
                </p>
              </div>

              <div className="border-l border-gray-200 pl-8">
                <p className="text-2xl font-black text-gray-900">
                  Fast
                </p>
                <p className="text-sm text-gray-500">
                  Delivery
                </p>
              </div>

              <div className="border-l border-gray-200 pl-8">
                <p className="text-2xl font-black text-gray-900">
                  24/7
                </p>
                <p className="text-sm text-gray-500">
                  Support
                </p>
              </div>

            </div>

          </div>

          {/* Hero Image */}
          <div className="relative flex justify-center">

            <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-orange-300 rounded-full blur-3xl opacity-30"></div>

            <div className="relative bg-white p-3 rounded-[2rem] shadow-2xl rotate-2 hover:rotate-0 transition duration-500">

              <img
                src={`${API_URL}/images/burger.jpg`}
                alt="Delicious Burger"
                className="w-full max-w-lg h-80 md:h-[430px] object-cover rounded-[1.5rem]"
              />
{/* Floating price */}
              <div className="absolute -bottom-5 -left-5 bg-white shadow-xl rounded-2xl px-5 py-4">
                <p className="text-sm text-gray-500">
                  Starting from
                </p>
                <p className="text-2xl font-black text-orange-500">
                  250 ETB
                </p>
              </div>

              {/* Rating */}
              <div className="absolute -top-5 -right-5 bg-white shadow-xl rounded-2xl px-5 py-3">
                <p className="font-bold">
                  ⭐️ 4.9
                </p>
                <p className="text-xs text-gray-500">
                  Customer Rating
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ================= FEATURES ================= */}
      <section className="py-12 bg-white border-b border-gray-100">

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-5">

          <div className="group bg-orange-50 hover:bg-orange-100 p-6 rounded-2xl text-center transition">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-orange-500 text-white flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition">
              🚚
            </div>
            <h3 className="font-bold text-lg mt-4">
              Fast Delivery
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Fresh food at your door
            </p>
          </div>

          <div className="group bg-amber-50 hover:bg-amber-100 p-6 rounded-2xl text-center transition">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition">
              🍔
            </div>
            <h3 className="font-bold text-lg mt-4">
              Fresh Food
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Quality ingredients
            </p>
          </div>

          <div className="group bg-orange-50 hover:bg-orange-100 p-6 rounded-2xl text-center transition">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-orange-500 text-white flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition">
              💳
            </div>
            <h3 className="font-bold text-lg mt-4">
              Secure Payment
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Safe and easy checkout
            </p>
          </div>

          <div className="group bg-amber-50 hover:bg-amber-100 p-6 rounded-2xl text-center transition">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition">
              🎧
            </div>
            <h3 className="font-bold text-lg mt-4">
              24/7 Support
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              We're here to help
            </p>
          </div>

        </div>
      </section>


      {/* ================= PRODUCTS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="flex justify-between items-end mb-10">

          <div>
            <p className="text-orange-500 font-bold uppercase tracking-wider text-sm">
              Our Menu
            </p>

            <h2 className="text-3xl md:text-4xl font-black mt-2">
              Popular Food
            </h2>

            <p className="text-gray-500 mt-2">
              Discover our most delicious and popular meals.
            </p>
          </div>

          <Link
            to="/products"
            className="hidden md:inline-flex items-center gap-2 border-2 border-orange-500 text-orange-600 px-6 py-3 rounded-xl font-bold hover:bg-orange-500 hover:text-white transition"
          >
            View All →
          </Link>

        </div>
{/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">

          {products.slice(0, 8).map((product) => (

            <div
              key={product._id}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >

              {/* Image */}
              <div className="relative overflow-hidden">

                <img
                  src={`${API_URL}/images/${product.image}`}
                  alt={product.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                />

                {/* Fresh badge */}
                <span className="absolute top-4 left-4 bg-white text-orange-600 px-3 py-1.5 rounded-full text-xs font-black shadow">
                  🔥 Fresh
                </span>

              </div>


              {/* Card Content */}
              <div className="p-5">

                <h3 className="text-xl font-extrabold text-gray-800">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mt-3">

                  <p className="text-orange-500 text-xl font-black">
                    {product.price} ETB
                  </p>

                  <span className="text-sm text-yellow-500 font-bold">
                    ⭐️ 4.8
                  </span>

                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full mt-5 bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg transition"
                >
                  🛒 Add to Cart
                </button>

              </div>

            </div>

          ))}

        </div>

        {/* Mobile View All */}
        <div className="text-center mt-8 md:hidden">
          <Link
            to="/products"
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-xl font-bold"
          >
            View All Products →
          </Link>
        </div>

      </section>


      {/* ================= CTA BANNER ================= */}
      <section className="px-6 pb-16">

        <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-orange-500 to-amber-500 text-white">

          <div className="absolute -right-20 -top-20 w-64 h-64 bg-white rounded-full opacity-10"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white rounded-full opacity-10"></div>

          <div className="relative text-center py-14 px-6">

            <p className="font-bold uppercase tracking-widest text-orange-100">
              Hungry?
            </p>

            <h2 className="text-3xl md:text-5xl font-black mt-3">
              Good Food = Happy Mood ❤️
            </h2>

            <p className="text-orange-50 mt-4 text-lg">
              Fresh food. Great taste. Fast delivery.
            </p>

            <Link
              to="/products"
              className="inline-block mt-7 bg-white text-orange-600 px-8 py-4 rounded-xl font-black shadow-lg hover:scale-105 transition"
            >
              Start Ordering →
            </Link>

          </div>
        </div>

      </section>

    </div>
  );
}

export default Home;
