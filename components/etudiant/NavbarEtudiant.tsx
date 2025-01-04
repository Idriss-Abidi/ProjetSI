"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Link from "next/link"; // Import Link from next
import { useEffect, useState } from "react";

const NavbarEtudiant = ({ id }: { id: number }) => {
  const [dataEtudiant, setDataEtudiant] = useState<any>(null); // Fixing the type
  const [etudiant, setEtudiant] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    niveau: "",
    filiere: "",
  });
  const { nom, prenom, email, password, niveau, filiere } = etudiant;

  const loadEtudiant = async () => {
    const fetchData = async () => {
      try {
        const etudiantResponse = await fetch("/db/etudiant_full.json");
        const offresData = await etudiantResponse.json();
        const filteredEtudiant = offresData.filter(
          (etudiant: { id_etudiant: number }) => etudiant.id_etudiant === id
        );
        if (filteredEtudiant.length > 0) {
          setDataEtudiant(filteredEtudiant[0]); // Take the first match
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  };

  useEffect(() => {
    if (dataEtudiant) {
      setEtudiant({
        nom: dataEtudiant.nom,
        prenom: dataEtudiant.prenom,
        email: dataEtudiant.email,
        password: dataEtudiant.password,
        niveau: dataEtudiant.niveau,
        filiere: dataEtudiant.filiere,
      });
    }
  }, [dataEtudiant]);
  useEffect(() => {
    loadEtudiant();
  }, [id]);

  return (
    <Navbar fluid rounded className="m-auto w-[90%]">
      <Navbar.Brand href={`/etudiant/${id}`}>
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
            <span className="block truncate text-sm font-medium">{email}</span>
          </Dropdown.Header>
          <Dropdown.Item href={`/etudiant/${id}`}>Accueil</Dropdown.Item>
          <Dropdown.Item href={`/etudiant/${id}/profil`}>Profil</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="/login">Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href={`/etudiant/${id}`} active>
          Accueil
        </Navbar.Link>
        <Navbar.Link href={`/etudiant/${id}/profil`}>Profil</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarEtudiant;
