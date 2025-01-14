"use client";

import NavbarEtudiant from "@/components/etudiant/NavbarEtudiant";
import { BASE_URL } from "@/constants/baseUrl";
import useFetch from "@/utils/useFetch";
import { userId } from "@/utils/userId";
import React, { useState, useEffect } from "react";
import Image from "next/image"; // You can use next/image for optimized image rendering
import Footer from "@/components/Footer";

export default function EtudiantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const idEtudiant = userId();
  const [loading, setLoading] = useState(true);

  const { data: dataEtudiant } = useFetch(
    `${BASE_URL}/etudiant/${idEtudiant}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  useEffect(() => {
    if (dataEtudiant) {
      setLoading(false); // Set loading to false once data is fetched
    }
  }, [dataEtudiant]);

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
      {dataEtudiant && <NavbarEtudiant etudiant={dataEtudiant} />}
      {children}
      <Footer />
    </>
  );
}
