import { useState, useEffect } from "react";
import { Modal, Button, Label, Dropdown } from "flowbite-react";
import { Etudiant, Filiere } from "@/types";
import { BASE_URL } from "@/constants/baseUrl";

const EtudiantsList: React.FC<{ data: Etudiant[] }> = ({ data }) => {
  const [etudiants, setEtudiants] = useState<Etudiant[]>([]);
  const [selectedNiveau, setSelectedNiveau] = useState<string[]>([]);
  const [selectedFiliere, setSelectedFiliere] = useState<string[]>([]);
  const [selectedStatut, setSelectedStatut] = useState<string[]>([]);
  const [filieres, setFilieres] = useState([]);
  const [loadingFilieres, setLoadingFilieres] = useState(true);

  useEffect(() => {
    setEtudiants(data);
  }, [data]);

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

  const handleStatutChange = (statut: string) => {
    setSelectedStatut((prev) =>
      prev.includes(statut)
        ? prev.filter((n) => n !== statut)
        : [...prev, statut]
    );
  };

  const filteredEtudiants = etudiants.filter((etudiant) => {
    const etudiantNiveau =
      selectedNiveau.length === 0 ||
      selectedNiveau.some((niv) => etudiant.niveau.includes(niv));

    const etudiantFiliere =
      selectedFiliere.length === 0 ||
      selectedFiliere.some((filiere) =>
        etudiant.filiere?.abbreviation.includes(filiere)
      );

    const etudiantStatut =
      selectedStatut.length === 0 ||
      selectedStatut.includes(etudiant.chercheStage);

    return etudiantNiveau && etudiantFiliere && etudiantStatut;
  });

  return (
    <div className="p-4 m-auto ">
      <h1 className="text-2xl font-bold mb-4">Liste des Etudiants</h1>
      <div className="space-y-4">
        <div className="flex space-x-4 mb-4 w-full">
          {/* Filter by Filière */}
          <Dropdown label="Filière" size="sm">
            {filieres.map((filiere: Filiere) => (
              <div key={filiere.idFiliere} className="px-4 py-2">
                <label className="flex items-center text-sm space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    onChange={() => handleFiliereChange(filiere.abbreviation)}
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

          {/* Filter by Statut */}
          <Dropdown label="Statut" size="sm">
            {["TROUVE", "NON_TROUVE"].map((statut) => (
              <div key={statut} className="px-4 py-2">
                <label className="flex items-center text-sm space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    onChange={() =>
                      handleStatutChange(
                        statut === "TROUVE" ? "TROUVE" : "NON_TROUVE"
                      )
                    }
                    checked={selectedStatut.includes(
                      statut === "TROUVE" ? "TROUVE" : "NON_TROUVE"
                    )}
                  />
                  <span>{statut}</span>
                </label>
              </div>
            ))}
          </Dropdown>
        </div>
        <div className="space-y-4">
          {filteredEtudiants.map((etudiant) => (
            <div
              key={etudiant.idEtudiant}
              className="flex justify-between w-1/2 items-center p-4 border rounded"
            >
              <label htmlFor={`etudiant-${etudiant.idEtudiant}`}>
                {etudiant.user.nom} {etudiant.user.nom} - Niveau:{" "}
                {etudiant.niveau} - Filière: {etudiant.filiere?.abbreviation}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EtudiantsList;
