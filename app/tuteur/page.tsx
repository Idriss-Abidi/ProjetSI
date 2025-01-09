"use client";

import React, { useState } from "react";
import Footer from "@/components/Footer";
import NavbarTuteur from "@/components/tuteur/NavbarTuteur";
import OffersListPage from "@/components/tuteur/offresPage";
import { BASE_URL } from "@/constants/baseUrl";
import useFetch from "@/utils/useFetch";

export default function Page() {
  const token = localStorage.getItem("token") || "";
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const idTuteur = decodedToken.entityId
  const { data: dataOffres } = useFetch(`${BASE_URL}/remarques-stage/${idTuteur}`, {
    headers: { Authorization: "Bearer " + token },
  });

  return (
    <div>
      <NavbarTuteur id={idTuteur} />
      <div className="container m-auto p-8 ">
        <OffersListPage data={dataOffres} />
      </div>
      <Footer />
    </div>
  );
}
