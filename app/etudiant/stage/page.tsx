"use client"; // Add this line at the top of your file

import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import EvaluationPage from "@/components/etudiant/Evaluation";
import { BASE_URL } from "@/constants/baseUrl";
import NavbarEtudiant from "@/components/etudiant/NavbarEtudiant";
import { RemarqueStage } from "@/types";

const Page: React.FC = () => {
  const [dataStage, setDataStage] = useState<RemarqueStage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token is missing.");
        }

        // Fetch user-info to get the student ID
        const etdResponse = await fetch(`${BASE_URL}/user-info`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!etdResponse.ok) {
          throw new Error(
            `Failed to fetch user-info: ${etdResponse.statusText}`
          );
        }
        const etdData = await etdResponse.json(); // Parse JSON response

        const idEtudiant = etdData.idEtudiant;
        console.log("Etudiant ID:", idEtudiant);

        // Fetch all remarks-stage data
        const stageResponse = await fetch(`${BASE_URL}/remarques-stage/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!stageResponse.ok) {
          throw new Error(
            `Failed to fetch remarks-stage data: ${stageResponse.statusText}`
          );
        }
        const allStages = await stageResponse.json(); // Parse JSON response

        // Filter data to find the entry with matching idEtudiant
        const studentStage = allStages.find(
          (stage: RemarqueStage) => stage.etudiant.idEtudiant === idEtudiant
        );

        if (!studentStage) {
          throw new Error(
            "No remarks-stage data found for the current student."
          );
        }

        setDataStage(studentStage);
      } catch (error: any) {
        setError(error.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p></p>;
  }

  if (error) {
    return (
      <div className="mt-4 flex justify-center items-center bg-yellow-100 text-yellow-800 p-4 rounded-md shadow-md border border-yellow-300">
        <p className="text-lg font-semibold">
          L'étudiant n'a pas encore de stage actuellement.
        </p>
      </div>
    );
  }

  console.log("Filtered Stage Data:", dataStage);

  return (
    <div>
      {/* <NavbarEtudiant /> */}
      <div className="container m-auto p-8">
        {/* Render EvaluationPage if dataStage is available */}
        {dataStage && <EvaluationPage data={dataStage} />}
        {/* Footer */}
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Page;
