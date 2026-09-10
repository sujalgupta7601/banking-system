import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-200">

            {/* Main Navbar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="h-16 flex items-center justify-between">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-xl sm:text-2xl font-bold text-blue-600"
                        onClick={() => setMenuOpen(false)}
                    >
                        SecureBank
                    </Link>


                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6 lg:gap-8">

                        <Link
                            to="/"
                            className="text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            Home
                        </Link>

                        <Link
                            to="/login"
                            className="text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Register
                        </Link>

                    </div>


                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
                        aria-label="Toggle navigation menu"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? (
                            /* X icon */
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            /* Hamburger icon */
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>

                </div>


                {/* Mobile Navigation */}
                {menuOpen && (
                    <div className="md:hidden border-t border-gray-100 py-4">

                        <div className="flex flex-col gap-2">

                            <Link
                                to="/"
                                onClick={() => setMenuOpen(false)}
                                className="px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            >
                                Home
                            </Link>

                            <Link
                                to="/login"
                                onClick={() => setMenuOpen(false)}
                                className="px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                onClick={() => setMenuOpen(false)}
                                className="px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-center"
                            >
                                Register
                            </Link>

                        </div>

                    </div>
                )}

            </div>

        </nav>
    );
}

export default Navbar;