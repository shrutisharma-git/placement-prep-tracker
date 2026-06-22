"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {

  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e : any ) =>{ 
    e.preventDefault(); // maine git hub per push bhi kr diya
    setLoading(true);
    setError("");
    setSuccess("");

    try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type" : "application/json",
          },
          body: JSON.stringify({ email, password}),
        });

        const data = await res.json();
        console.log(data);

      if(!data.success){ // false value pe set krega error
        setError(data.message);
      }
      else{
        
        setSuccess(data.message);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/dashboard");
      }

    } catch (e) {
      setError("Something went wrong:");
      console.log(e);
    }finally{
      console.log(error);
      console.log(success);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg 
      
      bg-white dark:bg-gray-800">
        
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-6 
        text-gray-800 dark:text-white">
          Login
        </h2>
        {/* {<p className="text-red-500">{error}</p>} */}
        {/* Form */}
        <form
          onSubmit={handleLogin} 
          className="space-y-4">

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm 
            text-gray-600 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg border 
              border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-700 
              text-black dark:text-white 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm 
            text-gray-600 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg border 
              border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-700 
              text-black dark:text-white 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* ✅ Error */}
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg 
            bg-blue-600 hover:bg-blue-700 
            text-white font-semibold transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-4 
        text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}