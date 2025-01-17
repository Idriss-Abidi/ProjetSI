"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React, { useEffect, useState } from "react";

const NavbarTuteur = ({ id }: { id: number }) => {
  const [dataTuteur, setDataTuteur] = useState<any>(null); // Fixing the type
  const [tuteur, setTuteur] = useState({
    nom: "",
    prenom: "",
    email: "",
  });
  const { nom, prenom, email } = tuteur;

  const loadGestEnt = async () => {
    try {
      const gestEntResponse = await fetch("/db/tuteur.json");
      const gestEntData = await gestEntResponse.json();
      const filteredTuteur = gestEntData.filter(
        (tuteur: { id_tuteur: number }) => tuteur.id_tuteur === id
      );
      if (filteredTuteur.length > 0) {
        setDataTuteur(filteredTuteur[0]); // Take the first match
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadGestEnt();
  }, [id]); // Load data when 'id' changes

  useEffect(() => {
    if (dataTuteur) {
      setTuteur({
        nom: dataTuteur.nom,
        prenom: dataTuteur.prenom,
        email: dataTuteur.email,
      });
    }
  }, [dataTuteur]); // Update Tuteur when dataTuteur is fetched

  return (
    <div>
      <Navbar fluid rounded className="m-auto w-[90%]">
        <Navbar.Brand href={`/entreprise/${id}`}>
          <div className="flex items-center">
            <img
              src="/logo_app.png" // Replace with the path to your logo
              alt="Logo"
              className="h-14 mr-2" // Adjust size and spacing
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
          <Navbar.Link href={`/tuteur/${id}/evaluation`} active>
            Evaluation Stages
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarTuteur;
