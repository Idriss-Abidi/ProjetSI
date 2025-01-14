"use client"; // Add this line at the top of your file

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import NavbarRespo from "@/components/respo/NavbarRespo";
import AffectationForm from "@/components/respo/AffectationForm";
import { BASE_URL } from "@/constants/baseUrl";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataOffres, setDataOffres] = useState([]);
  const [dataEtudiants, setDataEtudiants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for offers and students
        const response = await fetch(`${BASE_URL}/stage/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const dataStages = await response.json();
        const filteredOffres = dataStages.filter(
          (offre: { statut: string }) => offre.statut === "ACCEPTE"
        );
        setDataOffres(filteredOffres);

        const response2 = await fetch(`${BASE_URL}/etudiant/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const dataEtudiants = await response2.json();
        setDataEtudiants(dataEtudiants);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run this effect only once when the component mounts

  return (
    <div>
      <NavbarRespo />
      <div className="container m-auto p-8">
        {/* offres List */}
        <AffectationForm data={dataOffres} etds={dataEtudiants} />
        {/* footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Page;
