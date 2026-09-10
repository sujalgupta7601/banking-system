
import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import {
    getAccounts,
    createAccount,
    getAccountBalance,
    getTransactions,
} from "../services/api";
import { Wallet, Landmark, IndianRupee, } from "lucide-react";
function Dashboard() {
    const { user } = useAuth();

    const [accounts, setAccounts] = useState([]);
    const [balances, setBalances] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadAccounts = async () => {
            try {
                setLoading(true);
                setError("");

                // Get existing accounts
                let response = await getAccounts();

                console.log("Accounts response:", response);

                let userAccounts = response.accounts || [];

                // If user has no account, create one
                if (userAccounts.length === 0) {
                    console.log("No account found. Creating account...");

                    const createResponse = await createAccount();

                    console.log(
                        "Create account response:",
                        createResponse
                    );

                    // Get accounts again after creation
                    response = await getAccounts();

                    console.log(
                        "Accounts after creation:",
                        response
                    );

                    userAccounts = response.accounts || [];
                }

                setAccounts(userAccounts);

                // Get balance for each account
                const balanceData = {};

                for (const account of userAccounts) {
                    const balanceResponse = await getAccountBalance(
                        account._id
                    );

                    balanceData[account._id] =
                        balanceResponse.balance || 0;
                }

                setBalances(balanceData);
                const transactionResponse = await getTransactions();

                setTransactions(
                    transactionResponse.transactions || []
                );

            } catch (error) {
                console.error("Dashboard error:", error);

                setError(
                    error.message ||
                    "Unable to load account information."
                );
            } finally {
                setLoading(false);
            }
        };

        loadAccounts();
    }, []);

    // Calculate total balance
    const totalBalance = accounts.reduce(
        (total, account) =>
            total + Number(balances[account._id] || 0),
        0
    );

    return (
        <DashboardLayout>

            {/* Page Heading */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Dashboard
                </h1>

                <p className="text-gray-500 mt-1">
                    Welcome back, {user?.name || "User"}!
                </p>
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-6">
                    {error}
                </div>
            )}

            {/* Loading */}
            {loading ? (
                <div className="bg-white rounded-2xl shadow p-8 text-center">
                    <p className="text-gray-500">
                        Loading account information...
                    </p>
                </div>
            ) : (
                <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

                        {/* Total Balance */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">
                                        Total Balance
                                    </p>

                                    <h2 className="text-3xl font-bold text-gray-800 mt-2">
                                        ₹{totalBalance.toLocaleString("en-IN")}
                                    </h2>
                                </div>

                                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                    <Wallet size={24} />
                                </div>
                            </div>

                            <p className="text-xs text-gray-400 mt-4">
                                Available balance across your accounts
                            </p>
                        </div>


                        {/* Total Accounts */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">
                                        Total Accounts
                                    </p>

                                    <h2 className="text-3xl font-bold text-gray-800 mt-2">
                                        {accounts.length}
                                    </h2>
                                </div>

                                <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                                    <Landmark size={24} />
                                </div>
                            </div>

                            <p className="text-xs text-gray-400 mt-4">
                                Bank accounts linked to your profile
                            </p>
                        </div>


                        {/* Currency */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">
                                        Currency
                                    </p>

                                    <h2 className="text-2xl font-bold text-gray-800 mt-2">
                                        {accounts.length > 0
                                            ? accounts[0].currency
                                            : "INR"}
                                    </h2>
                                </div>

                                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                                    <IndianRupee size={24} />
                                </div>
                            </div>

                            <p className="text-xs text-gray-400 mt-4">
                                Primary account currency
                            </p>
                        </div>

                    </div>

                    {/* Recent Transactions */}
                    <div className="bg-white rounded-2xl shadow p-6 mt-8">

                        <h2 className="text-xl font-bold text-gray-800 mb-6">
                            Recent Transactions
                        </h2>

                        {transactions.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500">
                                    No transactions found.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">

                                {transactions.slice(0, 5).map((transaction) => {

                                    const isReceived = accounts.some(
                                        (account) =>
                                            account._id === transaction.toAccount
                                    );

                                    return (
                                        <div
                                            key={transaction._id}
                                            className="border border-gray-200 rounded-xl p-4"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                                                <div>
                                                    <p className="font-semibold text-gray-800">
                                                        {isReceived
                                                            ? "Money Received"
                                                            : "Money Sent"}
                                                    </p>

                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {new Date(
                                                            transaction.createdAt
                                                        ).toLocaleDateString("en-IN")}
                                                    </p>
                                                </div>

                                                <p
                                                    className={`text-lg font-bold ${isReceived
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                        }`}
                                                >
                                                    {isReceived ? "+" : "-"}₹
                                                    {Number(
                                                        transaction.amount
                                                    ).toLocaleString("en-IN")}
                                                </p>

                                            </div>
                                        </div>
                                    );
                                })}

                            </div>
                        )}

                    </div>
                </>
            )}

        </DashboardLayout>
    );
}

export default Dashboard;