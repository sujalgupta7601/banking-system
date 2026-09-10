import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
    return (
        <div className="min-h-screen bg-gray-50">

            {/* Navbar */}
            <Navbar />

            {/* ================= HERO SECTION ================= */}
            <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="min-h-[calc(100vh-64px)] flex flex-col lg:flex-row items-center justify-center gap-12 py-16 lg:py-20">

                        {/* LEFT SIDE */}
                        <div className="w-full lg:w-1/2 text-center lg:text-left">

                            {/* Small heading */}
                            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                                Banking made simple
                            </span>

                            {/* Main heading */}
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">

                                Simple.
                                <span className="text-blue-600"> Secure.</span>
                                <br />

                                Smart Banking.

                            </h1>

                            {/* Description */}
                            <p className="mt-6 text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">

                                Manage your account, transfer money securely,
                                and keep track of your transactions — all in one place.

                            </p>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">

                                <Link
                                    to="/register"
                                    className="bg-blue-600 text-white px-7 py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-center"
                                >
                                    Open an Account
                                </Link>

                                <Link
                                    to="/login"
                                    className="bg-white text-blue-600 border border-blue-600 px-7 py-3 rounded-lg font-semibold hover:bg-blue-50 transition text-center"
                                >
                                    Login
                                </Link>

                            </div>

                        </div>


                        {/* RIGHT SIDE - BANK CARD */}
                        <div className="w-full lg:w-1/2 flex justify-center">

                            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8">

                                {/* Card Header */}
                                <div className="flex justify-between items-start">

                                    <div>

                                        <p className="text-sm text-gray-500">
                                            Available Balance
                                        </p>

                                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
                                            ₹1,24,500
                                        </h2>

                                    </div>

                                    {/* Bank icon */}
                                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
                                        ₹
                                    </div>

                                </div>


                                {/* Divider */}
                                <div className="border-t border-gray-200 my-6"></div>


                                {/* Account Details */}
                                <div className="grid grid-cols-2 gap-4">

                                    <div>

                                        <p className="text-sm text-gray-500">
                                            Account Number
                                        </p>

                                        <p className="font-semibold text-gray-800 mt-1">
                                            **** 4821
                                        </p>

                                    </div>


                                    <div className="text-right">

                                        <p className="text-sm text-gray-500">
                                            Status
                                        </p>

                                        <p className="font-semibold text-green-600 mt-1">
                                            Active
                                        </p>

                                    </div>

                                </div>


                                {/* Card Button */}
                                <Link
                                    to="/login"
                                    className="block text-center bg-gray-900 text-white py-3 rounded-lg mt-6 hover:bg-gray-800 transition"
                                >
                                    View Account
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= SERVICES SECTION ================= */}
            <section className="py-16 sm:py-20 bg-white">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Heading */}
                    <div className="text-center max-w-2xl mx-auto">

                        <p className="text-blue-600 font-semibold text-sm">
                            OUR SERVICES
                        </p>

                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
                            Everything you need
                        </h2>

                        <p className="text-gray-600 mt-4">
                            Simple tools to help you manage your money easily.
                        </p>

                    </div>


                    {/* Service Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12">


                        {/* Card 1 */}
                        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition">

                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
                                🔒
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900 mt-5">
                                Secure Banking
                            </h3>

                            <p className="text-gray-600 mt-3 leading-relaxed">
                                Keep your account and financial information
                                protected with secure banking practices.
                            </p>

                        </div>


                        {/* Card 2 */}
                        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition">

                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
                                💸
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900 mt-5">
                                Easy Transfers
                            </h3>

                            <p className="text-gray-600 mt-3 leading-relaxed">
                                Transfer money to another account quickly
                                and easily.
                            </p>

                        </div>


                        {/* Card 3 */}
                        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition">

                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">
                                📊
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900 mt-5">
                                Transaction History
                            </h3>

                            <p className="text-gray-600 mt-3 leading-relaxed">
                                View your account activity and keep track
                                of all your transactions.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= CTA SECTION ================= */}
            <section className="bg-blue-600 py-16 sm:py-20">

                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">

                    <h2 className="text-3xl sm:text-4xl font-bold text-white">
                        Ready to start banking?
                    </h2>

                    <p className="text-blue-100 mt-4 text-base sm:text-lg">
                        Create your account and start managing your money
                        with ease.
                    </p>

                    <Link
                        to="/register"
                        className="inline-block mt-8 bg-white text-blue-600 px-7 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                    >
                        Create Account
                    </Link>

                </div>

            </section>


            {/* ================= FOOTER ================= */}
            <footer className="bg-gray-900 text-gray-400 py-8">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                    <p className="text-sm sm:text-base">
                        © 2026 SecureBank. All rights reserved.
                    </p>

                </div>

            </footer>

        </div>
    );
}

export default Home;