"use client"; // Add this line at the top of your file

import Footer from "@/components/Footer";
import {
  Avatar,
  Button,
  Dropdown,
  Label,
  Navbar,
  TextInput,
} from "flowbite-react";
import React, { use, useEffect, useState } from "react";

const profilPage = ({
  params,
}: {
  params: Promise<{ id_etudiant: string }>;
}) => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const [dataEtudiant, setDataEtudiant] = useState<any>(null); // Fixing the type
  const { id_etudiant } = use(params);
  const idEtudiant = parseInt(id_etudiant, 10);

  const [etudiant, setEtudiant] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    niveau: "",
    filiere: "",
  });

  const { nom, prenom, email, password, niveau, filiere } = etudiant;

  const onInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEtudiant({ ...etudiant, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadEtudiant();
  }, [idEtudiant]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Updated data: ", etudiant); // Logs the updated state values
    // await axios.put(`http://localhost:8080/offre/${id}`, offre);
    // navigate("/");
  };

  const loadEtudiant = async () => {
    const fetchData = async () => {
      try {
        const etudiantResponse = await fetch("/db/etudiant_full.json");
        const offresData = await etudiantResponse.json();
        const filteredEtudiant = offresData.filter(
          (etudiant: { id_etudiant: number }) =>
            etudiant.id_etudiant === idEtudiant
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

  // Initialize selectedLevel and selectedFiliere after data is loaded
  const [selectedLevel, setSelectedLevel] = useState(niveau || "1A");
  const [selectedFiliere, setSelectedFiliere] = useState(filiere || "GL");

  useEffect(() => {
    if (dataEtudiant) {
      setSelectedLevel(dataEtudiant.niveau);
      setSelectedFiliere(dataEtudiant.filiere);
    }
  }, [dataEtudiant]);

  if (!dataEtudiant) {
    return <div>Loading...</div>;
  }

  const handleTogglePassword = () => {
    setShowPassword(!showPassword); // Toggle the visibility
  };

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
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="#" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="#">About</Navbar.Link>
          <Navbar.Link href="#">Services</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>

      {/* Profil */}
      <div className="container m-auto p-8">
        <div className=" bg-base-200 max-h-full">
          <div className="grid grid-cols-5 gap-2">
            <div className="col-span-5 md:col-span-2 mx-auto my-4">
              <img
                src="/images/profile.png"
                alt="Profile"
                className="w-[85%] rounded-lg p-auto shadow-2xl"
              />
            </div>

            <div className="col-span-5 md:col-span-3 p-[5px] mx-1/12 my-4 ">
              <h1 className="text-5xl font-bold">Profile Page</h1>
              <p className="py-6">Provident cupiditate voluptatem et in.</p>
              {/* form */}
              <form
                className="flex max-w-full flex-col grid grid-cols-2 gap-4 m-1/12"
                onSubmit={(e) => onSubmit(e)}
              >
                <div className="w-10/12">
                  <div className="mb-2 ">
                    <Label htmlFor="Nom" value="Nom :" />
                  </div>
                  <TextInput
                    id="Nom"
                    type="text"
                    name="nom"
                    value={nom}
                    onChange={(e) => onInputChange(e)}
                    required
                    shadow
                  />
                </div>
                <div className="w-10/12">
                  <div className="mb-2 ">
                    <Label htmlFor="Prenom" value="Prenom :" />
                  </div>
                  <TextInput
                    id="Prenom"
                    type="text"
                    name="prenom"
                    value={prenom}
                    onChange={(e) => onInputChange(e)}
                    required
                    shadow
                  />
                </div>
                <div className="w-10/12">
                  <div className="mb-2 block">
                    <Label htmlFor="Niveau" value="Niveau :" />
                  </div>
                  <select
                    id="Niveau"
                    value={selectedLevel}
                    onChange={(e) => {
                      setSelectedLevel(e.target.value);
                      onInputChange(e);
                    }}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="1A">1A</option>
                    <option value="2A">2A</option>
                    <option value="3A">3A</option>
                  </select>
                </div>
                <div className="w-10/12">
                  <div className="mb-2 block">
                    <Label htmlFor="Filiere" value="Filire :" />
                  </div>
                  <select
                    id="Filiere"
                    value={selectedFiliere}
                    onChange={(e) => {
                      setSelectedFiliere(e.target.value);
                      onInputChange(e);
                    }}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="GL">GL</option>
                    <option value="GD">GD</option>
                    <option value="IDSIT">IDSIT</option>
                    <option value="2SI">2SI</option>
                    <option value="2IA">2IA</option>
                    <option value="SSE">SSE</option>
                    <option value="SSI">SSI</option>
                    <option value="2BI">2BI</option>
                  </select>
                </div>
                <div className="w-10/12">
                  <div className="mb-2 block">
                    <Label htmlFor="Email" value="Email :" />
                  </div>
                  <TextInput
                    id="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => onInputChange(e)}
                    required
                    shadow
                  />
                </div>
                <div className="w-10/12">
                  <div className="mb-2 block">
                    <Label htmlFor="password2" value="Your password" />
                  </div>
                  <TextInput
                    id="password2"
                    name="password"
                    value={password}
                    onChange={(e) => onInputChange(e)}
                    type={showPassword ? "text" : "password"}
                    required
                    shadow
                  />
                  {/* Button to toggle password visibility */}
                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    className="text-blue-500 mt-2"
                  >
                    {showPassword ? "Hide" : "Show"} Password
                  </button>
                </div>
                <Button className="col-span-2 w-5/12 m-auto " type="submit">
                  Modifier
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default profilPage;
