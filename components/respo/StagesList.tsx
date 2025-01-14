import React, { useState } from "react";
import {
  Button,
  Modal,
  Pagination,
  Dropdown,
  Datepicker,
  Label,
  FileInput,
  TextInput,
  Card,
} from "flowbite-react";
import { Combobox } from "@headlessui/react";
import { FaSearch } from "react-icons/fa";
import { Convention, RemarqueStage } from "@/types";
import { BASE_URL } from "@/constants/baseUrl";
import ConventionButton from "./ConventionButton";
import PdfFormFiller from "./ConventionButton";
// SearchCards Component
interface SearchCardsProps {
  query: string;
  setQuery: (value: string) => void;
}
const SearchCards: React.FC<SearchCardsProps> = ({ query, setQuery }) => {
  return (
    <div className="flex-1 w-full md:w-4/12 max-sm:w-full flex justify-start items-center">
      <Combobox value={query} onChange={(value) => setQuery(value ?? "")}>
        <div className="relative w-full md:w-66 md:m-auto">
          <Combobox.Button className="absolute top-[14px] left-3">
            <FaSearch className="text-gray-400" size={20} />
          </Combobox.Button>
          <Combobox.Input
            className="w-full h-[48px] pl-16 p-4 rounded-l-full max-sm:rounded-full bg-light-white outline-none cursor-pointer text-sm"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title or description..."
          />
        </div>
      </Combobox>
    </div>
  );
};

