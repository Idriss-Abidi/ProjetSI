"use client"; // Add this line at the top of your file

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React, { use, useEffect, useState } from "react";
import OffersListPage from "@/components/entreprise/offersPage";
import Footer from "@/components/Footer";
import NavbarEntreprise from "@/components/entreprise/NavbarEntreprise";

const Page = ({ params }: { params: Promise<{ id_gest_entr: string }> }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataOffres, setDataOffres] = useState([]);
  const [dataCandidatures, setDataCandidatures] = useState([]);

  // Convert id_gest_entr to an integer
  const { id_gest_entr } = use(params);
  const idGestEntr = parseInt(id_gest_entr, 10); // Convert string to integer

  // Function to toggle modal visibility
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const offresResponse = await fetch("/db/offre.json");
        const offresData = await offresResponse.json();
        const filteredOffres = offresData.filter(
          (offre: { id_gestionnaire: number }) =>
            offre.id_gestionnaire === idGestEntr
        );
        console.log(filteredOffres);
        setDataOffres(filteredOffres);

        const candidaturesResponse = await fetch("/db/candidature_offre.json");
        const candidaturesData = await candidaturesResponse.json();
        const filteredCandidatures = candidaturesData.filter(
          (candidature: { id_gestionnaire: number }) =>
            candidature.id_gestionnaire === idGestEntr
        );
        setDataCandidatures(filteredCandidatures);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id_gest_entr]); // Re-run the effect whenever `id_gest_entr` changes

  return (
    <div>
      <NavbarEntreprise id={idGestEntr} />
      <div className="container m-auto p-8 ">
        {/* offres List  */}
        <OffersListPage data={dataOffres} dataCandidatures={dataCandidatures} />
        {/* footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Page;
