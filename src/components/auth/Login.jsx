import { Link, useNavigate } from "react-router-dom";
import Logo from "../logo/Logo";
import { doSignInWithEmailAndPassword } from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";
import { useState } from "react";
import { getDatabase, ref, get } from "firebase/database";

export default function Login() {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isSigningIn) {
      setIsSigningIn(true);
      setErrorMessage("");
      try {
        const userCredential = await doSignInWithEmailAndPassword(
          email,
          password
        );
        const userId = userCredential.user.uid;
        const dbPath =
          role === "admin" ? `admins/${userId}` : `users/${userId}`;

        const db = getDatabase();
        const userRef = ref(db, dbPath);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          localStorage.setItem("userRole", role);
          navigate(role == "admin" ? "/admin/manage-admins" : "/home");
        } else {
          setErrorMessage(
            "Incorrect role selected. Please check your role selection."
          );
        }
      } catch (error) {
        console.error("Login error:", error);
        setErrorMessage(error.message);
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  return (
    <>
      <div className="relative min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="absolute top-4 left-4">
          <Logo />
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
            <h1 className="text-center text-3xl mb-3 font-bold leading-9 tracking-tight text-black">
              Fitness Tracker
            </h1>
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-black">
              Sign in to your account
            </h2>
            <form className="mt-6 space-y-6" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue500 focus:border-blue500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue500 focus:border-blue500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-black"
                >
                  Sign in as
                </label>
                <div className="mt-1">
                  <select
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue500 focus:border-blue500 sm:text-sm"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-blue800 hover:text-blue500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSigningIn}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isSigningIn
                      ? "bg-blue-600"
                      : "bg-blue-600 hover:bg-blue-800"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue600`}
                >
                  {isSigningIn ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>
            {errorMessage && (
              <p className="mt-4 text-blue600 text-center">{errorMessage}</p>
            )}
            <p className="mt-6 text-center text-sm text-black">
              Not a member?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue800 hover:text-blue500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
