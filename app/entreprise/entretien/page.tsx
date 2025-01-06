"use client"; // Add this line at the top of your file

import React, { use, useEffect, useState } from "react";
import Footer from "@/components/Footer";
import NavbarEntreprise from "@/components/entreprise/NavbarEntreprise";
import EntretiensListPage from "@/components/entreprise/EntretiensListPage";

const Page = ({ params }: { params: Promise<{ id_gest_entr: string }> }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataEntretiens, setDataEntretiens] = useState([]);

  // Convert id_gest_entr to an integer
  const { id_gest_entr } = use(params);
  const idGestEntr = parseInt(id_gest_entr, 10); // Convert string to integer

  // Function to toggle modal visibility
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const entretiensResponse = await fetch("/db/offre_entretien.json");
        const entretiensData = await entretiensResponse.json();
        const filteredEntretiens = entretiensData.filter(
          (candidature: { id_gestionnaire: number }) =>
            candidature.id_gestionnaire === idGestEntr
        );
        setDataEntretiens(filteredEntretiens);
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
        <EntretiensListPage data={dataEntretiens} />
        {/* footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Page;
