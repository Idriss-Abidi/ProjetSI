"use client";

import { BASE_URL } from "@/constants/baseUrl";
import useFetch from "@/utils/useFetch";
import { userId } from "@/utils/userId";
import React, { useState, useEffect } from "react";
import Image from "next/image"; // You can use next/image for optimized image rendering
import Footer from "@/components/Footer";
import NavbarTuteur from "@/components/tuteur/NavbarTuteur";

export default function TuteurLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const idTuteur = userId();
  const [loading, setLoading] = useState(true);

  const { data: dataTuteur } = useFetch(`${BASE_URL}/tuteur/${idTuteur}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    if (dataTuteur) {
      setLoading(false); // Set loading to false once data is fetched
    }
  }, [dataTuteur]);

  if (loading) {
    return (
      <div className="loading-screen">
        <Image
          src="/logo_app.png" // Replace with your logo path
          alt="Logo"
          width={200} // Adjust size as needed
          height={200} // Adjust size as needed
          className="logo-animation p-2"
        />
      </div>
    );
  }

  return (
    <>
      {dataTuteur && <NavbarTuteur tuteur={dataTuteur} />}
      <h2 className="text-center font-bold text-md bg-gray-200 text-dark m-auto text-gray-500">
        Année universitaire : 2024-2025
      </h2>
      {children}
      <Footer />
    </>
  );
}
