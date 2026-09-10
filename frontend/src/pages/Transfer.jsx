import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import {
    getAccounts,
    getAccountBalance,
    createTransaction,
} from "../services/api";

function Transfer() {
    const [accounts, setAccounts] = useState([]);
    const [balance, setBalance] = useState(0);

    const [formData, setFormData] = useState({
        toAccount: "",
        amount: "",
        description: "",
    });

    const [loadingAccounts, setLoadingAccounts] = useState(true);
    const [loadingTransfer, setLoadingTransfer] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Load user's accounts
    useEffect(() => {
        const loadAccounts = async () => {
            try {
                setLoadingAccounts(true);
                setError("");

                const response = await getAccounts();

                console.log("Transfer accounts response:", response);

                const userAccounts = response.accounts || [];

                setAccounts(userAccounts);

                // Get balance of the first account
                if (userAccounts.length > 0) {
                    const accountId = userAccounts[0]._id;

                    const balanceResponse =
                        await getAccountBalance(accountId);

                    console.log(
                        "Transfer balance response:",
                        balanceResponse
                    );

                    setBalance(
                        Number(balanceResponse.balance || 0)
                    );

                    // Automatically select sender account
                    setFormData((previous) => ({
                        ...previous,
                        fromAccount: accountId,
                    }));
                }
            } catch (error) {
                console.error("Loading accounts error:", error);

                setError(
                    error.message ||
                    "Unable to load account information."
                );
            } finally {
                setLoadingAccounts(false);
            }
        };

        loadAccounts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError("");
        setSuccess("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        // Check sender account
        if (!formData.fromAccount) {
            setError("Sender account not found.");
            return;
        }

        // Check receiver account
        if (!formData.toAccount) {
            setError("Please enter the receiver account ID.");
            return;
        }

        // Check amount
        if (!formData.amount || Number(formData.amount) <= 0) {
            setError("Please enter a valid amount.");
            return;
        }

        // Convert amount to number
        const amount = Number(formData.amount);

        // Check balance on frontend
        if (amount > balance) {
            setError(
                `Insufficient balance. Your current balance is ₹${balance.toLocaleString(
                    "en-IN"
                )}.`
            );
            return;
        }

        // Prevent transferring to yourself
        if (formData.fromAccount === formData.toAccount) {
            setError("You cannot transfer money to your own account.");
            return;
        }

        try {
            setLoadingTransfer(true);

            // Generate unique idempotency key
            const idempotencyKey =
                `${Date.now()}-${Math.random()
                    .toString(36)
                    .substring(2, 12)}`;

            const transactionData = {
                fromAccount: formData.fromAccount,
                toAccount: formData.toAccount,
                amount: amount,
                idempotencyKey: idempotencyKey,
            };

            console.log(
                "Sending transaction:",
                transactionData
            );

            const response =
                await createTransaction(transactionData);

            console.log(
                "Transaction response:",
                response
            );

            setSuccess(
                response.message ||
                "Transaction completed successfully."
            );

            // Clear form
            setFormData((previous) => ({
                ...previous,
                toAccount: "",
                amount: "",
                description: "",
            }));

            // Refresh balance
            const balanceResponse =
                await getAccountBalance(
                    formData.fromAccount
                );

            setBalance(
                Number(balanceResponse.balance || 0)
            );

        } catch (error) {
            console.error(
                "Transaction error:",
                error
            );

            setError(
                error.message ||
                "Transaction failed. Please try again."
            );
        } finally {
            setLoadingTransfer(false);
        }
    };

    return (
        <DashboardLayout>

            {/* Heading */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Transfer Money
                </h1>

                <p className="text-gray-500 mt-1">
                    Send money securely to another account.
                </p>
            </div>

            {/* Current Balance */}
            <div className="bg-white rounded-2xl shadow p-6 mb-6">
                <p className="text-gray-500">
                    Available Balance
                </p>

                <h2 className="text-3xl font-bold text-green-600 mt-2">
                    ₹{balance.toLocaleString("en-IN")}
                </h2>
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-6">
                    {error}
                </div>
            )}

            {/* Success */}
            {success && (
                <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
                    {success}
                </div>
            )}

            {/* Loading Accounts */}
            {loadingAccounts ? (
                <div className="bg-white rounded-2xl shadow p-8 text-center">
                    <p className="text-gray-500">
                        Loading account information...
                    </p>
                </div>
            ) : accounts.length === 0 ? (
                <div className="bg-white rounded-2xl shadow p-8 text-center">
                    <p className="text-gray-500">
                        No bank account found.
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow p-6">

                    <form onSubmit={handleSubmit}>

                        {/* Sender Account */}
                        <div className="mb-5">
                            <label className="block text-gray-700 font-medium mb-2">
                                From Account
                            </label>

                            <input
                                type="text"
                                value={formData.fromAccount}
                                disabled
                                className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-3 text-gray-600"
                            />
                        </div>

                        {/* Receiver Account */}
                        <div className="mb-5">
                            <label className="block text-gray-700 font-medium mb-2">
                                Receiver Account ID
                            </label>

                            <input
                                type="text"
                                name="toAccount"
                                value={formData.toAccount}
                                onChange={handleChange}
                                placeholder="Enter receiver account ID"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Amount */}
                        <div className="mb-5">
                            <label className="block text-gray-700 font-medium mb-2">
                                Amount
                            </label>

                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                placeholder="Enter amount"
                                min="1"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-2">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Optional description"
                                rows="3"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Transfer Button */}
                        <button
                            type="submit"
                            disabled={loadingTransfer}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loadingTransfer
                                ? "Processing Transfer..."
                                : "Transfer Money"}
                        </button>

                    </form>
                </div>
            )}

        </DashboardLayout>
    );
}

export default Transfer;