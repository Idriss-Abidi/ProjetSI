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
import { NumberValue } from "d3";
import { Stage } from "@/types";
import { getUserInfo } from "@/utils/userInfo";

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
function formatDate(date: string | number | Date) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  //@ts-ignore
  return new Date(date).toLocaleDateString("fr-FR", options);
}
interface CardList3Props {
  data: Stage[];
}
const CardList: React.FC<CardList3Props> = ({ data }) => {
  const token = localStorage.getItem("token");
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
      ? `${card.titre} ${card.description} ${card.abbreviation}`
          .toLowerCase()
          .includes(query.toLowerCase())
      : true;
    const cardStartDate = new Date(card.dateDebut);
    const cardEndDate = new Date(card.dateFin);
    const matchesDates =
      (!dateDebut || cardStartDate >= dateDebut) &&
      (!dateFin || cardEndDate <= new Date(dateFin.getTime() + 86400000 - 1));
    const matchesTips =
      selectedTips.length === 0 ||
      selectedTips.some((tip) => card.abbreviation.includes(tip));
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

  const [cvPath, setCvPath] = useState("");

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files; // Vérifiez si `files` n'est pas null
    if (files && files[0]) {
      const file = files[0];
      // Mettez à jour le chemin du CV avec l'URL ou le nom du fichier
      setCvPath(file.name); // Vous pouvez également ajouter une logique pour uploader le fichier ici
    }
  }
  async function handleSubmit(idStg: number, cvpath: string) {
    try {
      // Get user information using the async function
      const userInfo = await getUserInfo(token);
      console.log("User Info:", userInfo);

      // Create an object to submit the data
      const formData = {
        id_etudiant: userInfo.idEtudiant, // Assuming userInfo contains the user ID or relevant data
        id_stage: idStg,
        cv_path: cvpath,
      };

      // Log the form data
      console.log("Submitting:", formData);

      // Example API call (uncomment and modify as needed)
      const response = await fetch("http://89.168.40.93/candidater", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(formData),
      });

      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }

      //   const responseData = await response.json();
      //   console.log("Success:", responseData);
    } catch (error) {
      console.error("Error handling submit:", error);
    }
  }

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
          <Dropdown label="abbreviation Stage" size="sm">
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
              <h2 className="text-2xl font-bold text-gray-900">{card.titre}</h2>
            </div>
            <div className="flex-grow mb-4">
              <p className="text-gray-700 mt-2">{card.description}</p>
            </div>
            <div className="mt-auto">
              <p className="text-gray-700 mt-2 font-bold">
                {formatDate(card.dateDebut)} - {formatDate(card.dateFin)}
              </p>

              {/* <div className="mt-2">
                <strong>Tips:</strong> {card.tips.join(", ")}
              </div> */}
              <Button
                className="mt-4 w-1/3"
                onClick={() => setOpenModalIndex(startIndex + index)}
              >
                VOIR
              </Button>
            </div>
            <Modal
              dismissible
              show={openModalIndex === startIndex + index}
              onClose={() => setOpenModalIndex(null)}
            >
              <Modal.Header>{card.titre}</Modal.Header>
              <Modal.Body>
                <div className="space-y-2">
                  <h4>Description: </h4>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {card.description}
                  </p>
                  <h4>Type de Stage:</h4>
                  <ul className="list-disc pl-5 text-gray-500">
                    {/* {card.abbreviation.map((tip, tipIndex) => (
                      <li key={tipIndex}>{tip}</li>
                    ))} */}
                    {card.abbreviation}
                  </ul>
                  <h4>Tags:</h4>
                  <ul className="list-disc pl-5 text-gray-500">
                    {card.tags?.split(",").map((tag, tagIndex) => (
                      <li key={tagIndex}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="w-2/3 justify-self-center content-center">
                  <div>
                    <Label htmlFor="cv-upload" />
                  </div>
                  <FileInput
                    id="cv-upload"
                    sizing="sm"
                    onChange={(e) => handleFileUpload(e)}
                  />
                </div>
                <Button
                  onClick={() => {
                    handleSubmit(card.idStage, cvPath); // Replace '1' with the appropriate student ID if available
                    setOpenModalIndex(null);
                  }}
                >
                  Postuler
                </Button>
                <Button color="gray" onClick={() => setOpenModalIndex(null)}>
                  Annuler
                </Button>
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
export default CardList;
