"use client"; // Add this line at the top of your file

import React, { use, useEffect, useState } from "react";
import Footer from "@/components/Footer";
import NavbarTuteur from "@/components/tuteur/NavbarTuteur";
import OffersListPage from "@/components/tuteur/offresPage";

const Page = ({ params }: { params: Promise<{ id_tuteur: string }> }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataOffres, setDataOffres] = useState([]);
  const [dataCandidatures, setDataCandidatures] = useState([]);

  // Convert id_gest_entr to an integer
  const { id_tuteur } = use(params);
  const idTuteur = parseInt(id_tuteur, 10); // Convert string to integer

  // Function to toggle modal visibility
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const offresResponse = await fetch("/db/stage_offre.json");
        const offresData = await offresResponse.json();
        const filteredOffres = offresData.filter(
          (offre: { id_tuteur: number }) => offre.id_tuteur === idTuteur
        );
        console.log(filteredOffres);
        setDataOffres(filteredOffres);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [idTuteur]); // Re-run the effect whenever `id_gest_entr` changes

  return (
    <div>
      <NavbarTuteur id={idTuteur} />
      <div className="container m-auto p-8 ">
        {/* offres List  */}
        <OffersListPage data={dataOffres} />
        {/* footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Page;
