import React, { useState } from "react";
import {
  Button,
  Modal,
  Pagination,
  Dropdown,
  Datepicker,
  Label,
  FileInput,
} from "flowbite-react";
import { Combobox } from "@headlessui/react";
import { FaSearch } from "react-icons/fa";
import { Candidature } from "@/types";

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
            placeholder="Rechercher par titre ou description..."
          />
        </div>
      </Combobox>
    </div>
  );
};

interface CardList3Props {
  data: Candidature[];
}

const CandidatureList: React.FC<CardList3Props> = ({ data }) => {
  // console.log("Candidature : " + data);
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [dateDebut, setDateDebut] = useState<Date | null>(null);
  const [dateFin, setDateFin] = useState<Date | null>(null);
  const [selectedTips, setSelectedTips] = useState<string[]>([]);
  const [selectedStats, setSelectedStats] = useState<string[]>([]);
  const CARDS_PER_PAGE = 9;

  // Filter cards based on query, dates, and selected tips
  const filteredCards = (data || []).filter((card) => {
    const matchesQuery = query
      ? `${card.stage.titre} ${card.stage.description} ${card.stage.abbreviation} ${card.stage.tags}`
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

    const matchesStats =
      selectedStats.length === 0 ||
      selectedStats.some((stat) => card.statutCandidature.includes(stat));

    return matchesQuery && matchesDates && matchesTips && matchesStats;
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

  const handleStatChange = (stat: string) => {
    setSelectedStats((prev) =>
      prev.includes(stat)
        ? prev.filter((item) => item !== stat)
        : [...prev, stat]
    );
  };

  //   Modal
  const getModalContent = (statut: string) => {
    switch (statut) {
      case "ACCEPTEE":
        return (
          <p className="text-green-700">
            Cette offre a été <strong>acceptée</strong>. Félicitations !
            <br />
            Consultez votre email pour plus d'informations.
          </p>
        );
      case "EN_ATTENTE":
        return (
          <p className="text-yellow-700">
            Cette offre est toujours <strong>en attente</strong>. Veuillez
            patienter pour de prochaines mises à jour.
          </p>
        );
      case "REFUSEE":
        return (
          <p className="text-red-700">
            Cette offre a été <strong>refusée</strong>. Bonne chance la
            prochaine fois !
            <br />
            Consultez votre email pour plus d'informations.
          </p>
        );
      default:
        return <p className="text-gray-900">You Canceled your Candiadature</p>;
    }
  };
  return (
    <div>
      {/* Filters Section */}
      <div className="flex items-center space-x-4 py-2 justify-center">
        <SearchCards query={query} setQuery={setQuery} />
        <Datepicker
          language="fr-FR"
          // selected={dateDebut}
          onChange={(date: Date | null) => setDateDebut(date)}
          placeholder="Date Debut"
        />
        <p className=""> - </p>
        <Datepicker
          language="fr-FR"
          // selected={dateFin}
          onChange={(date: Date | null) => setDateFin(date)}
          placeholder="Date Fin"
        />
        <div className="flex items-center gap-4 px-2">
          <Dropdown label="Type Stage" size="sm">
            <div className="px-4 py-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleTipChange("PFA_1A")}
                  checked={selectedTips.includes("PFA_1A")}
                />
                <span>PFA-1A</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleTipChange("PFA_2A")}
                  checked={selectedTips.includes("PFA_2A")}
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
        {/* statut  */}
        <div className="flex items-center gap-4 px-2">
          <Dropdown label="Stat Stage" size="sm">
            <div className="px-4 py-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleStatChange("EN_ATTENTE")}
                  checked={selectedStats.includes("EN_ATTENTE")}
                />
                <span>En Attente</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleStatChange("ACCEPTEE")}
                  checked={selectedStats.includes("ACCEPTEE")}
                />
                <span>Acceptée</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleStatChange("REFUSEE")}
                  checked={selectedStats.includes("REFUSEE")}
                />
                <span>Refusée</span>
              </label>
              {/* <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleStatChange("Annuler")}
                  checked={selectedStats.includes("Annuler")}
                />
                <span>Annulée</span>
              </label> */}
            </div>
          </Dropdown>
        </div>
      </div>

      {/* Card List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentCards.map((card, index) => (
          <div
            key={index}
            className={`border rounded-md p-4 shadow-md flex flex-col 
                ${
                  card.statutCandidature === "ACCEPTEE"
                    ? "bg-green-300"
                    : card.statutCandidature === "REFUSEE"
                    ? "bg-red-300"
                    : // : card.statutCandidature === "REFUSEE"
                      // ? "bg-gray-300"
                      "bg-yellow-100"
                }`}
          >
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {card.stage.titre}
              </h2>
            </div>
            <div className="flex-grow mb-4">
              <p className="text-gray-700 mt-2">{card.stage.description}</p>
            </div>
            <div className="mt-auto">
              <p className="text-gray-700 mt-2 font-bold">
                {card.stage.dateDebut.replaceAll("-", "/").split("T")[0]} -{" "}
                {card.stage.dateFin.replaceAll("-", "/").split("T")[0]}
                {/* : {card.statutCandidature} */}
              </p>
              <div className="mt-2">
                <strong>Tags:</strong> {card.stage.tags}
              </div>
              <Button
                className="mt-4 w-1/3"
                onClick={() => setOpenModalIndex(startIndex + index)}
              >
                Voir
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
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {card.stage.description}
                  </p>
                  <ul className="list-disc pl-5 text-gray-500">
                    {card.stage.abbreviation}
                  </ul>
                </div>
              </Modal.Body>
              <Modal.Footer>
                {getModalContent(card.statutCandidature)}
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

export default CandidatureList;
