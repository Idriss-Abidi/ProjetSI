"use client"; // Add this line at the top of your file

import React, { use, useEffect, useState } from "react";
import Footer from "@/components/Footer";
import NavbarTuteur from "@/components/tuteur/NavbarTuteur";
import EvaluationPage from "@/components/etudiant/Evaluation";

const Page = ({ params }: { params: Promise<{ id_etudiant: string }> }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataOffres, setDataOffres] = useState([]);
  const [dataCandidatures, setDataCandidatures] = useState([]);

  // Convert id_gest_entr to an integer
  const { id_etudiant } = use(params);
  const idEtudiant = parseInt(id_etudiant, 10); // Convert string to integer

  useEffect(() => {
    const fetchData = async () => {
      try {
        const offresResponse = await fetch("/db/stage_offre.json");
        const offresData = await offresResponse.json();
        const filteredOffres = offresData.filter(
          (offre: { id_etudiant: number }) => offre.id_etudiant === idEtudiant
        );
        console.log(filteredOffres);
        setDataOffres(filteredOffres);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [idEtudiant]); // Re-run the effect whenever `id_gest_entr` changes

  return (
    <div>
      <NavbarTuteur id={idEtudiant} />
      <div className="container m-auto p-8 ">
        {/* EvaluationPage   */}
        <EvaluationPage data={dataOffres} />
        {/* footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Page;
