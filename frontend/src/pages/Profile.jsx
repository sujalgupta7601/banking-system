import { useState } from "react";
import { upload } from "@imagekit/javascript";
import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { updateProfile, getImageKitAuth, } from "../services/api";
function Profile() {
    const { user: loggedInUser, updateUser } = useAuth();

    const [user, setUser] = useState({
        name: loggedInUser?.name || "",
        email: loggedInUser?.email || "",
        profileImage: loggedInUser?.profileImage || "",
        phone: "9876543210",
        accountNumber: "4821",
        accountType: "Savings Account",
    });

    // Controls whether we are editing the profile
    const [isEditing, setIsEditing] = useState(false);

    // Stores success message
    const [success, setSuccess] = useState("");


    // Runs when user changes an input
    const handleChange = (e) => {

        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value,
        });

        setSuccess("");
    };
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) {
            return;
        }

        try {
            const authData = await getImageKitAuth();

            const result = await upload({
                file,
                fileName: file.name,
                token: authData.token,
                signature: authData.signature,
                expire: authData.expire,
                publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
            });

            setUser((previousUser) => ({
                ...previousUser,
                profileImage: result.url,
            }));

        } catch (error) {
            console.error("Image upload error:", error);
            console.error("ImageKit error details:", error?.message);

            alert("Unable to upload image.");
        }
    };
    // Runs when user clicks Save Changes
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSuccess("");
            console.log("Profile image before save:", user.profileImage);
            const response = await updateProfile({
                name: user.name,
                email: user.email,
                profileImage: user.profileImage,
            });

            console.log("Profile update response:", response);
            console.log("Profile image from response:", response.user.profileImage);

            setUser((previousUser) => ({
                ...previousUser,
                name: response.user.name,
                email: response.user.email,
                profileImage: response.user.profileImage,
            }));

            updateUser(response.user);

            setIsEditing(false);

            setSuccess(
                response.message || "Profile updated successfully."
            );
        } catch (error) {
            console.error("Profile update error:", error);

            setSuccess("");

            alert(
                error.message ||
                "Unable to update profile."
            );
        }
    };

    return (
        <DashboardLayout>

            {/* ================= PAGE HEADING ================= */}

            <div className="mb-8">

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    My Profile
                </h1>

                <p className="text-gray-500 mt-2">
                    View and manage your personal account information.
                </p>

            </div>


            {/* ================= SUCCESS MESSAGE ================= */}

            {success && (

                <div
                    role="status"
                    className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm"
                >
                    {success}
                </div>

            )}


            {/* ================= PROFILE ================= */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


                {/* ================= PROFILE CARD ================= */}

                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

                    <div className="flex flex-col items-center text-center">

                        {/* Profile Avatar */}

                        <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold">
                            {user.profileImage ? (
                                <img
                                    src={user.profileImage}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                user.name.charAt(0).toUpperCase()
                            )}
                        </div>


                        <h2 className="text-xl font-semibold text-gray-900 mt-4">
                            {user.name}
                        </h2>


                        <p className="text-sm text-gray-500 mt-1">
                            Customer
                        </p>


                        <div className="w-full border-t border-gray-200 my-6"></div>


                        {/* Account Information */}

                        <div className="w-full text-left space-y-4">

                            <div>

                                <p className="text-xs text-gray-500">
                                    Account Number
                                </p>

                                <p className="font-semibold text-gray-800 mt-1">
                                    •••• {user.accountNumber}
                                </p>

                            </div>


                            <div>

                                <p className="text-xs text-gray-500">
                                    Account Type
                                </p>

                                <p className="font-semibold text-gray-800 mt-1">
                                    {user.accountType}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ================= PERSONAL INFORMATION ================= */}

                <div className="lg:col-span-2">

                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">

                        <div className="flex items-center justify-between mb-6">

                            <div>

                                <h2 className="text-xl font-semibold text-gray-900">
                                    Personal Information
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Your registered account details.
                                </p>

                            </div>


                            {!isEditing && (

                                <button
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                                >
                                    Edit Profile
                                </button>

                            )}

                        </div>


                        {/* ================= FORM ================= */}

                        <form onSubmit={handleSubmit}>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">


                                {/* Name */}

                                <div>

                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Full Name
                                    </label>

                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={user.name}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={`w-full px-4 py-3 border rounded-lg outline-none transition ${isEditing
                                            ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            : "border-gray-200 bg-gray-50 text-gray-600"
                                            }`}
                                    />

                                </div>


                                {/* Email */}

                                <div>

                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Email Address
                                    </label>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={`w-full px-4 py-3 border rounded-lg outline-none transition ${isEditing
                                            ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            : "border-gray-200 bg-gray-50 text-gray-600"
                                            }`}
                                    />

                                </div>
                                {/* Profile Image */}

                                {/* Profile Image */}

                                <div>
                                    <label
                                        htmlFor="profileImage"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Profile Photo
                                    </label>

                                    <input
                                        id="profileImage"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white"
                                    />

                                    <p className="text-xs text-gray-500 mt-2">
                                        Select an image from your computer.
                                    </p>
                                </div>

                                {/* Phone */}

                                <div>

                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Phone Number
                                    </label>

                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={user.phone}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={`w-full px-4 py-3 border rounded-lg outline-none transition ${isEditing
                                            ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            : "border-gray-200 bg-gray-50 text-gray-600"
                                            }`}
                                    />

                                </div>


                                {/* Account Number */}

                                <div>

                                    <label
                                        htmlFor="accountNumber"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Account Number
                                    </label>

                                    <input
                                        id="accountNumber"
                                        name="accountNumber"
                                        type="text"
                                        value={`•••• ${user.accountNumber}`}
                                        disabled
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 outline-none"
                                    />

                                </div>


                                {/* Account Type */}

                                <div>

                                    <label
                                        htmlFor="accountType"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Account Type
                                    </label>

                                    <input
                                        id="accountType"
                                        name="accountType"
                                        type="text"
                                        value={user.accountType}
                                        disabled
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 outline-none"
                                    />

                                </div>

                            </div>


                            {/* ================= SAVE / CANCEL ================= */}

                            {isEditing && (

                                <div className="flex flex-col sm:flex-row gap-3 mt-8">

                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                                    >
                                        Save Changes
                                    </button>


                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                                    >
                                        Cancel
                                    </button>

                                </div>

                            )}

                        </form>

                    </div>

                </div>

            </div>


            {/* ================= SECURITY CARD ================= */}

            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6">

                <div className="flex gap-4">

                    <div className="text-xl">
                        🔒
                    </div>

                    <div>

                        <h3 className="font-semibold text-blue-900">
                            Keep Your Account Secure
                        </h3>

                        <p className="text-sm text-blue-700 mt-1 leading-relaxed">
                            Never share your password, OTP, PIN, or banking
                            information with anyone.
                        </p>

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default Profile;