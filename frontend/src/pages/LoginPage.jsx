// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { authApi } from "../api";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { toast } from "react-toastify";

// export default function LoginPage() {
//   // State variables for email, password, and error message
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   // Access the login function from AuthContext
//   const { login } = useContext(AuthContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await authApi.post("/login", { email, password });
//       if (!response.data.token || !response.data.user) {
//         throw new Error("Invalid token or user data in response");
//       }
//       localStorage.setItem("token", response.data.token);
//       // After successful login
//       login(response.data.user, response.data.token);
//       toast.success("Login successful!");
//       navigate("/home"); // Redirect to Home or Dashboard
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//       toast.error(err.response?.data?.message || "Login failed");
//     } finally {
//     setLoading(false);
//   }
//   };

//   return (
//     <div className="w-full flex items-center justify-center px-4 py-4 mt-8 mb-8 mr-16 rounded-xl bg-gray-200">
//       <div className="w-full max-w-md px-10 py-6 space-y-6 bg-white rounded-xl shadow-lg">
//         <h2 className="text-center text-2xl font-bold text-gray-800">
//           Login
//         </h2>

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           {error && <p className="text-red-600 text-sm text-center">{error}</p>}
//           <div className="rounded-md -space-y-px">
//             <div className="mb-4 text-left">
//               <label className="block text-sm font-medium text-gray-800 pb-2">
//                 Email address
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               />
//             </div>
//             <div className="text-left">
//               <label className="block text-sm font-medium text-gray-800 pb-2">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               />
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <label className="flex items-center text-sm">
//               <input
//                 type="checkbox"
//                 className="h-3 w-3 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//               />
//               <span className="ml-2 text-gray-800">Remember me</span>
//             </label>
//             <div className="text-sm">
//               <a
//                 href="#"
//                 className="font-medium text-indigo-600 hover:text-indigo-500"
//               >
//                 Forgot password?
//               </a>
//             </div>
//           </div>

//           {loading ? (
//             <button
//               type="button"
//               disabled
//               className="w-full flex justify-center items-center py-2 px-4 rounded bg-indigo-400 text-white cursor-not-allowed"
//             >
//               <svg
//                 className="animate-spin h-5 w-5 text-white mr-2"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 />
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8v8z"
//                 />
//               </svg>
//               Loading...
//             </button>
//           ) : (
//             <button
//               type="submit"
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
//             >
//               Sign in
//             </button>
//           )}

//           {/* <div className="mt-6 flex items-center justify-between">
//             <hr className="w-1/4 border-gray-300" />
//             <span className="px-2 text-gray-600 text-sm">Or continue with</span>
//             <hr className="w-1/4 border-gray-300" />
//           </div> */}

//           {/* <div className="flex space-x-4">
//             <button
//               type="button"
//               className="w-full flex justify-center items-center py-2 px-4 border rounded-md text-sm font-medium text-gray-800 bg-gray-100 hover:bg-gray-100"
//             >
//               <img
//                 src="https://www.svgrepo.com/show/475656/google-color.svg"
//                 className="w-5 h-5 mr-2"
//                 alt="Google"
//               />
//               Google
//             </button>
//             <button
//               type="button"
//               className="w-full flex justify-center items-center py-2 px-4 border rounded-md text-sm font-medium text-gray-800 bg-gray-100 hover:bg-gray-100"
//             >
//               <svg
//                 className="w-5 h-5 mr-2"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M12 .5C5.73.5.5 5.73.5 12S5.73 23.5 12 23.5 23.5 18.27 23.5 12 18.27.5 12 .5zm.36 17.83h-2.54v-6.83h2.54v6.83zm-1.27-7.79c-.81 0-1.34-.57-1.34-1.29s.54-1.3 1.35-1.3c.81 0 1.34.57 1.35 1.3-.01.72-.54 1.29-1.36 1.29z" />
//               </svg>
//               GitHub
//             </button>
//           </div> */}

//           <p className="mt-6 text-center text-sm text-gray-600">
//             Don't have an account?{" "}
//             <a
//               href="/signup"
//               className="font-medium text-indigo-600 hover:text-indigo-500"
//             >
//               Sign Up
//             </a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }


import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authApi.post("/login", { email, password });
      if (!response.data.token || !response.data.user) {
        throw new Error("Invalid token or user data in response");
      }
      localStorage.setItem("token", response.data.token);
      login(response.data.user, response.data.token);
      toast.success("Login successful!");
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Rectangle Card */}
      <div className="w-full max-w-5xl h-[440px] flex shadow-xl overflow-hidden bg-white">
        {/* Left Side */}
        <div className="w-1/2 bg-gray-900 text-white gap-1 flex flex-col justify-center items-center p-6">
          <h1 className="text-4xl font-bold mb-2">Blogify</h1>
          <p className="text-xl font-medium mb-2">Login to your account</p>
          <p className="text-sm text-gray-300">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
          <p className="text-xs text-gray-500 mt-10">
            © {new Date().getFullYear()} Blogify.com, All rights reserved
          </p>
        </div>

        {/* Right Side Form */}
        <div className="w-1/2 flex items-center justify-center p-10">
          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              Welcome Back 👋
            </h2>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div>
              <label className="block font-semibold text-sm text-gray-700 mb-1 text-left">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-sm text-gray-700 mb-1 text-left">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-xs text-gray-500 text-center mt-2">
              By continuing, you agree to Blogify's{" "}
              <a href="#" className="underline">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

