"use client";

import React, { useEffect, useState } from "react";
import OffersListPage from "@/components/respo/AlloffersPage";
import Footer from "@/components/Footer";
import NavbarRespo from "@/components/respo/NavbarRespo";
import { BASE_URL } from "@/constants/baseUrl";
import Loading from "@/components/Loading";

const Page = () => {
  const [dataOffres, setDataOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/stage/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setDataOffres(data);
      } catch (err) {
        //@ts-ignore
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div>
      <NavbarRespo />
      <div className="container m-auto p-8 ">
        {/* Error Message */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded mb-4">{error}</div>
        )}

        {/* Loading State */}
        {loading ? <Loading /> : <OffersListPage data={dataOffres} />}

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Page;
