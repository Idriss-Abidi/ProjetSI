"use client";

import { Gestionnaire } from "@/types";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React from "react";

type NavbarEtudiantProps = {
  entreprise: Gestionnaire;
};

const NavbarEntreprise = ({ entreprise }: NavbarEtudiantProps) => {
  if (!entreprise) {
    return <div></div>; // Render a loading state if entreprise is not available
  }
  return (
    <div>
      <Navbar fluid rounded className="m-auto w-[90%]">
        <Navbar.Brand href={`/entreprise`}>
          <div className="flex items-center">
            <img
              src="/logo_app.png" // Replace with the path to your logo
              alt="Logo"
              className="h-14 mr-2" // Adjust size and spacing
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              ECS
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
                {entreprise.user.nom} {entreprise.user.prenom}
              </span>
              <span className="block truncate text-sm font-medium">
                {entreprise.user.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item href={`/entreprise`}>Acceuil</Dropdown.Item>
            {/* <Dropdown.Item href="#">Profil</Dropdown.Item> */}
            <Dropdown.Divider />
            <Dropdown.Item href="/login">Se déconnecter</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href={`/entreprise`}>Acceuil</Navbar.Link>
          <Navbar.Link href={`/entreprise/offres`}>Offres</Navbar.Link>
          <Navbar.Link href={`/entreprise/entretien`}>Entretiens</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarEntreprise;
