import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getTransactions } from "../services/api";

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getTransactions();

                console.log("Transactions response:", response);

                setTransactions(response.transactions || []);
            } catch (error) {
                console.error("Loading transactions error:", error);

                setError(
                    error.message ||
                    "Unable to load transactions."
                );
            } finally {
                setLoading(false);
            }
        };

        loadTransactions();
    }, []);

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Transactions
                </h1>

                <p className="text-gray-500 mt-1">
                    View your transaction history.
                </p>
            </div>

            {error && (
                <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-6">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="bg-white rounded-2xl shadow p-8 text-center">
                    <p className="text-gray-500">
                        Loading transactions...
                    </p>
                </div>
            ) : transactions.length === 0 ? (
                <div className="bg-white rounded-2xl shadow p-8 text-center">
                    <p className="text-gray-500">
                        No transactions found.
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="text-left px-6 py-4 text-gray-600">
                                        Transaction ID
                                    </th>

                                    <th className="text-left px-6 py-4 text-gray-600">
                                        From Account
                                    </th>

                                    <th className="text-left px-6 py-4 text-gray-600">
                                        To Account
                                    </th>

                                    <th className="text-left px-6 py-4 text-gray-600">
                                        Amount
                                    </th>

                                    <th className="text-left px-6 py-4 text-gray-600">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {transactions.map((transaction) => (
                                    <tr
                                        key={transaction._id}
                                        className="border-t"
                                    >
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {transaction._id}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {transaction.fromAccount}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {transaction.toAccount}
                                        </td>

                                        <td className="px-6 py-4 font-semibold">
                                            ₹
                                            {Number(
                                                transaction.amount
                                            ).toLocaleString("en-IN")}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                                                {transaction.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}

export default Transactions;