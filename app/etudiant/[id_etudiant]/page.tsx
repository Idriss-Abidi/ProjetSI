"use client"; // Add this line at the top of your file

import CandidatureList from "@/components/etudiant/CandidatureList";
import CardList from "@/components/etudiant/CardList";
import CalendarScheduler from "@/components/etudiant/EntretienList";
import StagesList from "@/components/etudiant/Stages";
import Footer from "@/components/Footer";
import { Avatar, Dropdown, Navbar, Tabs } from "flowbite-react";
import React, { useEffect, useState } from "react";
import {
  HiAdjustments,
  HiArrowRight,
  HiClipboardList,
  HiUserCircle,
} from "react-icons/hi";
import { use } from "react";
import NavbarEtudiant from "@/components/etudiant/NavbarEtudiant";

const Page = ({ params }: { params: Promise<{ id_etudiant: string }> }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataOffres, setDataOffres] = useState([]);
  const [dataCandidatures, setDataCandidatures] = useState([]);
  const [dataEntretiens, setDataEntretiens] = useState([]);
  const [dataStages, setDataStages] = useState([]);

  // Convert id_etudiant to an integer
  const { id_etudiant } = use(params);
  const idEtudiant = parseInt(id_etudiant, 10); // Convert string to integer

  useEffect(() => {
    const fetchData = async () => {
      try {
        const offresResponse = await fetch("/db/offre_affectation.json");
        const offresData = await offresResponse.json();
        const filteredOffres = offresData.filter(
          (offre: { id_etudiant: number; statut_aff: string }) =>
            offre.id_etudiant === idEtudiant && offre.statut_aff === "show"
        );
        console.log(filteredOffres);
        setDataOffres(filteredOffres);

        const candidaturesResponse = await fetch("/db/candidature_offre.json");
        const candidaturesData = await candidaturesResponse.json();
        const filteredCandidatures = candidaturesData.filter(
          (candidature: { id_etudiant: number; statut: string }) =>
            candidature.id_etudiant === idEtudiant &&
            candidature.statut === "En att"
        );
        setDataCandidatures(filteredCandidatures);

        const entretiensResponse = await fetch("/db/offre_entretien.json");
        const entretiensData = await entretiensResponse.json();
        const filteredEntretiens = entretiensData.filter(
          (entretien: { id_etudiant: number }) =>
            entretien.id_etudiant === idEtudiant
        );
        setDataEntretiens(filteredEntretiens);

        const stagesResponse = await fetch("/db/stage_offre.json");
        const stagesData = await stagesResponse.json();
        const filteredStages = stagesData.filter(
          (stage: { id_etudiant: number }) => stage.id_etudiant === idEtudiant
        );
        setDataStages(filteredStages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [idEtudiant]); // Re-run the effect whenever `idEtudiant` changes

  return (
    <div>
      <NavbarEtudiant id={idEtudiant} />
      <h2 className="text-center font-bold text-md bg-gray-200 text-dark m-auto text-gray-500">
        Année universitaire : 2024-2025
      </h2>

      <div className="container m-auto p-8 ">
        <div className="hero bg-base-200 min-h-[400px]">
          <div className="hero-content flex-col md:flex-row-reverse">
            <img
              src="/login1.jpg"
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

              <a
                href="#exploreOffers"
                className="inline-flex items-center rounded-lg border-1 border-black px-2.5 py-1.5 text-center text-3xl font-Large text-dark hover:bg-gray-200/50 hover:text-dark-900"
              >
                Commencez dès maintenant !
                <HiArrowRight className="ml-2" />
              </a>
            </div>
          </div>
        </div>

        <Tabs
          id="exploreOffers"
          aria-label="Default tabs"
          variant="default"
          className="m-auto my-4 space-x-4 justify-self-center"
        >
          <Tabs.Item active title="Offres" icon={HiUserCircle}>
            {/* Passing the JSON data to CardList3 component for "Offres" */}
            <CardList data={dataOffres} />
          </Tabs.Item>
          <Tabs.Item title="Candidatures" icon={HiAdjustments}>
            {/* Passing the JSON data to CardList3 component for "Candidatures" */}
            <CandidatureList data={dataCandidatures} />
          </Tabs.Item>
          <Tabs.Item title="Entretiens" icon={HiClipboardList}>
            {/* Passing the JSON data to CardList3 component for "Entretiens" */}
            <div className="p-8">
              <CalendarScheduler offers={dataEntretiens} />
            </div>
          </Tabs.Item>
          <Tabs.Item title="Stages" icon={HiClipboardList}>
            {/* Passing the JSON data to CardList3 component for "Stages" */}
            <StagesList data={dataStages} />
          </Tabs.Item>
        </Tabs>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Page;
