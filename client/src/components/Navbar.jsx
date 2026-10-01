import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ cartItems = [], user, setUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Navbar */}
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="text-2xl font-extrabold text-orange-500"
          >
            Food<span className="text-gray-800">Express</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">

            <Link
              to="/"
              className="font-semibold text-gray-700 hover:text-orange-500 transition"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="font-semibold text-gray-700 hover:text-orange-500 transition"
            >
              Products
            </Link>

            <Link
              to="/cart"
              className="relative font-semibold text-gray-700 hover:text-orange-500 transition"
            >
              Cart

              {cartItems.length > 0 && (
                <span className="absolute -top-3 -right-4 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {user ? (
              <>
                <Link
                  to="/my-orders"
                  className="font-semibold text-gray-700 hover:text-orange-500 transition"
                >
                  My Orders
                </Link>

                <Link
                  to="/profile"
                  className="font-semibold text-gray-700 hover:text-orange-500 transition"
                >
                  Profile
                </Link>

                <button
                  onClick={logout}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-semibold text-gray-700 hover:text-orange-500 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-3xl text-gray-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 py-3 pb-5">

            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center px-4 py-3 rounded-lg font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-500"
            >
              🏠 <span className="ml-3">Home</span>
            </Link>
<Link
              to="/products"
              onClick={closeMenu}
              className="flex items-center px-4 py-3 rounded-lg font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-500"
            >
              🍔 <span className="ml-3">Products</span>
            </Link>

            <Link
              to="/cart"
              onClick={closeMenu}
              className="flex items-center justify-between px-4 py-3 rounded-lg font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-500"
            >
              <span>
                🛒 <span className="ml-3">Cart</span>
              </span>

              <span className="bg-orange-500 text-white text-xs font-bold rounded-full px-2 py-1">
                {cartItems.length}
              </span>
            </Link>

            {user ? (
              <>
                <Link
                  to="/my-orders"
                  onClick={closeMenu}
                  className="flex items-center px-4 py-3 rounded-lg font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                >
                  📦 <span className="ml-3">My Orders</span>
                </Link>

                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="flex items-center px-4 py-3 rounded-lg font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                >
                  👤 <span className="ml-3">Profile</span>
                </Link>

                <button
                  onClick={logout}
                  className="w-full flex items-center px-4 py-3 rounded-lg font-semibold text-red-600 hover:bg-red-50"
                >
                  🚪 <span className="ml-3">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex items-center px-4 py-3 rounded-lg font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                >
                  🔑 <span className="ml-3">Login</span>
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="flex items-center px-4 py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600"
                >
                  📝 <span className="ml-3">Register</span>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
