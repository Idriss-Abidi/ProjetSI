"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React, { useEffect, useState } from "react";

const NavbarEcole = () => {
  const [dataGestEnt, setDataGestEnt] = useState<any>(null); // Fixing the type

  return (
    <div>
      <Navbar fluid rounded className="m-auto w-[90%]">
        <Navbar.Brand href={`/ecole`}>
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
              <span className="block text-sm">Admin Ecole</span>
              <span className="block truncate text-sm font-medium">
                admin@gmai.com
              </span>
            </Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item href="/login">Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href={`/ecole`} active>
            Gestion Etudiants
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarEcole;
