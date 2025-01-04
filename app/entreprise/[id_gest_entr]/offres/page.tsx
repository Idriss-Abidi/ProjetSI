"use client"; // Add this line at the top of your file

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React, { use, useEffect, useState } from "react";
import OffersListPage from "@/components/entreprise/offersPage";
import Footer from "@/components/Footer";

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
      <Navbar fluid rounded className="m-auto w-[90%]">
        <Navbar.Brand href="https://flowbite-react.com">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Flowbite React
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                className="mx-4"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">
                name@flowbite.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="#" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="#">Acceuil</Navbar.Link>
          <Navbar.Link href="#">Offres</Navbar.Link>
          <Navbar.Link href="#">Candidatures</Navbar.Link>
          <Navbar.Link href="#">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
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
