const API_BASE_URL = "https://banking-system-usf3.onrender.com";


// ===============================
// Generic API Request
// ===============================

async function apiRequest(endpoint, options = {}) {

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,

        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },

        // Important for authentication cookies
        credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
}


// ===============================
// AUTH APIs
// ===============================

export async function registerUser(userData) {
    return apiRequest("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
    });
}


export async function loginUser(userData) {
    return apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(userData),
    });
}


export async function logoutUser() {
    return apiRequest("/api/auth/logout", {
        method: "POST",
    });
}


// ===============================
// ACCOUNT APIs
// ===============================

export async function getAccounts() {
    return apiRequest("/api/accounts", {
        method: "GET",
    });
}


export async function createAccount() {
    return apiRequest("/api/accounts", {
        method: "POST",
    });
}

export async function updateProfile(userData) {
    return apiRequest("/api/auth/profile", {
        method: "PUT",
        body: JSON.stringify(userData),
    });
}

export async function getAccountBalance(accountId) {
    return apiRequest(`/api/accounts/balance/${accountId}`, {
        method: "GET",
    });
}



// ===============================
// TRANSACTION API
// ===============================

export async function createTransaction(transactionData) {
    return apiRequest("/api/transactions", {
        method: "POST",
        body: JSON.stringify(transactionData),
    });
}

export async function getTransactions() {
    return apiRequest("/api/transactions", {
        method: "GET",
    });
}

export async function getImageKitAuth() {
    return apiRequest("/api/auth/imagekit-auth", {
        method: "GET",
    });
}