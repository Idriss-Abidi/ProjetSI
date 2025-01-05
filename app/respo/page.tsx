"use client"; // Add this line at the top of your file

import React, { use, useEffect, useState } from "react";
import OffersListPage from "@/components/respo/AlloffersPage";
import Footer from "@/components/Footer";
import NavbarRespo from "@/components/respo/NavbarRespo";

const Page = () => {
  const [dataOffres, setDataOffres] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const offresResponse = await fetch("http://localhost:8080/stage/all");
        const offresResponse = await fetch("/db/offre.json");
        const offresData = await offresResponse.json();
        setDataOffres(offresData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  });

  return (
    <div>
      <NavbarRespo />
      <div className="container m-auto p-8 ">
        {/* offres List  */}
        <OffersListPage data={dataOffres} />
        {/* footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Page;
