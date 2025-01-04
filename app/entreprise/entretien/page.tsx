"use client"; // Add this line at the top of your file

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React, { useEffect, useState } from "react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataOffres, setDataOffres] = useState([]);

  // Function to toggle modal visibility
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Fetch jobs data when the component is mounted
  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch("/jobs.json");
      const data = await response.json();
      setDataOffres(data);
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <div className="container m-auto p-8 ">
        {/* offres List  */}
        {/* <OffersListPage /> */}
        {/* footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Page;
