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
interface Convention {
  CodeConvention: string;
  id_etudiant: number; // Changed to number
  id_offre: number; // Changed to number
  id_tuteur: number; // Changed to number
  id_entreprise: number; // Changed to number
}

interface CardData {
  id_stage: number;
  title: string;
  description: string;
  date_debut: string;
  date_fin: string;
  type: string[]; // Array of types (e.g., "PFA-1A")
  tags: string[]; // Array of tags (e.g., "React Native", "Swift")
  id_etudiant: number;
  CNE: string;
  promo: string;
  niveau: string;
  filiere: string;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  userType: string; // Restricted to the value "ETUDIANT"
  tel: string;
  statut_etudiant: number; // 0 or 1
  statut: string; // En att, start, Interrupted, end
  conventionCode: string;

  id_tuteur: number;
  nom_tuteur: string;
  prenom_tuteur: string;
  email_tuteur: string;
  tel_tuteur: string;
  note: number | null;
  remarques: string;

  id_entreprise: number;
  entreprise: string;
}

interface CardList3Props {
  data: CardData[];
}

const CardList: React.FC<CardList3Props> = ({ data }) => {
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [dateDebut, setDateDebut] = useState<Date | null>(null);
  const [dateFin, setDateFin] = useState<Date | null>(null);
  const [selectedTips, setSelectedTips] = useState<string[]>([]);
  const [conventionPath, setConventionPath] = useState<string>("");
  const [conventionCode, setConventionCode] = useState<string>("");
  const [selectedConvention, setSelectedConvention] =
    useState<Convention | null>(null);

  const CARDS_PER_PAGE = 9;

  // Filter cards based on query, dates, and selected tips
  const filteredCards = data.filter((card) => {
    const matchesQuery = query
      ? `${card.title} ${card.nom} ${card.prenom} ${card.entreprise} ${
          card.nom_tuteur
        } ${card.prenom_tuteur} ${card.type.join(" ")}`
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

  // Handle convention code input change
  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConventionCode(event.target.value);
  };

  const handleConfirmClick = (
    // selectedConvention: Convention | null, // Convention data
    selectedStage: CardData, // Stage data
    conventionPath: string, // Path of the convention file
    conventionCode: string // Code of the convention
  ) => {
    if (conventionCode) {
      // First JSON: stageJson
      const stageJson = {
        CodeConvention: conventionCode, // Use user input or selected
        id_stage: selectedStage.id_stage,
        id_etudiant: selectedStage.id_etudiant,
        statut: "start",
        statut_etudiant: 1,
      };

      // Second JSON: conventionJson
      const conventionJson = {
        CodeConvention: conventionCode, // Use user input or selected
        path: conventionPath,
        id_etudiant: selectedStage.id_etudiant,
        id_tuteur: selectedStage.id_tuteur,
        id_entreprise: selectedStage.id_entreprise,
        id_stage: selectedStage.id_stage,
      };

      console.log("Stage JSON:", JSON.stringify(stageJson, null, 2)); // Log the first JSON
      console.log("Convention JSON:", JSON.stringify(conventionJson, null, 2)); // Log the second JSON

      setConventionCode(""); // Clear convention code input
      setConventionPath(""); // Clear convention path (file name or path)
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
                Stage : {card.title}
              </h5>
              <h5 className="text-xl font-bold text-gray-900">
                Entreprise : {card.entreprise}
              </h5>
              <h5 className="text-xl font-bold text-gray-900">
                Etudiant : {card.nom} {card.prenom}
              </h5>
              <h5 className="text-xl font-bold text-gray-900">
                Tuteur : {card.nom_tuteur} {card.prenom_tuteur}
              </h5>
            </div>
            <div className="mt-auto">
              <p className="text-gray-700 mt-2 font-bold">
                {card.date_debut} - {card.date_fin}
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
              <Modal.Header>{card.title}</Modal.Header>
              <Modal.Body>
                <div className="space-y-6">
                  <div className="mt-auto">
                    <h5 className="text-md font-bold text-gray-900">
                      Stage : {card.title}
                    </h5>
                    <h5 className="text-md font-bold text-gray-900">
                      Entreprise : {card.entreprise}
                    </h5>
                    <h5 className="text-md font-bold text-gray-900">
                      Etudiant : {card.nom} {card.prenom}
                    </h5>
                    <h5 className="text-md font-bold text-gray-900">
                      Tuteur : {card.nom_tuteur} {card.prenom_tuteur}
                    </h5>
                    <p className="text-gray-700 font-bold">
                      Duree : {card.date_debut} - {card.date_fin}
                    </p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      {card.description}
                    </p>
                    <ul className="list-disc pl-5 text-gray-500">
                      {card.type.map((tip, tipIndex) => (
                        <li key={tipIndex}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                {/* Convention File Upload */}
                <div className="w-2/3 justify-self-center content-center">
                  <div>
                    <Label
                      htmlFor="convention-upload"
                      className="text-gray-700"
                    >
                      Upload Convention
                    </Label>
                  </div>
                  <FileInput
                    id="convention-upload"
                    sizing="sm"
                    onChange={handleFileChange} // Handle file input change
                  />
                </div>

                {/* Convention Code Input */}
                <div className="mt-4">
                  <Label htmlFor="convention-code" className="text-gray-700">
                    Convention Code
                  </Label>
                  <TextInput
                    id="convention-code"
                    value={conventionCode}
                    onChange={handleCodeChange}
                    placeholder="Enter Convention Code"
                    sizing="sm"
                    required
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-6">
                  <Button
                    onClick={() =>
                      handleConfirmClick(
                        // selectedConvention, // Ensure selectedConvention is defined correctly, maybe passed as a prop or state
                        card, // Card data passed to the function
                        conventionPath,
                        conventionCode
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
export default CardList;
