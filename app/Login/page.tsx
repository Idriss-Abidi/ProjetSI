"use client";

import useRequest from "@/utils/useRequest";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
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
  const [typeLogin, setTypeLogin] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false); // State to check if it's a client-side render

  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Set isClient to true once component is mounted on the client-side
  }, []);

  // Redirect when typeLogin changes
  useEffect(() => {
    if (isClient && typeLogin) {
      router.push(`/${typeLogin}`);
    }
  }, [typeLogin, isClient, router]);

  const handleSubmit = async (e: React.FormEvent) => {
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
      },
      onError: (error) => {
        setError(error.message || "Une erreur s'est produite.");
      },
    });

    // Handle response on success
    if (loginError) {
      setError(loginError.message || "Une erreur s'est produite.");
    } else {
      // Fetch user data after login
      const userResponse = await fetch(`${BASE_URL}/user-info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!userResponse.ok) {
        setError("Failed to fetch user data.");
        return;
      }

      const userData = await userResponse.json();

      // Set the userType and the corresponding page to redirect to
      switch (userData.user.userType) {
        case "RESPO_STAGE":
          setTypeLogin("respo");
          break;
        case "ADMIN_ECOLE":
          setTypeLogin("ecole");
          break;
        case "ETUDIANT":
          setTypeLogin("etudiant");
          break;
        case "GEST_ENTRE":
          setTypeLogin("entreprise");
          break;
        case "TUTEUR":
          setTypeLogin("tuteur");
          break;
        default:
          setError("Unknown user type.");
          return;
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "rgb(168, 203, 202)" }}
    >
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* Left side */}
        <div className="flex flex-col justify-center p-4">
          <span className="mb-2 text-4xl font-bold">Bienvenue</span>
          <span className="font-light text-gray-400 mb-2">
            Bienvenue! Veuillez entrer vos coordonnées
          </span>

          {/* Form */}
          <form className="space-y-2" onSubmit={handleSubmit}>
            <div className="py-2">
              <label htmlFor="Email" className="mb-2 text-md">
                Email
              </label>
              <input
                type="email"
                name="Email"
                id="Email"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="py-2">
              <label htmlFor="Password" className="mb-2 text-md">
                Mot de Passe
              </label>
              <input
                type="password"
                name="Password"
                id="Password"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn w-full bg-[rgb(168,203,202)] text-white p-2 rounded-lg mb-2 hover:bg-white hover:text-[rgb(168,203,202)] hover:border hover:border-gray-900"
            >
              Se connecter
            </button>
          </form>
        </div>

        {/* Right side */}
        <div className="relative">
          <img
            src="/images/login/etudiant.jpg"
            alt="img"
            className="w-[333px] hidden rounded-r-2xl md:block object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
