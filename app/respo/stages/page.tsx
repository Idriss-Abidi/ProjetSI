"use client";

import Footer from "@/components/Footer";
import { Tabs } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiAdjustments, HiUserCircle } from "react-icons/hi";
import NavbarRespo from "@/components/respo/NavbarRespo";
import EtudiantsList from "@/components/respo/EtudiantsList";
import { Etudiant, RemarqueStage } from "@/types";
import { BASE_URL } from "@/constants/baseUrl";
import StagesList from "@/components/respo/StagesList";

const Page: React.FC = () => {
  const [etudiantsData, setEtudiantsData] = useState<Etudiant[]>([]);
  const [dataStages, setDataStages] = useState<RemarqueStage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User is not authenticated.");
          setLoading(false);
          return;
        }

        // Fetch Etudiants
        const etudiantsResponse = await fetch(`${BASE_URL}/etudiant/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!etudiantsResponse.ok)
          throw new Error("Failed to fetch Etudiants data.");
        const etudiantsData: Etudiant[] = await etudiantsResponse.json();
        setEtudiantsData(etudiantsData);

        // Fetch Stages
        const stagesResponse = await fetch(`${BASE_URL}/remarques-stage/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!stagesResponse.ok) throw new Error("Failed to fetch Stages data.");
        const stagesData: RemarqueStage[] = await stagesResponse.json();
        setDataStages(stagesData);
      } catch (error: any) {
        setError(error.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <NavbarRespo />

      <h2 className="text-center font-bold text-md bg-gray-200 text-gray-500 m-auto">
        Année universitaire : 2024-2025
      </h2>

      <div className="container m-auto p-8">
        {loading ? (
          <p className="text-center text-gray-500">Loading data...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : (
          <Tabs
            id="exploreOffers"
            aria-label="Default tabs"
            variant="default"
            className="m-auto my-4 space-x-4 justify-self-center"
          >
            <Tabs.Item active title="Offres" icon={HiUserCircle}>
              <EtudiantsList data={etudiantsData} />
            </Tabs.Item>
            <Tabs.Item title="Candidatures" icon={HiAdjustments}>
              <StagesList data={dataStages} />
            </Tabs.Item>
          </Tabs>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default Page;
