"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter(); // For redirection

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Fetch data from the JSON file
      const response = await fetch("/db/etudiant_full.json");
      if (!response.ok) {
        throw new Error("Failed to load data");
      }

      const usersData = await response.json();

      // Find the user by email and password
      const userFound = usersData.find(
        (user: { email: string; password: string }) =>
          user.email === email && user.password === password
      );

      if (userFound) {
        // Log the id_etudiant to the console
        console.log(userFound.id_etudiant);
        // Client-side redirect using useRouter
        router.push(`/etudiant/${userFound.id_etudiant}`);
      } else {
        setError("Invalid email or password");
      }
    } catch (err: unknown) {
      // Type assertion for unknown error
      if (err instanceof Error) {
        setError(err.message || "An error occurred. Please try again later.");
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  // -------------
  // Gestionnaire
  const [emailG, setEmailG] = useState("");
  const [passwordG, setPasswordG] = useState("");
  const [rememberMeG, setRememberMeG] = useState(false);
  const [loadingG, setLoadingG] = useState(false);
  const [errorG, setErrorG] = useState("");

  const handleSubmitG = async (eg: React.FormEvent) => {
    eg.preventDefault();

    if (!emailG || !passwordG) {
      setErrorG("Please fill in both email and password.");
      return;
    }

    setErrorG("");
    setLoadingG(true);

    try {
      // Fetch data from the JSON file
      const response = await fetch("/db/gestionnaire_entreprise_full.json");
      if (!response.ok) {
        throw new Error("Failed to load data");
      }

      const gestionnairesData = await response.json();

      // Find the user by email and password
      const gestionnairesFound = gestionnairesData.find(
        (user: { email: string; password: string }) =>
          user.email === emailG && user.password === passwordG
      );

      if (gestionnairesFound) {
        // Log the id_etudiant to the console
        console.log(gestionnairesFound.id_etudiant);
        // Client-side redirect using useRouter
        router.push(`/entreprise/${gestionnairesFound.id_gest_entr}`);
      } else {
        setErrorG("Invalid email or password");
      }
    } catch (err: unknown) {
      // Type assertion for unknown error
      if (err instanceof Error) {
        setErrorG(err.message || "An error occurred. Please try again later.");
      } else {
        setErrorG("An unknown error occurred.");
      }
    } finally {
      setLoadingG(false);
    }
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

                <form onSubmit={handleSubmit} className="space-y-4">
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
                    disabled={loading}
                    className={`w-full p-2 text-white bg-green-600 rounded hover:bg-green-700 ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? "Logging in..." : "Login"}
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

                <form onSubmit={handleSubmitG} className="space-y-4">
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
                    disabled={loadingG}
                    className={`w-full p-2 text-white bg-green-600 rounded hover:bg-green-700 ${
                      loadingG ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loadingG ? "Logging in..." : "Login"}
                  </button>
                </form>
              </div>
              {/* Add your right-side content here */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LoginPage;
