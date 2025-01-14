"use client"; // Add this line at the top of your file

import { Tabs } from "flowbite-react";
import React from "react";
import { Pie } from "react-chartjs-2";
import {
  HiArrowRight,
  HiDocumentDuplicate,
  HiPlusCircle,
} from "react-icons/hi";
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import OffersListPage from "@/components/entreprise/offersPage";
import Footer from "@/components/Footer";
import NavbarEntreprise from "@/components/entreprise/NavbarEntreprise";
import useFetch from "@/utils/useFetch";
import { BASE_URL } from "@/constants/baseUrl";
import FormComponent from "@/components/entreprise/FormComponent";
import AddTuteurForm from "@/components/entreprise/AddTuteur";
// import { Pie, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Page = () => {
  // get id
  const etudiant = useFetch(`${BASE_URL}/user-info`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const etudiantData = etudiant.data;
  const id = etudiantData?.idGestEntr;
  // console.log("id howa ", id);

  const { data: dataOffres = [] } = useFetch(`${BASE_URL}/stage/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  // Check if dataOffres is defined and filter based on idGestEntr
  const filteredOffres =
    dataOffres && Array.isArray(dataOffres)
      ? dataOffres.filter((offre) => offre.gestionnaire.idGestEntr === id)
      : [];
  // Data for the first chart (by abbreviation PFA-1A, PFA-2A, PFE)
  const data1Values = { "PFA-1A": 0, "PFA-2A": 0, PFE: 0 };

  filteredOffres.forEach((offre) => {
    if (offre.abbreviation === "PFE") {
      data1Values["PFE"] += 1;
    } else if (offre.abbreviation === "PFA_1A") {
      data1Values["PFA-1A"] += 1;
    } else if (offre.abbreviation === "PFA_2A") {
      data1Values["PFA-2A"] += 1;
    }
  });

  const data1 = {
    labels: ["PFA-1A", "PFA-2A", "PFE"],
    datasets: [
      {
        data: [
          data1Values["PFA-1A"],
          data1Values["PFA-2A"],
          data1Values["PFE"],
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  // Data for the second chart (by status)
  const data2Values = { EN_ATTENTE: 0, ACCEPTE: 0, REFUSE: 0 /*, EXPIRE: 0*/ };

  filteredOffres.forEach((offre) => {
    if (offre.statut === "EN_ATTENTE") {
      data2Values["EN_ATTENTE"] += 1;
    } else if (offre.statut === "ACCEPTE") {
      data2Values["ACCEPTE"] += 1;
    } else if (offre.statut === "REFUSE") {
      data2Values["REFUSE"] += 1;
    } /*else if (offre.statut === "EXPIRE") {
      data2Values["EXPIRE"] += 1;
    }*/
  });

  const data2 = {
    labels: ["EN_ATTENTE", "ACCEPTE", "REFUSE" /*"EXPIRE"*/],
    datasets: [
      {
        data: [
          data2Values["EN_ATTENTE"],
          data2Values["ACCEPTE"],
          data2Values["REFUSE"],
          // data2Values["EXPIRE"],
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56" /*"gray"*/],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56" /*, "#A9A9A9"*/],
      },
    ],
  };

  return (
    <div>
      <div className="container m-auto p-8 ">
        <div className="hero bg-base-200 min-h-[400px]">
          <div className="hero-content flex-col md:flex-row-reverse">
            <img src="/rrhh.png" className="md:w-6/12 w-6/12 " />
            <div className="w-8/12 ml-[7%] min-h-[250px]">
              <h1 className="text-5xl font-bold">Bienvenue !</h1>
              <div className="py-6">
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
              {/* 
              <a
                href="#exploreOffers"
                className="inline-flex items-center rounded-lg border-1 border-black px-2.5 py-1.5 text-center text-3xl font-Large text-dark hover:bg-gray-200/50 hover:text-dark-900"
              >
                Commencez dès maintenant !
                <HiArrowRight className="ml-2" />
              </a> */}
            </div>
          </div>
        </div>

        {/* Dashboard */}
        <div className="grid grid-flow-row-dense grid-row-2 grid-cols-2 gap-0 mb-20 mt-10">
          <div className=" m-auto row-span-2">
            <h3 className="text-center mb-4 text-xl font-semibold">
              Stage par Type
            </h3>
            <Pie data={data1} className="w-[300px] h-[300px]" />
          </div>

          <div className=" m-auto row-span-2">
            <h3 className="text-center mb-4 text-xl font-semibold">
              Stages par Status
            </h3>
            <Pie data={data2} className="w-[300px] h-[300px]" />
          </div>
        </div>

        {/* form */}
        <div className="w-2/3 m-auto">
          <Tabs
            id="exploreOffers"
            aria-label="Default tabs"
            variant="default"
            className="m-auto my-4 space-x-4  justify-self-center"
          >
            <Tabs.Item active title="Offres" icon={HiDocumentDuplicate}>
              <FormComponent />
            </Tabs.Item>
            <Tabs.Item title="Ajouter Tuteur" icon={HiPlusCircle}>
              <AddTuteurForm />
            </Tabs.Item>
          </Tabs>
        </div>
        {/* footer */}
      </div>
    </div>
  );
};

export default Page;
