import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import Logo from "../logo/Logo";
import { auth } from "../../firebase/firebase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setErrorMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Please check your inbox.");
      setTimeout(() => navigate("/login"), 5000);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="absolute top-4 left-4">
        <Logo />
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-blue900">
            Reset your password
          </h2>
          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-blue700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue500 focus:border-blue500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-500"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue500`}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </form>
          {message && (
            <p className="mt-4 text-green-600 text-center">{message}</p>
          )}
          {errorMessage && (
            <p className="mt-4 text-blue600 text-center">{errorMessage}</p>
          )}
          <p className="mt-6 text-center text-sm text-blue500">
            Remembered your password?{" "}
            <Link
              to="/login"
              className="font-medium text-blue600 hover:text-blue500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
