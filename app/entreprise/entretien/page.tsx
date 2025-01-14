// "use client"; // Add this line at the top of your file

// import React, { use, useEffect, useState } from "react";
// import Footer from "@/components/Footer";
// import NavbarEntreprise from "@/components/entreprise/NavbarEntreprise";
// import EntretiensListPage from "@/components/entreprise/EntretiensListPage";
// import { BASE_URL } from "@/constants/baseUrl";
// import useFetch from "@/utils/useFetch";
// import { Entretien } from "@/types";

// // Utility function to fetch candidatures
// async function getAllEntretiens() {
//   const allStudentsUrl = `${BASE_URL}/etudiant/all`;

//   try {
//     // Step 1: Fetch all students
//     const studentsResponse = await fetch(allStudentsUrl, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });

//     if (!studentsResponse.ok) {
//       throw new Error("Failed to fetch students");
//     }

//     const studentsData = await studentsResponse.json();
//     console.log("drari : ", studentsData);
//     // Step 2: Get candidatures for each student
//     const allEntretiens = [];

//     for (const student of studentsData) {
//       const studentId = student.idEtudiant;
//       const entretienURL = `${BASE_URL}/entretien/${studentId}`;

//       // Fetch candidatures for the current student
//       const entretiensResponse = await fetch(entretienURL, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (!entretiensResponse.ok) {
//         throw new Error(
//           `Failed to fetch candidatures for student ${studentId}`
//         );
//       }

//       const entretiensData = await entretiensResponse.json();
//       console.log("candidatures : ", entretiensData);
//       allEntretiens.push(...entretiensData);
//     }

//     return allEntretiens;
//   } catch (error) {
//     console.error("Error in getallEntretiens:", error);
//     return [];
//   }
// }

// const Page = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [dataEntretiens, setDataEntretiens] = useState<Entretien[]>([]);

//   // Fetch data for gestEntr
//   const gestEntr = useFetch(`${BASE_URL}/user-info`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   });

//   const gestEntrData = gestEntr.data;
//   const idGestEntr = gestEntrData?.idGestEntr; // Access idGestEntr

//   // useEffect(() => {
//   const fetchData = async () => {
//     try {
//       // Fetch all entretiens
//       const entretiensData = await getAllEntretiens();
//       const filteredentretiens = entretiensData.filter(
//         (candidature) =>
//           candidature.stage.gestionnaire.idGestEntr === idGestEntr
//       );
//       setDataEntretiens(filteredentretiens);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   fetchData();
//   // }); // Re-run the effect whenever `id_gest_entr` changes
//   console.log("ENTR :", dataEntretiens);
"use client"; // Add this line at the top of your file

import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import NavbarEntreprise from "@/components/entreprise/NavbarEntreprise";
import { BASE_URL } from "@/constants/baseUrl";
import useFetch from "@/utils/useFetch";
import { Entretien } from "@/types";
import EntretiensListPage from "@/components/entreprise/EntretiensListPage";

// Utility function to fetch candidatures
async function getAllEntretiens() {
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
    console.log("Students:", studentsData);

    // Step 2: Get candidatures for each student
    const allEntretiens = [];

    for (const student of studentsData) {
      const studentId = student.idEtudiant;
      const entretienURL = `${BASE_URL}/entretien/${studentId}`;

      // Fetch candidatures for the current student
      const entretiensResponse = await fetch(entretienURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!entretiensResponse.ok) {
        throw new Error(
          `Failed to fetch candidatures for student ${studentId}`
        );
      }

      const entretiensData = await entretiensResponse.json();
      console.log("Entretiens:", entretiensData);
      allEntretiens.push(...entretiensData);
    }

    return allEntretiens;
  } catch (error) {
    console.error("Error in getAllEntretiens:", error);
    return [];
  }
}

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataEntretiens, setDataEntretiens] = useState<Entretien[]>([]);

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

  useEffect(() => {
    if (!idGestEntr) return; // Avoid running fetch if idGestEntr is not available

    const fetchData = async () => {
      try {
        // Fetch all entretiens
        const entretiensData = await getAllEntretiens();
        const filteredEntretiens = entretiensData.filter(
          (entretien) => entretien.stage.gestionnaire.idGestEntr === idGestEntr
        );
        setDataEntretiens(filteredEntretiens);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [idGestEntr]); // Only run when `idGestEntr` changes

  console.log("Entretiens:", dataEntretiens);

  return (
    <div>
      {/* <NavbarEntreprise /> */}
      <div className="container m-auto p-8 ">
        {/* offres List  */}
        <EntretiensListPage data={dataEntretiens} />
      </div>
    </div>
  );
};

export default Page;
