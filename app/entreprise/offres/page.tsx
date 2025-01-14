"use client"; // Add this line at the top of your file

import React, { useEffect, useState } from "react";
import OffersListPage from "@/components/entreprise/offersPage";
import Footer from "@/components/Footer";
import NavbarEntreprise from "@/components/entreprise/NavbarEntreprise";
import { BASE_URL } from "@/constants/baseUrl";
import useFetch from "@/utils/useFetch";

// Utility function to fetch candidatures
async function getAllCandidatures() {
  const allStudentsUrl = `${BASE_URL}/etudiant/all`;

  try {
    // Step 1: Fetch all students
    const studentsResponse = await fetch(allStudentsUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!studentsResponse.ok) {
      throw new Error("Failed to fetch students");
    }

    const studentsData = await studentsResponse.json();

    // Step 2: Get candidatures for each student
    const allCandidatures = [];

    for (const student of studentsData) {
      const studentId = student.idEtudiant;
      const candidaturesUrl = `${BASE_URL}/candidature/${studentId}`;

      // Fetch candidatures for the current student
      const candidaturesResponse = await fetch(candidaturesUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!candidaturesResponse.ok) {
        throw new Error(
          `Failed to fetch candidatures for student ${studentId}`
        );
      }

      const candidaturesData = await candidaturesResponse.json();
      allCandidatures.push(...candidaturesData);
    }

    return allCandidatures;
  } catch (error) {
    console.error("Error in getAllCandidatures:", error);
    return [];
  }
}

// Component
const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataOffres, setDataOffres] = useState([]);
  // const [dataCandidatures, setDataCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dataCandidatures, setDataCandidatures] = useState<any[]>([]); // Specify the type of the array

  // Fetch data for gestEntr
  const gestEntr = useFetch(`${BASE_URL}/user-info`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const gestEntrData = gestEntr.data;
  const idGestEntr = gestEntrData?.idGestEntr; // Access idGestEntr

  // Function to toggle modal visibility
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Stagesresponse = await fetch(`${BASE_URL}/stage/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!Stagesresponse.ok) {
          throw new Error("Error fetching stages");
        }

        const stagesData = await Stagesresponse.json();
        const filteredStages = stagesData.filter(
          (stage: { gestionnaire: { idGestEntr: number } }) =>
            stage.gestionnaire?.idGestEntr === idGestEntr
        );
        setDataOffres(filteredStages);

        // Fetch all candidatures
        const candidaturesData = await getAllCandidatures();
        const filteredCandidatures = candidaturesData.filter(
          (candidature) =>
            candidature.stage.gestionnaire.idGestEntr === idGestEntr
        );
        setDataCandidatures(filteredCandidatures);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    // Call fetchData if idGestEntr is available
    if (idGestEntr) {
      fetchData();
    }
  }, [idGestEntr]); // Re-run effect if idGestEntr changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <NavbarEntreprise />
      <div className="container m-auto p-8 ">
        {/* Offers List */}
        <OffersListPage data={dataOffres} dataCandidatures={dataCandidatures} />
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Page;
