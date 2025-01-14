"use client";

import { BASE_URL } from "@/constants/baseUrl";
import useFetch from "@/utils/useFetch";
import React, { useState, useEffect } from "react";
import Image from "next/image"; // You can use next/image for optimized image rendering
import NavbarEntreprise from "@/components/entreprise/NavbarEntreprise";
import Footer from "@/components/Footer";

export default function EtudiantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  const gestEntr = useFetch(`${BASE_URL}/user-info`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  // Destructure the data safely, accounting for possible undefined data
  const gestEntrData = gestEntr.data;

  useEffect(() => {
    if (gestEntrData) {
      setLoading(false); // Set loading to false once data is fetched
    }
  }, [gestEntrData]);

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
      {gestEntrData && <NavbarEntreprise entreprise={gestEntrData} />}
      {children}
      <Footer />
    </>
  );
}
