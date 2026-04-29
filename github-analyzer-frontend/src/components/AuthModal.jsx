import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

function AuthModal({ onClose, onSuccess }) {

  const handleSuccess = async (credentialResponse) => {
    try {
      // ✅ Use environment variable instead of localhost
      const API = import.meta.env.VITE_API_URL;

      // 🔥 Send token to backend
      const res = await axios.post(
        `${API}/api/auth/google`,
        {
          token: credentialResponse.credential,
        }
      );

      // ✅ Save JWT + user from backend
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      onSuccess(res.data.user);
      onClose();

    } catch (err) {
      console.error(err);
      alert("Authentication failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">

        <h2 className="text-xl font-bold mb-4">
          Login Required 🔐
        </h2>

        <p className="text-sm text-gray-500 mb-4">
          Please login to continue
        </p>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => alert("Google Login Failed")}
          />
        </div>

        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 hover:underline"
        >
          Cancel
        </button>

      </div>
    </div>
  );
}

export default AuthModal;