import { BASE_URL } from "@/constants/baseUrl";
import { Etudiant } from "@/types";
import { getUserInfo } from "@/utils/userInfo";
import axios from "axios";
import { Avatar, Dropdown, Navbar } from "flowbite-react";

type NavbarEtudiantProps = {
  etudiant: Etudiant;
};

const NavbarEtudiant = ({ etudiant }: NavbarEtudiantProps) => {
  // Check if etudiant and user properties exist before rendering
  if (!etudiant || !etudiant.user) {
    return <div></div>; // Render a loading state if etudiant is not available
  }

  return (
    <Navbar fluid rounded className="m-auto w-[90%]">
      <Navbar.Brand href={`/etudiant`}>
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
              {etudiant.user.nom} {etudiant.user.prenom}
            </span>
            <span className="block truncate text-sm font-medium">
              {etudiant.user.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item href={`/etudiant`}>Accueil</Dropdown.Item>
          <Dropdown.Item href={`/etudiant/profil`}>Profil</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="/login">Se déconnecter</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href={`/etudiant`} active>
          Accueil
        </Navbar.Link>
        <Navbar.Link href={`/etudiant/profil`}>Profil</Navbar.Link>
        <Navbar.Link href={`/etudiant/stage`}>Evaluation</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarEtudiant;
