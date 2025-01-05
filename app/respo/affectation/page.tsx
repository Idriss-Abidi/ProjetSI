"use client"; // Add this line at the top of your file

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import NavbarRespo from "@/components/respo/NavbarRespo";
import AffectationForm from "@/components/respo/AffectationForm";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataOffres, setDataOffres] = useState([]);
  const [dataEtudiants, setDataEtudiants] = useState([]);

  // Function to toggle modal visibility
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for offers and students
        const offresResponse = await fetch("/db/offre.json");
        const offresData = await offresResponse.json();
        const filteredOffres = offresData.filter(
          (offre: { statut: string }) => offre.statut === "active"
        );
        setDataOffres(filteredOffres);

        const EtudiantsResponse = await fetch("/db/etudiant_full.json");
        const EtudiantsData = await EtudiantsResponse.json();
        const filteredEtudiants = EtudiantsData.filter(
          (etudiant: { statut: number }) => etudiant.statut === 0
        );
        setDataEtudiants(filteredEtudiants);
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