interface CardListProps {
  data: RemarqueStage[];
}
const StagesList: React.FC<CardListProps> = ({ data }) => {
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [dateDebut, setDateDebut] = useState<Date | null>(null);
  const [dateFin, setDateFin] = useState<Date | null>(null);
  const [selectedTips, setSelectedTips] = useState<string[]>([]);
  const [conventionPath, setConventionPath] = useState<string>("");
  const [selectedConvention, setSelectedConvention] =
    useState<Convention | null>(null);

  const CARDS_PER_PAGE = 9;

  // Filter cards based on query, dates, and selected tips
  const filteredCards = data.filter((card) => {
    const matchesQuery = query
      ? `${card.stage.titre} ${card.etudiant.user.nom} ${card.etudiant.user.prenom} ${card.stage.gestionnaire.entreprise.nomEntreprise} ${card.stage.tuteur.user.nom} ${card.stage.tuteur.user.prenom} ${card.etudiant.niveau}`
          .toLowerCase()
          .includes(query.toLowerCase())
      : true;
    const cardStartDate = new Date(card.stage.dateDebut);
    const cardEndDate = new Date(card.stage.dateFin);
    const matchesDates =
      (!dateDebut || cardStartDate >= dateDebut) &&
      (!dateFin || cardEndDate <= new Date(dateFin.getTime() + 86400000 - 1));
    const matchesTips =
      selectedTips.length === 0 ||
      selectedTips.some((tip) => card.stage.abbreviation.includes(tip));
    return matchesQuery && matchesDates && matchesTips;
  });

  const totalPages = Math.ceil(filteredCards.length / CARDS_PER_PAGE);
  const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const currentCards = filteredCards.slice(
    startIndex,
    startIndex + CARDS_PER_PAGE
  );

  const handleTipChange = (tip: string) => {
    setSelectedTips((prev) =>
      prev.includes(tip) ? prev.filter((item) => item !== tip) : [...prev, tip]
    );
  };

  // Handle file upload change to set the convention path
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setConventionPath(file.name); // Or file path if needed
    }
  };

  const handleConfirmClick = async (
    // selectedConvention: Convention | null, // Convention data
    // selectedStage: number, // Stage data
    conventionPdf: string, // Path of the convention file
    selectedStage: RemarqueStage
  ) => {
    if (conventionPdf) {
      // Second JSON: conventionJson
      const conventionJson = {
        // Use user input or selected
        conventionPdf,
        id_etudiant: selectedStage.etudiant.idEtudiant,
        id_tuteur: selectedStage.stage.tuteur.idTuteur,
        id_stage: selectedStage.stage.idStage,
        dateDebut: selectedStage.stage.dateDebut,
        dateFin: selectedStage.stage.dateFin,
        sujet: selectedStage.stage.titre,
      };

      const response1 = await fetch(
        `${BASE_URL}/remarques-stage/${selectedStage.idRemarque}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            statutRemarqueStage: "EN_COURS",
          }),
        }
      );

      if (!response1.ok) {
        console.error("Error accepting stage:", response1.statusText);
        return;
      }
      console.log("Convention JSON:", JSON.stringify(conventionJson, null, 2)); // Log the second JSON

      // Schedule an interview
      const response2 = await fetch(`${BASE_URL}/convention`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(conventionJson, null, 2),
      });

      if (!response2.ok) {
        console.error("Error convention:", response2.statusText);
        return;
      }

      if (response2.ok && response2.ok) {
        setConventionPath("");
        window.location.reload();
      }
      // Clear convention path (file name or path)
      // Here you can send the generated JSON to an API or perform further actions
      alert("Done");
    }
  };

  return (
    <div>
      {/* Filters Section */}
      <div className="flex items-center space-x-4 py-2 justify-center">
        <SearchCards query={query} setQuery={setQuery} />

        <Datepicker
          // selected={dateDebut}
          onChange={(date: Date | null) => setDateDebut(date)}
          placeholder="Start Date"
        />
        <p className="">to</p>
        <Datepicker
          // selected={dateFin}
          onChange={(date: Date | null) => setDateFin(date)}
          placeholder="End Date"
        />
        <div className="flex items-center gap-4 px-2">
          <Dropdown label="Type Stage" size="sm">
            <div className="px-4 py-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleTipChange("PFA-1A")}
                  checked={selectedTips.includes("PFA-1A")}
                />
                <span>PFA-1A</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleTipChange("PFA-2A")}
                  checked={selectedTips.includes("PFA-2A")}
                />
                <span>PFA-2A</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleTipChange("PFE")}
                  checked={selectedTips.includes("PFE")}
                />
                <span>PFE</span>
              </label>
            </div>
          </Dropdown>
        </div>
      </div>
      {/* Card List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentCards.map((card, index) => (
          <div
            key={index}
            className="border rounded-md p-4 shadow-md bg-white flex flex-col"
          >
            <div className="mb-4">
              <h5 className="text-xl font-bold text-gray-900">
                Stage : {card.stage.titre}
              </h5>
              <h5 className="text-xl font-bold text-gray-900">
                Entreprise : {card.stage.gestionnaire.entreprise.nomEntreprise}
              </h5>
              <h5 className="text-xl font-bold text-gray-900">
                Etudiant : {card.etudiant.user.nom} {card.etudiant.user.prenom}
              </h5>
              <h5 className="text-xl font-bold text-gray-900">
                Tuteur : {card.stage.tuteur.user.nom}{" "}
                {card.stage.tuteur.user.prenom}
              </h5>
            </div>
            <div className="mt-auto">
              <p className="text-gray-700 mt-2 font-bold">
                {card.stage.dateDebut} - {card.stage.dateFin}
              </p>
              {/* <div className="mt-2">
                <strong>Tips:</strong> {card.tips.join(", ")}
              </div> */}
              <Button
                className="mt-4 w-1/3"
                onClick={() => setOpenModalIndex(startIndex + index)}
              >
                Accepter
              </Button>
            </div>
            <Modal
              dismissible
              show={openModalIndex === startIndex + index}
              onClose={() => setOpenModalIndex(null)}
            >
              <Modal.Header>{card.stage.titre}</Modal.Header>
              <Modal.Body>
                <div className="space-y-6">
                  <div className="mt-auto">
                    <h5 className="text-md font-bold text-gray-900">
                      Stage : {card.stage.titre}
                    </h5>
                    <h5 className="text-md font-bold text-gray-900">
                      Entreprise :{" "}
                      {card.stage.gestionnaire.entreprise.nomEntreprise}
                    </h5>
                    <h5 className="text-md font-bold text-gray-900">
                      Etudiant : {card.etudiant.user.nom}{" "}
                      {card.etudiant.user.prenom}
                    </h5>
                    <h5 className="text-md font-bold text-gray-900">
                      Tuteur : {card.stage.tuteur.user.nom}{" "}
                      {card.stage.tuteur.user.prenom}
                    </h5>
                    <p className="text-gray-700 font-bold">
                      Duree : {card.stage.dateDebut} - {card.stage.dateFin}
                    </p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      {card.stage.description}
                    </p>
                    <ul className="list-disc pl-5 text-gray-500">
                      {card.stage.abbreviation}
                    </ul>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                {/* Convention File Upload */}
                <div className="justify-self-center content-center">
                  <div>
                    <Label
                      htmlFor="convention-upload"
                      className="text-gray-700"
                    >
                      Générer Convention
                    </Label>
                  </div>
                  <PdfFormFiller
                    etudiant={`${card.etudiant.user.nom} ${card.etudiant.user.prenom}`}
                    entreprise={
                      card.stage.gestionnaire.entreprise.nomEntreprise
                    }
                    sujet={card.stage.titre}
                  />
                </div>
                {/* Action Buttons */}
                <div className="flex justify-between mt-6">
                  <Button
                    onClick={() =>
                      handleConfirmClick(
                        conventionPath,
                        card // Card data passed to the function
                      )
                    }
                    className="w-full sm:w-auto"
                  >
                    Confirmer
                  </Button>
                  {/* Show success message if statut was updated */}

                  <Button
                    color="gray"
                    onClick={() => setOpenModalIndex(null)}
                    className="w-full sm:w-auto"
                  >
                    Annuler
                  </Button>
                </div>
              </Modal.Footer>
            </Modal>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          showIcons
        />
      </div>
    </div>
  );
};
export default StagesList;
