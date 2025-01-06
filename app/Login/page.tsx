"use client";

import useRequest from "@/utils/useRequest";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BASE_URL } from "@/constants/baseUrl";

const LoginPage: React.FC = () => {
  const {
    loading: isLoggingIn,
    error: loginError,
    execute: login,
  } = useRequest<string, any>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (
    e: React.FormEvent,
    typeLogin: "etudiant" | "entreprise"
  ) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    const body = {
      email: typeLogin === "etudiant" ? email : emailG,
      password: typeLogin === "etudiant" ? password : passwordG,
    };

    await login(`${BASE_URL}/login`, {
      method: "POST",
      data: body,
      onSuccess: (data) => {
        localStorage.setItem("token", data);
        router.push(`/${typeLogin}`);
      },
      onError: (error) => {
        setError(error.message || "Une erreur s'est produite.");
      },
    });
  };

  // -------------
  // Gestionnaire
  const [emailG, setEmailG] = useState("");
  const [passwordG, setPasswordG] = useState("");
  const [rememberMeG, setRememberMeG] = useState(false);
  const [errorG, setErrorG] = useState("");

  const handleSubmitG = async (
    e: React.FormEvent,
    typeLogin: "etudiant" | "entreprise"
  ) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    const body = {
      email: typeLogin === "etudiant" ? email : emailG,
      password: typeLogin === "etudiant" ? password : passwordG,
    };

    await login(`${BASE_URL}/login`, {
      method: "POST",
      data: body,
      onSuccess: (data) => {
        localStorage.setItem("token", data);
        router.push(`/${typeLogin}`);
      },
      onError: (error) => {
        setError(error.message || "Une erreur s'est produite.");
      },
    });
  };

  return (
    <div className="grid grid-cols-2 ">
      <div>
        <main className="overflow-hidden">
          <div className="flex items-center justify-center min-h-screen bg-green-800/50">
            <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
              {/* Left side */}
              <div className="flex flex-col justify-center p-4">
                <h1 className="text-4xl font-bold mb-2">Welcome back</h1>
                <p className="text-gray-400 font-light mb-4">
                  Please enter your details to log in.
                </p>

                {error && (
                  <div className="bg-red-500 text-white p-2 mb-4 rounded">
                    {error}
                  </div>
                )}

                <form
                  onSubmit={(e) => handleSubmit(e, "etudiant")}
                  className="space-y-4"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2 border rounded mt-1"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-2 border rounded mt-1"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="mr-2"
                    />
                    <label htmlFor="rememberMe">Remember me</label>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className={`w-full p-2 text-white bg-green-600 rounded hover:bg-green-700 ${
                      isLoggingIn ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoggingIn ? "Logging in..." : "Login"}
                  </button>
                </form>
              </div>
              {/* Add your right-side content here */}
            </div>
          </div>
        </main>
      </div>
      <div>
        <main className="overflow-hidden">
          <div className="flex items-center justify-center min-h-screen bg-blue-800/50">
            <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
              {/* Left side */}
              <div className="flex flex-col justify-center p-4">
                <h1 className="text-4xl font-bold mb-2">Welcome back</h1>
                <p className="text-gray-400 font-light mb-4">
                  Please enter your details to log in.
                </p>

                {errorG && (
                  <div className="bg-red-500 text-white p-2 mb-4 rounded">
                    {errorG}
                  </div>
                )}

                <form
                  onSubmit={(e) => handleSubmitG(e, "entreprise")}
                  className="space-y-4"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="emailG"
                      value={emailG}
                      onChange={(eg) => setEmailG(eg.target.value)}
                      className="w-full p-2 border rounded mt-1"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="passwordG"
                      value={passwordG}
                      onChange={(eg) => setPasswordG(eg.target.value)}
                      className="w-full p-2 border rounded mt-1"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rememberMeG"
                      checked={rememberMeG}
                      onChange={() => setRememberMeG(!rememberMeG)}
                      className="mr-2"
                    />
                    <label htmlFor="rememberMe">Remember me</label>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className={`w-full p-2 text-white bg-green-600 rounded hover:bg-green-700 ${
                      isLoggingIn ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoggingIn ? "Logging in..." : "Login"}
                  </button>
                </form>
              </div>
              {/* Add your right-side content here */}
            </div>
          </div>
        </main>
      </div>
    </div>

    // respo and tuteur login
  );
};

export default LoginPage;
