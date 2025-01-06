"use client"; // Add this line at the top of your file

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React, { use, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import { HiArrowRight } from "react-icons/hi";
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
import FormComponent from "@/components/Others/FormComponent";
import OffersListPage from "@/components/entreprise/offersPage";
import Footer from "@/components/Footer";
import NavbarEntreprise from "@/components/entreprise/NavbarEntreprise";
import useFetch from "@/utils/useFetch";
import { BASE_URL } from "@/constants/baseUrl";
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
  const { data: dataOffres = [] } = useFetch(`${BASE_URL}/stage/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  // Data for the charts
  const data1 = {
    labels: ["PFA-1A", "PFA-2A", "PFE"],
    datasets: [
      {
        data: [30, 40, 30],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const data2 = {
    labels: ["En attente", "Entretiens", "En cour"],
    datasets: [
      {
        data: [70, 20, 10],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
        hoverBackgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
      },
    ],
  };

  const lineChartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Candidatures per Month",
        data: [5, 10, 8, 15, 20, 25, 30, 18, 22, 28, 35, 40],
        fill: false,
        borderColor: "#36A2EB",
        tension: 0.3,
      },
    ],
  };

  return (
    <div>
      {/* <NavbarEntreprise /> */}

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

        {/* Dashboard */}
        <div className="grid grid-flow-row-dense grid-row-2 grid-cols-4 gap-0 mb-20 mt-10">
          <div className=" m-auto row-span-2">
            <h3 className="text-center mb-4 text-xl font-semibold">
              Stage Types
            </h3>
            <Pie data={data1} className="w-[250px] h-[250px]" />
          </div>

          <div className=" col-span-2 row-span-2 m-0">
            <h3 className="text-center text-xl font-semibold">
              Candidatures per Month
            </h3>
            <Line data={lineChartData} className="w-[480px] h-[270px]" />
          </div>

          <div className=" m-auto row-span-2">
            <h3 className="text-center mb-4 text-xl font-semibold">
              Status Breakdown
            </h3>
            <Pie data={data2} className="w-[250px] h-[250px]" />
          </div>
        </div>

        {/* form */}

        <div className="container mx-auto px-4 w-2/3" id="addStage">
          <FormComponent />
        </div>

        {/* <OffersListPage /> */}
        {/* footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Page;
