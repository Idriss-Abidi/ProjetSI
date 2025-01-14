import { useState, useEffect } from "react";
import { Modal, Button, Label, Dropdown } from "flowbite-react";
import { Etudiant, Filiere, Stage } from "@/types";
import axios from "axios";
import { BASE_URL } from "@/constants/baseUrl";

interface DataList {
  data: Stage[];
  etds: Etudiant[];
}

const AffectationForm: React.FC<DataList> = ({ data, etds }) => {
  const [offers, setOffers] = useState<Stage[]>([]);
  const [etudiants, setEtudiants] = useState<Etudiant[]>([]);
  const [editingOffer, setEditingOffer] = useState<Stage | null>(null);
  const [selectedEtudiants, setSelectedEtudiants] = useState<number[]>([]);
  const [selectedNiveau, setSelectedNiveau] = useState<string[]>([]);
  const [selectedFiliere, setSelectedFiliere] = useState<string[]>([]);
  const [selectedTips, setSelectedTips] = useState<string[]>([]);
  const [filieres, setFilieres] = useState([]);
  const [loadingFilieres, setLoadingFilieres] = useState(true);

  useEffect(() => {
    setOffers(data);
    setEtudiants(etds);
  }, [data, etds]);

  useEffect(() => {
    const fetchFilieres = async () => {
      try {
        const response = await fetch(`${BASE_URL}/filiere/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFilieres(data);
        } else {
          console.error("Failed to fetch filieres");
        }
      } catch (error) {
        console.error("Error fetching filieres:", error);
      } finally {
        setLoadingFilieres(false);
      }
    };

    fetchFilieres();
  }, []);
  const handleSelectAll = () => {
    const filteredEtudiants = etudiants.filter(
      (etudiant) =>
        (selectedFiliere.length === 0 ||
          //@ts-ignore
          selectedFiliere.includes(etudiant.filiere?.abbreviation)) &&
        (selectedNiveau.length === 0 ||
          selectedNiveau.includes(etudiant.niveau))
    );

    // If all filtered students are selected, unselect them, else select all
    const isAllSelected = selectedEtudiants.length === filteredEtudiants.length;
    setSelectedEtudiants(
      isAllSelected
        ? []
        : filteredEtudiants.map((etudiant) => etudiant.idEtudiant)
    );
  };

  const handleEtudiantSelection = (id_etudiant: number) => {
    setSelectedEtudiants((prevSelected) =>
      prevSelected.includes(id_etudiant)
        ? prevSelected.filter((id) => id !== id_etudiant)
        : [...prevSelected, id_etudiant]
    );
  };

  const handleTipChange = (tip: string) => {
    setSelectedTips((prev) =>
      prev.includes(tip) ? prev.filter((t) => t !== tip) : [...prev, tip]
    );
  };

  const handleFiliereChange = (filiere: string) => {
    setSelectedFiliere((prev) =>
      prev.includes(filiere)
        ? prev.filter((f) => f !== filiere)
        : [...prev, filiere]
    );
  };

  const handleNiveauChange = (niveau: string) => {
    setSelectedNiveau((prev) =>
      prev.includes(niveau)
        ? prev.filter((n) => n !== niveau)
        : [...prev, niveau]
    );
  };

  const handleConfirm = async () => {
    if (editingOffer) {
      const selectedData = {
        id_stage: editingOffer.idStage,
        id_etudiants: selectedEtudiants,
      };

      try {
        const response = await fetch(`${BASE_URL}/affectation`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(selectedData),
        });

        alert("Data submitted successfully!");
      } catch (error) {
        console.error("Error submitting data:", error);
        alert("Failed to submit data. Please try again.");
      }
      console.log("Offer and Selected Etudiants:", selectedData);
    }
  };

  const filteredEtudiants = etudiants.filter((etudiant) => {
    const etudiantNiveau =
      selectedNiveau.length === 0 ||
      selectedNiveau.some((niv) => etudiant.niveau.includes(niv));

    const etudiantFiliere =
      selectedFiliere.length === 0 ||
      selectedFiliere.some(
        (filiere) =>
          etudiant.filiere && etudiant.filiere.abbreviation.includes(filiere)
      );

    return etudiantNiveau && etudiantFiliere;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Page d'Affectation</h1>
      <div className="space-y-4">
        {offers.map((offer) => (
          <div
            key={offer.idStage}
            className="flex justify-between items-center p-4 border rounded"
          >
            <div>
              <h3 className="text-lg font-semibold">{offer.titre}</h3>
              <p>Description: {offer.description}</p>
              <p>Type: {offer.abbreviation}</p>
              <p>
                Tags:{" "}
                {offer.tags ? offer.tags.split(", ") : "No tags available"}
              </p>
              <p>Date Debut: {offer.dateDebut.split("T")[0]}</p>
              <p>Date Fin: {offer.dateFin.split("T")[0]}</p>
              <p>Status: {offer.statut}</p>
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => setEditingOffer(offer)} size="md">
                Affecter
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Affectation Modal */}
      {editingOffer && (
        <Modal show={true} onClose={() => setEditingOffer(null)}>
          <Modal.Header>
            <div className="flex space-x-4 mb-4 w-full justify-between">
              {/* Filter by Filière */}

              <Dropdown label="Filière" size="sm">
                {filieres.map((filiere: Filiere) => (
                  <div key={filiere.idFiliere} className="px-4 py-2">
                    <label className="flex items-center text-sm space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        onChange={() =>
                          handleFiliereChange(filiere.abbreviation)
                        }
                        checked={selectedFiliere.includes(filiere.abbreviation)}
                      />
                      <span>{filiere.abbreviation}</span>
                    </label>
                  </div>
                ))}
              </Dropdown>

              {/* Filter by Niveau */}
              <Dropdown label="Niveau" size="sm">
                {["1A", "2A", "3A"].map((niveau) => (
                  <div key={niveau} className="px-4 py-2">
                    <label className="flex items-center text-sm space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        onChange={() => handleNiveauChange(niveau)}
                        checked={selectedNiveau.includes(niveau)}
                      />
                      <span>{niveau}</span>
                    </label>
                  </div>
                ))}
              </Dropdown>

              {/* Select All Checkbox */}
              <div className="flex items-center space-x-2">
                <span>
                  <small>Select All</small>
                </span>
                <input
                  type="checkbox"
                  checked={
                    selectedEtudiants.length === filteredEtudiants.length
                  }
                  onChange={handleSelectAll}
                  className="mr-2  w-[25px] h-[25px]"
                />
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              {filteredEtudiants.map((etudiant) => (
                <div
                  key={etudiant.idEtudiant}
                  className="flex items-center space-x-4"
                >
                  <input
                    type="checkbox"
                    checked={selectedEtudiants.includes(etudiant.idEtudiant)}
                    onChange={() =>
                      handleEtudiantSelection(etudiant.idEtudiant)
                    }
                    id={`etudiant-${etudiant.idEtudiant}`}
                    className="mr-2"
                  />
                  <label htmlFor={`etudiant-${etudiant.idEtudiant}`}>
                    {etudiant.user.nom} {etudiant.user.prenom} - Niveau:{" "}
                    {etudiant.niveau} - Filière:{" "}
                    {etudiant.filiere?.abbreviation}
                  </label>
                </div>
              ))}
            </div>

            {/* Confirm and Cancel Buttons */}
            <div className="flex justify-end space-x-2 mt-4">
              <Button onClick={handleConfirm}>Confirmer</Button>
              <Button color="gray" onClick={() => setEditingOffer(null)}>
                Annuler
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default AffectationForm;
