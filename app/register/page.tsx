"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register(){

    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async  (e: any) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if(password != confirmPassword){
            return setError("Passwords do not match");
        }

        setLoading(true);

        try {
            const res = await fetch("/api/register",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if(!data.success){
                setError(data.message);
            }
            else{
                setSuccess("Account created Successfully 🎉");

                //redirect after 1.5 sec
                setTimeout(() => {
                    router.push("/login");
                }, 1500);

            };
            
        } catch (error) {
            setError("Something went wrong");
        }
        setLoading(false);
    };

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 ">
            
                {/* Form */}
                <form
                    onSubmit={handleRegister}
                    className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
                >
                        {/* Heading */}
                        <h2 className="text-3xl font-bold text-center dark:text-white">
                            Create Account
                        </h2>
                    {/* Name */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-gray-600 dark:text-gray-300">
                            Full Name
                        </label>
                        <input 
                            type="text"
                            placeholder="Enter your name" 
                            className="w-full px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-gray-600 dark:text-gray-300">
                            Email
                        </label>
                        <input 
                            type="email"
                            placeholder="Enter your Email"
                            className="w-full px-4 py-2  border rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-gray-600 dark:text-gray-300">
                            Password
                        </label>
                        <div className="relative">
                        <input 
                            type= "password"
                            placeholder="Enter Password"
                            className="w-full px-4 py-2  border rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        
                        </div>
                        
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-gray-600 dark:text-gray-300">
                            Confirm Password
                        </label>
                        <input 
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full px-4 py-2 text-sm border rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}
                    {/* Success */}
                    {success && (
                        <p className="text-green-500 text-sm">{success}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full py-2 mt-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
                    >
                        {loading ? "Creating account..." : "Register"}
                    </button>

                    {/* Footer */}
                    <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
                        Already have an account{" "}
                        <Link href="/login" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </p>

                </form>

                

            </div>
    )
}