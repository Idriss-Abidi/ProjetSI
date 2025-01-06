"use client"; // Add this line at the top of your file

import Footer from "@/components/Footer";
import { Tabs } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiAdjustments, HiUserCircle } from "react-icons/hi";
import NavbarRespo from "@/components/respo/NavbarRespo";
import EtudiantsList from "@/components/respo/EtudiantsList";
import StagesList from "@/components/respo/StagesList";

const Page = () => {
  const [etudiantsData, setDataEtudiants] = useState([]);
  const [dataStages, setDataStages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const etudiantsResponse = await fetch("/db/etudiant_full.json");
        const etudiantsData = await etudiantsResponse.json();
        setDataEtudiants(etudiantsData);

        const stagesResponse = await fetch("/db/stage_offre.json");
        const stagesData = await stagesResponse.json();
        const filteredStages = stagesData.filter(
          (stage: { statut: string }) => stage.statut === "En att"
        );
        setDataStages(filteredStages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <NavbarRespo />
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
          <Tabs.Item active title="Offres" icon={HiUserCircle}>
            {/* Passing the JSON data to CardList3 component for "Offres" */}
            <EtudiantsList data={etudiantsData} />
          </Tabs.Item>
          <Tabs.Item title="Candidatures" icon={HiAdjustments}>
            {/* Passing the JSON data to CardList3 component for "Candidatures" */}
            <StagesList data={dataStages} />
          </Tabs.Item>
        </Tabs>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Page;
