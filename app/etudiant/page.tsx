"use client";

import CandidatureList from "@/components/etudiant/CandidatureList";
import CardList from "@/components/etudiant/OffresList";
import CalendarScheduler from "@/components/etudiant/EntretienList";
import StagesList from "@/components/etudiant/Stages";
import Footer from "@/components/Footer";
import { Tabs } from "flowbite-react";
import React, { useEffect, useState } from "react";
import {
  HiClipboardCheck,
  HiCalendar,
  HiDocumentSearch,
  HiOutlineAcademicCap,
} from "react-icons/hi";
import NavbarEtudiant from "@/components/etudiant/NavbarEtudiant";
import useFetch from "@/utils/useFetch";
import { BASE_URL } from "@/constants/baseUrl";
import OffresList from "@/components/etudiant/OffresList";
import { userId } from "@/utils/userId";

const Page = () => {
  const { data: dataOffres = [] } = useFetch(`${BASE_URL}/affectation/offres`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  console.log(dataOffres);

  // Fetch data for etudiant
  const etd = useFetch(`${BASE_URL}/user-info`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  // // get id from token
  // const token = localStorage.getItem("token") || "";
  // const decodedToken = JSON.parse(atob(token?.split(".")[1]));
  // const idEtudiant = decodedToken.entityId;
  const idEtudiant = userId();

  const { data: dataEtudiant = [] } = useFetch(
    `${BASE_URL}/etudiant/${idEtudiant}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  // console.log("id howa ", idEtudiant);
  const { data: dataCandidatures = [] } = useFetch(
    `${BASE_URL}/candidature/${idEtudiant}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const { data: dataEntretiens = [] } = useFetch(
    `${BASE_URL}/entretien/${idEtudiant}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return (
    <div>
      {/* {dataEtudiant && <NavbarEtudiant etudiant={dataEtudiant} />} */}
      {/* <h2 className="text-center font-bold text-md bg-gray-200 text-dark m-auto text-gray-500">
        Année universitaire : 2024-2025
      </h2> */}

      <div className="container m-auto p-8 ">
        <div className="hero bg-base-200 min-h-[400px]">
          <div className="hero-content flex-col md:flex-row-reverse">
            <img
              src="/login.jpg"
              className="md:w-3/12 w-6/12 rounded-lg shadow-2xl"
            />
            <div className="w-9/12 ml-[7%] min-h-[250px]">
              <h1 className="text-5xl font-bold">Bienvenue !</h1>
              <div className="py-6 w-[80%]">
                <p>
                  Trouvez facilement des offres de stage et suivez l'évolution
                  de vos candidatures tout au long du processus.
                </p>

                <h3>Comment ça marche ?</h3>
                <ul>
                  <li>
                    <strong>Explorez les offres de stage</strong> : Parcourez
                    les offres publiées par les entreprises et trouvez celles
                    qui correspondent à vos compétences et vos intérêts.
                  </li>
                  <li>
                    <strong>Postulez à des offres</strong> : Envoyez votre
                    candidature et montrez aux entreprises pourquoi vous êtes le
                    candidat idéal.
                  </li>
                  <li>
                    <strong>Suivez vos candidatures</strong> : Restez informé de
                    l'état de vos candidatures et de l'avancée du processus de
                    sélection.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Tabs
          id="exploreOffers"
          aria-label="Default tabs"
          variant="default"
          className="m-auto my-4 space-x-4 justify-self-center"
        >
          <Tabs.Item active title="Offres" icon={HiDocumentSearch}>
            {dataOffres && <OffresList data={dataOffres} />}
          </Tabs.Item>
          <Tabs.Item title="Candidatures" icon={HiClipboardCheck}>
            <CandidatureList data={dataCandidatures} />
          </Tabs.Item>
          <Tabs.Item title="Entretiens" icon={HiCalendar}>
            <div className="p-8">
              <CalendarScheduler entretiens={dataEntretiens} />
            </div>
          </Tabs.Item>
          <Tabs.Item title="Stages" icon={HiOutlineAcademicCap}>
            <StagesList data={dataEntretiens} />
          </Tabs.Item>
        </Tabs>

        {/* Footer */}
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Page;
