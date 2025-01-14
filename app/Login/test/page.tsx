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
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<
    "etudiant" | "ecole" | "entreprise" | "tuteur"
  >("etudiant");

  const router = useRouter();

  const handleSubmit = async (
    e: React.FormEvent,
    typeLogin: "etudiant" | "entreprise" | "tuteur" | "ecole"
  ) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    const body = {
      email,
      password,
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
    <div className="flex items-center justify-center min-h-screen bg-green-100 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]">
      <div className="w-full max-w-[70%] p-6 bg-white rounded-xl shadow-lg grid grid-cols-3 gap-8">
        <div className="col-span-2 p-8">
          {/* Tabs */}
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => setActiveTab("etudiant")}
              className={`px-4 py-2 rounded-full ${
                activeTab === "etudiant"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Étudiant
            </button>
            <button
              onClick={() => setActiveTab("ecole")}
              className={`px-4 py-2 rounded-full ${
                activeTab === "ecole"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              École
            </button>
            <button
              onClick={() => setActiveTab("entreprise")}
              className={`px-4 py-2 rounded-full ${
                activeTab === "entreprise"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Entreprise
            </button>
            <button
              onClick={() => setActiveTab("tuteur")}
              className={`px-4 py-2 rounded-full ${
                activeTab === "tuteur"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Tuteur
            </button>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {["etudiant", "ecole", "entreprise", "tuteur"].map(
              (tab) =>
                activeTab === tab && (
                  <div
                    key={tab}
                    className={`p-6 ${
                      tab === "etudiant"
                        ? "bg-green-800/50"
                        : tab === "ecole"
                        ? "bg-green-800/50"
                        : tab === "entreprise"
                        ? "bg-blue-800/50"
                        : "bg-blue-800/50"
                    } rounded-xl shadow-lg`}
                  >
                    <h1 className="text-3xl font-bold mb-2 text-white">
                      Welcome back
                    </h1>
                    <p className="text-gray-300 font-light mb-4">
                      Please enter your details to log in.
                    </p>

                    {error && (
                      <div className="bg-red-500 text-white p-2 mb-4 rounded">
                        {error}
                      </div>
                    )}

                    <form
                      onSubmit={(e) =>
                        handleSubmit(
                          e,
                          tab as "etudiant" | "entreprise" | "tuteur" | "ecole"
                        )
                      }
                      className="space-y-4"
                    >
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-white"
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
                          className="block text-sm font-medium text-white"
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
                      {/* <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          checked={rememberMe}
                          onChange={() => setRememberMe(!rememberMe)}
                          className="mr-2"
                        /> */}
                      {/* <label htmlFor="rememberMe" className="text-white">
                          Remember me
                        </label> */}
                      {/* </div> */}
                      <button
                        type="submit"
                        disabled={isLoggingIn}
                        className={`w-full p-2 text-white ${
                          tab === "etudiant"
                            ? "bg-green-600 hover:bg-green-700"
                            : tab === "ecole"
                            ? "bg-green-600 hover:bg-green-700"
                            : tab === "entreprise"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-blue-600 hover:bg-blue-700"
                        } rounded mt-4 ${
                          isLoggingIn ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {isLoggingIn ? "Logging in..." : "Login"}
                      </button>
                    </form>
                  </div>
                )
            )}
          </div>
        </div>
        {/* Image Display */}
        <div className="flex justify-center items-center">
          <img
            src={`/images/login/${activeTab}.jpg`} // Assuming you have images in the /public/images directory
            alt={activeTab}
            className="drop-shadow-2xl rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
