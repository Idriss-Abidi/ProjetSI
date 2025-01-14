"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import NavbarEtudiant from "@/components/etudiant/NavbarEtudiant";
import { BASE_URL } from "@/constants/baseUrl";
import { Button, Label, TextInput } from "flowbite-react";
import axios from "axios";
import { Etudiant } from "@/types";

const ProfilPage = () => {
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [dataEtudiant, setDataEtudiant] = useState<Etudiant | null>(null); // Use the Etudiant type
  const [selectedLevel, setSelectedLevel] = useState<string>(""); // Level selection
  const [selectedFiliere, setSelectedFiliere] = useState<string>(""); // Filiere selection
  const [password, setPassword] = useState<string>(""); // Temporary password field
  const [idEtudiant, setIdEtudiant] = useState<string | null>(null); // Store Etudiant ID

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const etdResponse = await fetch(`${BASE_URL}/user-info`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!etdResponse.ok) {
          throw new Error(
            `Failed to fetch user-info: ${etdResponse.statusText}`
          );
        }
        const etdData = await etdResponse.json(); // Parse JSON response
        setIdEtudiant(etdData.idEtudiant); // Set Etudiant ID
      } catch (error) {
        console.error("Error fetching user-info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const loadEtudiant = async () => {
      if (idEtudiant) {
        try {
          const response = await axios.get<Etudiant>(
            `${BASE_URL}/etudiant/${idEtudiant}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          const fetchedEtudiant = response.data;
          setDataEtudiant(fetchedEtudiant);

          // Pre-populate form selections
          setSelectedLevel(fetchedEtudiant.niveau);
          setSelectedFiliere(fetchedEtudiant.filiere?.nomFiliere || "");
        } catch (error) {
          console.error("Error fetching etudiant:", error);
        }
      }
    };

    loadEtudiant();
  }, [idEtudiant]); // Run when `idEtudiant` is set

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "password") {
      setPassword(value);
    } else if (name === "niveau") {
      setSelectedLevel(value);
    } else if (name === "filiere") {
      setSelectedFiliere(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!dataEtudiant) {
      console.error("No data to update.");
      return;
    }

    const updatedData = {
      idUser: dataEtudiant.user.idUser,
      idEtudiant: idEtudiant,
      password: password,
    };

    console.log("JSON Object to submit:", updatedData);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  if (!dataEtudiant) {
    return <div></div>; // Show loading state until data is fetched
  }

  return (
    <div>
      <div className="container m-auto p-8">
        <div className="bg-base-200 max-h-full">
          <div className="grid grid-cols-5 gap-2">
            <div className="col-span-5 md:col-span-2 mx-auto my-4">
              <img
                src="/images/profile.png"
                alt="Profile"
                className="w-[85%] rounded-lg p-auto shadow-2xl"
              />
            </div>

            <div className="col-span-5 md:col-span-3 p-[5px] mx-1/12 my-4">
              <h1 className="text-5xl font-bold">Page de profil</h1>
              <p className="py-6">
                Mettez à jour vos informations de profil ici.
              </p>
              <form
                className="flex max-w-full flex-col grid grid-cols-2 gap-4 m-1/12"
                onSubmit={onSubmit}
              >
                <div className="w-10/12">
                  <Label htmlFor="Nom" value="Nom :" />
                  <TextInput
                    id="Nom"
                    type="text"
                    name="nom"
                    value={dataEtudiant.user.nom}
                    readOnly
                    shadow
                  />
                </div>
                <div className="w-10/12">
                  <Label htmlFor="Prenom" value="Prenom :" />
                  <TextInput
                    id="Prenom"
                    type="text"
                    name="prenom"
                    value={dataEtudiant.user.prenom}
                    readOnly
                    shadow
                  />
                </div>
                <div className="w-10/12">
                  <Label htmlFor="Niveau" value="Niveau :" />
                  <TextInput
                    id="Niveau"
                    name="niveau"
                    value={selectedLevel}
                    readOnly
                    shadow
                  />
                </div>
                <div className="w-10/12">
                  <Label htmlFor="Filiere" value="Filiere :" />
                  <TextInput
                    id="Filiere"
                    name="filiere"
                    value={selectedFiliere}
                    readOnly
                    shadow
                  />
                </div>
                <div className="w-10/12">
                  <Label htmlFor="Email" value="Email :" />
                  <TextInput
                    id="Email"
                    type="email"
                    name="email"
                    value={dataEtudiant.user.email}
                    readOnly
                    shadow
                  />
                </div>
                <div className="w-10/12">
                  <Label htmlFor="password2" value="Your password" />
                  <TextInput
                    id="password2"
                    name="password"
                    value={password}
                    onChange={onInputChange}
                    type={showPassword ? "text" : "password"}
                    required
                    shadow
                  />
                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    className="text-blue-500 mt-2"
                  >
                    {showPassword ? "Hide" : "Show"} Mot de Passe
                  </button>
                </div>
                <Button className="col-span-2 w-5/12 m-auto" type="submit">
                  Modifier
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilPage;
