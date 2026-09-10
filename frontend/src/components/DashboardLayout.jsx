import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/api";
function DashboardMenu({ onLogout }) {
    return (
        <>
            <Link
                to="/dashboard"
                className="block px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
            >
                Dashboard
            </Link>

            <Link
                to="/transfer"
                className="block px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
            >
                Transfer Money
            </Link>

            <Link
                to="/transactions"
                className="block px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
            >
                Transactions
            </Link>

            <Link
                to="/profile"
                className="block px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
            >
                Profile
            </Link>

            {/* Logout */}
            <button
                onClick={onLogout}
                className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition"
            >
                Logout
            </button>
        </>
    );
}

function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            logout();
            setIsSidebarOpen(false);
            navigate("/login");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Mobile Top Bar */}
            <div className="md:hidden bg-white shadow-sm px-4 py-4 flex items-center justify-between">
                <h1 className="text-xl font-bold text-blue-600">
                    MyBank
                </h1>

                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="text-2xl"
                >
                    ☰
                </button>
            </div>

            {/* Mobile Sidebar */}
            {isSidebarOpen && (
                <div className="md:hidden bg-white shadow-md p-4">
                    <div className="mb-4">
                        <p className="font-semibold">
                            {user?.name || "User"}
                        </p>

                        <p className="text-sm text-gray-500">
                            {user?.email || ""}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <DashboardMenu onLogout={handleLogout} />
                    </div>
                </div>
            )}

            <div className="flex">

                {/* Desktop Sidebar */}
                <aside className="hidden md:block w-64 bg-white min-h-screen shadow-md p-6">

                    <h1 className="text-2xl font-bold text-blue-600 mb-8">
                        MyBank
                    </h1>

                    <div className="mb-8">
                        <p className="font-semibold">
                            {user?.name || "User"}
                        </p>

                        <p className="text-sm text-gray-500 break-all">
                            {user?.email || ""}
                        </p>
                    </div>

                    <nav className="space-y-2">
                        <DashboardMenu onLogout={handleLogout} />
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1">

                    {/* Desktop Header */}
                    <header className="hidden md:flex bg-white shadow-sm px-8 py-5 items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                Banking Dashboard
                            </h2>

                            <p className="text-gray-500">
                                Welcome back, {user?.name || "User"}!
                            </p>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </header>

                    {/* Page Content */}
                    <div className="p-4 sm:p-6 md:p-8">
                        {children}
                    </div>

                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;