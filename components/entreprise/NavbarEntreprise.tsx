"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React, { useEffect, useState } from "react";

const NavbarEntreprise = ({ id }: { id: number }) => {
  const [dataGestEnt, setDataGestEnt] = useState<any>(null); // Fixing the type
  const [gestEnt, setGestEnt] = useState({
    nom: "",
    prenom: "",
    email: "",
  });
  const { nom, prenom, email } = gestEnt;

  const loadGestEnt = async () => {
    try {
      const gestEntResponse = await fetch(
        "/db/gestionnaire_entreprise_full.json"
      );
      const gestEntData = await gestEntResponse.json();
      const filteredGestEnt = gestEntData.filter(
        (gestEnt: { id_gest_entr: number }) => gestEnt.id_gest_entr === id
      );
      if (filteredGestEnt.length > 0) {
        setDataGestEnt(filteredGestEnt[0]); // Take the first match
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadGestEnt();
  }, [id]); // Load data when 'id' changes

  useEffect(() => {
    if (dataGestEnt) {
      setGestEnt({
        nom: dataGestEnt.nom,
        prenom: dataGestEnt.prenom,
        email: dataGestEnt.email,
      });
    }
  }, [dataGestEnt]); // Update gestEnt when dataGestEnt is fetched

  return (
    <div>
      <Navbar fluid rounded className="m-auto w-[90%]">
        <Navbar.Brand href={`/entreprise/${id}`}>
          <div className="flex items-center">
            <img
              src="/logo_app.png" // Replace with the path to your logo
              alt="Logo"
              className="h-20 mr-2" // Adjust size and spacing
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              ENSIAS-STAGES
            </span>
          </div>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                className="mx-4"
                img="/profil_logo.png"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">
                {nom} {prenom}
              </span>
              <span className="block truncate text-sm font-medium">
                {email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item href={`/entreprise/${id}`}>Acceuil</Dropdown.Item>
            <Dropdown.Item href="#">Profil</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="/login">Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href={`/entreprise/${id}`} active>
            Acceuil
          </Navbar.Link>
          <Navbar.Link href={`/entreprise/${id}/offres`}>Offres</Navbar.Link>
          <Navbar.Link href="#">Candidatures</Navbar.Link>
          <Navbar.Link href="#">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarEntreprise;
