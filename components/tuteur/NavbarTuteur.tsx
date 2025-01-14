"use client";

import { Tuteur } from "@/types";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React, { useEffect, useState } from "react";
type NavbarTuteurProps = {
  tuteur: Tuteur;
};
const NavbarTuteur = ({ tuteur }: NavbarTuteurProps) => {
  if (!tuteur || !tuteur.user) {
    return <div></div>; // Render a loading state if etudiant is not available
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
                {tuteur.user.nom} {tuteur.user.prenom}
              </span>
              <span className="block truncate text-sm font-medium">
                {tuteur.user.email}
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
          <Navbar.Link href={`/tuteur/evaluation`} active>
            Evaluation Stages
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarTuteur;
