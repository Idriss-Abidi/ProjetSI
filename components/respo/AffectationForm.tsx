import { useState, useEffect } from "react";
import { Modal, Button, Label, Dropdown } from "flowbite-react";

interface Offer {
  id: number;
  title: string;
  description: string;
  type: string[]; // list of types
  tags: string[];
  date_debut: string;
  date_fin: string;
  statut: string;
}

interface Etudiant {
  id_etudiant: number;
  id_user: number;
  CNE: string;
  promo: string;
  niveau: string;
  filiere: string;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  userType: "ETUDIANT";
  tel: string;
}

interface DataList {
  data: Offer[];
  etds: Etudiant[];
}

const AffectationForm: React.FC<DataList> = ({ data, etds }) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [etudiants, setEtudiants] = useState<Etudiant[]>([]);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [selectedEtudiants, setSelectedEtudiants] = useState<number[]>([]);
  const [selectedNiveau, setSelectedNiveau] = useState<string[]>([]);
  const [selectedFiliere, setSelectedFiliere] = useState<string[]>([]);
  const [selectedTips, setSelectedTips] = useState<string[]>([]);

  useEffect(() => {
    setOffers(data);
    setEtudiants(etds);
  }, [data, etds]);

  const handleSelectAll = () => {
    const filteredEtudiants = etudiants.filter(
      (etudiant) =>
        (selectedFiliere.length === 0 ||
          selectedFiliere.includes(etudiant.filiere)) &&
        (selectedNiveau.length === 0 ||
          selectedNiveau.includes(etudiant.niveau))
    );

    // If all filtered students are selected, unselect them, else select all
    const isAllSelected = selectedEtudiants.length === filteredEtudiants.length;
    setSelectedEtudiants(
      isAllSelected
        ? []
        : filteredEtudiants.map((etudiant) => etudiant.id_etudiant)
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

  const handleConfirm = () => {
    if (editingOffer) {
      const selectedData = {
        offerId: editingOffer.id,
        etudiants: selectedEtudiants,
      };
      console.log("Offer and Selected Etudiants:", selectedData);
    }
  };

  const filteredEtudiants = etudiants.filter((etudiant) => {
    const etudiantNiveau =
      selectedNiveau.length === 0 ||
      selectedNiveau.some((niv) => etudiant.niveau.includes(niv));

    const etudiantFiliere =
      selectedFiliere.length === 0 ||
      selectedFiliere.some((filiere) => etudiant.filiere.includes(filiere));

    return etudiantNiveau && etudiantFiliere;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">List of Offers</h1>
      <div className="space-y-4">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="flex justify-between items-center p-4 border rounded"
          >
            <div>
              <h3 className="text-lg font-semibold">{offer.title}</h3>
              <p>Description: {offer.description}</p>
              <p>Types: {offer.type.join(", ")}</p>
              <p>Tags: {offer.tags.join(", ")}</p>
              <p>Date Debut: {offer.date_debut}</p>
              <p>Date Fin: {offer.date_fin}</p>
              <p>Status: {offer.statut}</p>
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => setEditingOffer(offer)} size="xs">
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
                {["GL", "GD", "IDSIT", "SSE", "SSI", "2IA"].map((filiere) => (
                  <div key={filiere} className="px-4 py-2">
                    <label className="flex items-center text-sm space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        onChange={() => handleFiliereChange(filiere)}
                        checked={selectedFiliere.includes(filiere)}
                      />
                      <span>{filiere}</span>
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
                  key={etudiant.id_etudiant}
                  className="flex items-center space-x-4"
                >
                  <input
                    type="checkbox"
                    checked={selectedEtudiants.includes(etudiant.id_etudiant)}
                    onChange={() =>
                      handleEtudiantSelection(etudiant.id_etudiant)
                    }
                    id={`etudiant-${etudiant.id_etudiant}`}
                    className="mr-2"
                  />
                  <label htmlFor={`etudiant-${etudiant.id_etudiant}`}>
                    {etudiant.nom} {etudiant.prenom} - Niveau: {etudiant.niveau}{" "}
                    - Filière: {etudiant.filiere}
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
