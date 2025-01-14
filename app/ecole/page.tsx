"use client"; // Add this line at the top of your file

import Footer from "@/components/Footer";
import { Tabs } from "flowbite-react";
import React, { use, useEffect, useState } from "react";
import { HiAdjustments, HiUserCircle } from "react-icons/hi";
import EtudiantsList from "@/components/ecole/EtudiantsList";
import NavbarEcole from "@/components/ecole/NavbarEcole";
import AddEtudiantForm from "@/components/ecole/addEtudiant";
import { BASE_URL } from "@/constants/baseUrl";

const Page = () => {
  const [etudiantsData, setDataEtudiants] = useState([]);
  // Convert id_gest_entr to an integer

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all remarks-stage data
        const etudiantResponse = await fetch(`${BASE_URL}/etudiant/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!etudiantResponse.ok) {
          throw new Error(
            `Failed to fetch remarks-stage data: ${etudiantResponse.statusText}`
          );
        }
        const allEtudiant = await etudiantResponse.json(); // Parse JSON response
        setDataEtudiants(allEtudiant);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <NavbarEcole />
      <h2 className="text-center font-bold text-md bg-gray-200 text-dark m-auto text-gray-500">
        Année universitaire : 2024-2025
      </h2>

      <div className="container m-auto p-8 ">
        <Tabs
          id="exploreOffers"
          aria-label="Default tabs"
          variant="default"
          className="m-auto my-4 space-x-4 justify-self-center"
        >
          <Tabs.Item active title="Liste Etudiants" icon={HiUserCircle}>
            {/* Passing the JSON data to CardList3 component for "Offres" */}
            <EtudiantsList data={etudiantsData} />
          </Tabs.Item>
          <Tabs.Item title="Ajouter Etudiant" icon={HiAdjustments}>
            {/* Passing the JSON data to CardList3 component for "Candidatures" */}
            <AddEtudiantForm />
          </Tabs.Item>
        </Tabs>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Page;
