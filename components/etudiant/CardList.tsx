import React, { useState } from "react";
import { Button, Modal, Pagination, Dropdown, Datepicker, Label, FileInput } from "flowbite-react";
import { Combobox } from "@headlessui/react";
import { FaSearch } from "react-icons/fa";
import { Stage } from "@/types";

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
  data: Stage[];
}

const CardList: React.FC<CardListProps> = ({ data }) => {
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [dateDebut, setDateDebut] = useState<Date | null>(null);
  const [dateFin, setDateFin] = useState<Date | null>(null);
  const [selectedTips, setSelectedTips] = useState<string[]>([]);
  const CARDS_PER_PAGE = 9;

  // Filter cards based on query, dates, and selected tips
  const filteredCards = data.filter((card) => {
    const matchesQuery = query
      ? `${card.titre} ${card.description} ${card.abbreviation}`.toLowerCase().includes(query.toLowerCase())
      : true;

    const cardStartDate = new Date(card.dateDebut);
    const cardEndDate = new Date(card.dateFin);
    const matchesDates =
      (!dateDebut || cardStartDate >= dateDebut) &&
      (!dateFin || cardEndDate <= new Date(dateFin.getTime() + 86400000 - 1));

    const matchesTips = selectedTips.length === 0 || selectedTips.includes(card.abbreviation);

    return matchesQuery && matchesDates && matchesTips;
  });

  const totalPages = Math.ceil(filteredCards.length / CARDS_PER_PAGE);
  const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const currentCards = filteredCards.slice(startIndex, startIndex + CARDS_PER_PAGE);

  const handleTipChange = (tip: string) => {
    setSelectedTips((prev) => (prev.includes(tip) ? prev.filter((item) => item !== tip) : [...prev, tip]));
  };

  return (
    <div>
      {/* Filters Section */}
      <div className="flex items-center space-x-4 py-2 justify-center">
        <Datepicker onChange={(date: Date | null) => setDateDebut(date)} placeholder="Start Date" />
        <p className="">to</p>
        <Datepicker onChange={(date: Date | null) => setDateFin(date)} placeholder="End Date" />
        <Dropdown label="Type Stage" size="sm">
          <div className="px-4 py-2">
            {Array.from(new Set(data.map((stage) => stage.abbreviation))).map((abbr) => (
              <label key={abbr} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleTipChange(abbr)}
                  checked={selectedTips.includes(abbr)}
                />
                <span>{abbr}</span>
              </label>
            ))}
          </div>
        </Dropdown>
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-4 py-2 mb-2 m-auto justify-center w-1/3">
        <SearchCards query={query} setQuery={setQuery} />
      </div>

      {/* Card List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentCards.map((card, index) => (
          <div key={index} className="border rounded-md p-4 shadow-md bg-white flex flex-col">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{card.titre}</h2>
            </div>
            <div className="flex-grow mb-4">
              <p className="text-gray-700 mt-2">{card.description}</p>
            </div>
            <div className="mt-auto">
              <p className="text-gray-700 mt-2 font-bold">
                {new Date(card.dateDebut).toLocaleDateString()} - {new Date(card.dateFin).toLocaleDateString()}
              </p>
              <Button className="mt-4 w-1/3" onClick={() => setOpenModalIndex(startIndex + index)}>
                Read more
              </Button>
            </div>
            <Modal dismissible show={openModalIndex === startIndex + index} onClose={() => setOpenModalIndex(null)}>
              <Modal.Header>{card.titre}</Modal.Header>
              <Modal.Body>
                <div className="space-y-6">
                  <p className="text-base leading-relaxed text-gray-500">{card.description}</p>
                  <p>
                    <strong>Gestionnaire:</strong> {card.gestionnaire.user.nom} {card.gestionnaire.user.prenom}
                  </p>
                  <p>
                    <strong>Entreprise:</strong> {card.gestionnaire.entreprise.nomEntreprise}
                  </p>
                  <p>
                    <strong>Abbreviation:</strong> {card.abbreviation}
                  </p>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => setOpenModalIndex(null)}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} showIcons />
      </div>
    </div>
  );
};

export default CardList;
