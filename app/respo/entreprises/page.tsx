"use client"; // Add this line at the top of your file

import Footer from "@/components/Footer";
import { Tabs } from "flowbite-react";
import React from "react";
import { HiAdjustments, HiUserCircle } from "react-icons/hi";
import AddGestForm from "@/components/respo/AddGestForm";
import AddEntrepriseForm from "@/components/respo/AddEntreprise";
import NavbarRespo from "@/components/respo/NavbarRespo";

const Page = () => {
  return (
    <div>
      <NavbarRespo />
      <h2 className="text-center font-bold text-md bg-gray-200 text-dark m-auto text-gray-500">
        Année universitaire : 2024-2025
      </h2>

      <div className="container m-auto p-8 ">
        <Tabs
          id="exploreOffers"
          aria-label="Default tabs"
          variant="default"
          className="m-auto my-4 space-x-4 justify-self-center"
        >
          <Tabs.Item active title="Ajouter Gestionnaire" icon={HiUserCircle}>
            {/* Passing the JSON data to CardList3 component for "Offres" */}
            <AddGestForm />
          </Tabs.Item>
          <Tabs.Item title="Ajouter Entreprise" icon={HiAdjustments}>
            {/* Passing the JSON data to CardList3 component for "Candidatures" */}
            <AddEntrepriseForm />
          </Tabs.Item>
        </Tabs>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Page;
