"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Link from "next/link"; // Import Link from next
import { useEffect, useState } from "react";

const NavbarRespo = () => {
  return (
    <Navbar fluid rounded className="m-auto w-[90%]">
      <Navbar.Brand href={`/respo`}>
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
            <span className="block text-sm">Admin</span>
          </Dropdown.Header>
          <Dropdown.Item href="/login">Se déconnecter</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href={`/respo`}>Offres</Navbar.Link>
        <Navbar.Link href={`/respo/affectation`}>Affectation</Navbar.Link>
        <Navbar.Link href={`/respo/stages`}>Stages</Navbar.Link>
        <Navbar.Link href={`/respo/entreprises`}>Entreprises</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarRespo;
