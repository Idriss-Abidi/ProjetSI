import { useState, useEffect } from "react";
import { Modal, Button, Label, Dropdown } from "flowbite-react";

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
  statut: number;
}

const EtudiantsList: React.FC<{ data: Etudiant[] }> = ({ data }) => {
  const [etudiants, setEtudiants] = useState<Etudiant[]>([]);
  const [selectedNiveau, setSelectedNiveau] = useState<string[]>([]);
  const [selectedFiliere, setSelectedFiliere] = useState<string[]>([]);
  const [selectedStatut, setSelectedStatut] = useState<number[]>([]);

  useEffect(() => {
    setEtudiants(data);
  }, [data]);

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

  const handleStatutChange = (statut: number) => {
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
      selectedFiliere.some((filiere) => etudiant.filiere.includes(filiere));

    const etudiantStatut =
      selectedStatut.length === 0 || selectedStatut.includes(etudiant.statut);

    return etudiantNiveau && etudiantFiliere && etudiantStatut;
  });

  return (
    <div className="p-4 ">
      <h1 className="text-2xl font-bold mb-4">Liste des Etudiants</h1>
      <div className="space-y-4">
        <div className="flex space-x-4 mb-4 w-full">
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

          {/* Filter by Statut */}
          <Dropdown label="Statut" size="sm">
            {["stage", "noStage"].map((statut) => (
              <div key={statut} className="px-4 py-2">
                <label className="flex items-center text-sm space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    onChange={() =>
                      handleStatutChange(statut === "stage" ? 1 : 0)
                    }
                    checked={selectedStatut.includes(
                      statut === "stage" ? 1 : 0
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
              key={etudiant.id_etudiant}
              className="flex justify-between w-1/2 items-center p-4 border rounded"
            >
              <label htmlFor={`etudiant-${etudiant.id_etudiant}`}>
                {etudiant.nom} {etudiant.prenom} - Niveau: {etudiant.niveau} -
                Filière: {etudiant.filiere}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EtudiantsList;
