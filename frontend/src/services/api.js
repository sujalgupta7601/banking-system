
const API_BASE_URL = "https://banking-system-usf3.onrender.com";

async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem("token");

    // Prevent duplicate slashes in the URL
    const url = `${API_BASE_URL.replace(/\/+$/, "")}/${endpoint.replace(/^\/+/, "")}`;

    const headers = {
        ...(options.headers || {}),
    };

    // Add JSON content type when sending JSON
    if (options.body && !(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }

    // Attach JWT for protected requests
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers,
        credentials: "include",
    });

    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
        ? await response.json()
        : null;

    if (!response.ok) {
        throw new Error(
            data?.message || `Request failed with status ${response.status}`
        );
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