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

// CardList Component
interface CardData {
  title: string;
  description: string;
  date_debut: string;
  date_fin: string;
  type: string[];
  statut: string;
}

interface CardList3Props {
  data: CardData[];
}

const CandidatureList: React.FC<CardList3Props> = ({ data }) => {
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [dateDebut, setDateDebut] = useState<Date | null>(null);
  const [dateFin, setDateFin] = useState<Date | null>(null);
  const [selectedTips, setSelectedTips] = useState<string[]>([]);
  const [selectedStats, setSelectedStats] = useState<string[]>([]);
  const CARDS_PER_PAGE = 9;

  // Filter cards based on query, dates, and selected tips
  const filteredCards = data.filter((card) => {
    const matchesQuery = query
      ? `${card.title} ${card.description} ${card.type.join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase())
      : true;

    const cardStartDate = new Date(card.date_debut);
    const cardEndDate = new Date(card.date_fin);
    const matchesDates =
      (!dateDebut || cardStartDate >= dateDebut) &&
      (!dateFin || cardEndDate <= new Date(dateFin.getTime() + 86400000 - 1));

    const matchesTips =
      selectedTips.length === 0 ||
      selectedTips.some((tip) => card.type.includes(tip));

    const matchesStats =
      selectedStats.length === 0 ||
      selectedStats.some((stat) => card.statut.includes(stat));

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
      case "Accepted":
        return (
          <p className="text-green-700">
            This offer has been <strong>Accepted</strong>. Congratulations!
            <br />
            Check your email for more informations.
          </p>
          /* <div className="w-2/3 justify-self-center content-center ">
                  <div>
                    <Label htmlFor="cv-upload" />
                  </div>
                  <FileInput id="cv-upload" sizing="sm" />
                </div>
                <Button onClick={() => setOpenModalIndex(null)}>
                  I accept
                </Button>
                <Button color="gray" onClick={() => setOpenModalIndex(null)}>
                  Decline
                </Button> */
        );
      case "En att":
        return (
          <p className="text-yellow-700">
            This offer is still <strong>Pending</strong>. Please wait for
            further updates.
          </p>
        );
      case "Rejected":
        return (
          <p className="text-red-700">
            This offer has been <strong>Rejected</strong>. Better luck next
            time!
            <br />
            Check your email for more informations.
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
          placeholder="Start Date"
        />
        <p className="">to</p>
        <Datepicker
          language="fr-FR"
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
        {/* statut  */}
        <div className="flex items-center gap-4 px-2">
          <Dropdown label="Stat Stage" size="sm">
            <div className="px-4 py-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleStatChange("En att")}
                  checked={selectedStats.includes("En att")}
                />
                <span>En att</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleStatChange("Accepted")}
                  checked={selectedStats.includes("Accepted")}
                />
                <span>Accepted</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleStatChange("Rejected")}
                  checked={selectedStats.includes("Rejected")}
                />
                <span>Rejected</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleStatChange("Annuler")}
                  checked={selectedStats.includes("Annuler")}
                />
                <span>Annuler</span>
              </label>
            </div>
          </Dropdown>
        </div>
      </div>

      {/* Search Bar */}
      {/* <div className="flex items-center space-x-4 py-2 mb-2 m-auto justify-center w-1/3">
        <SearchCards query={query} setQuery={setQuery} />
      </div> */}

      {/* Card List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentCards.map((card, index) => (
          <div
            key={index}
            className={`border rounded-md p-4 shadow-md flex flex-col 
                ${
                  card.statut === "Accepted"
                    ? "bg-green-300"
                    : card.statut === "Rejected"
                    ? "bg-red-300"
                    : card.statut === "Annuler"
                    ? "bg-gray-300"
                    : "bg-yellow-100"
                }`}
          >
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{card.title}</h2>
            </div>
            <div className="flex-grow mb-4">
              <p className="text-gray-700 mt-2">{card.description}</p>
            </div>
            <div className="mt-auto">
              <p className="text-gray-700 mt-2 font-bold">
                {card.date_debut} - {card.date_fin} : {card.statut}
              </p>
              {/* <div className="mt-2">
                <strong>Tips:</strong> {card.tips.join(", ")}
              </div> */}
              <Button
                className="mt-4 w-1/3"
                onClick={() => setOpenModalIndex(startIndex + index)}
              >
                Read more
              </Button>
            </div>
            <Modal
              dismissible
              show={openModalIndex === startIndex + index}
              onClose={() => setOpenModalIndex(null)}
            >
              <Modal.Header>{card.title}</Modal.Header>
              <Modal.Body>
                <div className="space-y-6">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {card.description}
                  </p>
                  <ul className="list-disc pl-5 text-gray-500">
                    {card.type.map((tip, tipIndex) => (
                      <li key={tipIndex}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </Modal.Body>
              <Modal.Footer>
                {/* <div className="w-2/3 justify-self-center content-center ">
                  <div>
                    <Label htmlFor="cv-upload" />
                  </div>
                  <FileInput id="cv-upload" sizing="sm" />
                </div>
                <Button onClick={() => setOpenModalIndex(null)}>
                  I accept
                </Button>
                <Button color="gray" onClick={() => setOpenModalIndex(null)}>
                  Decline
                </Button> */}
                {getModalContent(card.statut)}
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
