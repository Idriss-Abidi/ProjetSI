import { useState } from "react";
import { Modal, Button, TextInput, Toast } from "flowbite-react";
import { RemarqueStage } from "@/types";
import { formatDate } from "../../utils/formatDate";
import { useRequest } from "../../utils/useRequest";
import { BASE_URL } from "@/constants/baseUrl";
import { cleanObject } from "@/utils/cleanObject";

interface RemarquesStagesPageProps {
  data: RemarqueStage[];
}

const statusOptions = [
  { value: "EN_ATTENTE", label: "En Attente" },
  { value: "EN_COURS", label: "En Cours" },
  { value: "TERMINE", label: "Terminé" },
];

const OffersListPage: React.FC<RemarquesStagesPageProps> = ({ data }) => {
  const [selectedRemarquesStage, setSelectedOffer] =
    useState<RemarqueStage | null>(null);
  const [editingRemarquesStage, setEditingStagiaire] =
    useState<RemarqueStage | null>(null);
  const [note, setNote] = useState<string>("");
  const [remarques, setRemark] = useState<string>("");
  const [statutRemarquesStage, setStatutRemarquesStage] = useState<string>("");
  const [savedMessage, setSavedMessage] = useState(false);

  const { loading: updatingRemarquesStage, execute: updateRemarquesStage } =
    useRequest();

  const handleShowStagiaires = (offer: RemarqueStage) => {
    setSelectedOffer(offer);
  };

  const handleEditStagiaire = (stagiaire: RemarqueStage) => {
    setEditingStagiaire(stagiaire);
    setNote(stagiaire.noteFinale || "");
    setRemark(stagiaire.remarques || "");
    setStatutRemarquesStage(stagiaire.statutRemarqueStage || "");
  };

  const handleSaveStagiaire = () => {
    if (editingRemarquesStage) {
      const updatedData = {
        noteFinale: note,
        remarques,
        statutRemarqueStage: statutRemarquesStage,
      };
      console.log(updatedData);
      updateRemarquesStage(
        `${BASE_URL}/remarques-stage/${selectedRemarquesStage?.idRemarque}`,
        {
          method: "PUT",
          data: cleanObject(updatedData),
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          onSuccess: () => {
            setSavedMessage(true);
            location.reload();
          },
          onError: () => {
            alert("Une erreur s'est produite.");
          },
        }
      );
    }
  };

  const handleDownloadCV = (cvPath: string) => {
    const link = document.createElement("a");
    link.href = cvPath;
    link.download = cvPath.split("/").pop() || "cv.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Listes des stages - Etudiants</h1>
      <div className="space-y-4">
        {data?.map((remarquesStage) => (
          <div
            key={remarquesStage.idRemarque - remarquesStage.etudiant.idEtudiant}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold text-lg">
                {remarquesStage.stage.titre} -{" "}
                {remarquesStage.statutRemarqueStage}
              </h2>{" "}
              <small>{remarquesStage.statutRemarqueStage}</small>
              <p>
                Etudiant : {remarquesStage.etudiant.user.nom}{" "}
                {remarquesStage.etudiant.user.prenom}
              </p>
              <p>{remarquesStage.stage.description}</p>
              <p>
                Du: {formatDate(remarquesStage.stage.dateDebut)} au:{" "}
                {formatDate(remarquesStage.stage.dateFin)}
              </p>
              <p>Tags: {remarquesStage.stage.tags.split(",").join(" ,")}</p>
            </div>
            <Button
              onClick={() => handleShowStagiaires(remarquesStage)}
              size="sm"
            >
              Voir stagiaire
            </Button>
          </div>
        ))}
      </div>

      {selectedRemarquesStage && (
        <Modal show={true} onClose={() => setSelectedOffer(null)}>
          <Modal.Header className="text-lg font-semibold text-gray-800">
            Stagiaire - {selectedRemarquesStage.stage.titre}
          </Modal.Header>
          <Modal.Body className="space-y-4">
            <div
              key={selectedRemarquesStage.etudiant.idEtudiant}
              className="flex justify-between items-center p-6 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex-1 pr-6">
                <p className="text-lg font-medium text-gray-800">
                  <strong>
                    Stagiaire : {selectedRemarquesStage.etudiant.user.nom}{" "}
                    {selectedRemarquesStage.etudiant.user.prenom}
                  </strong>
                </p>
                <p className="text-lg font-medium text-gray-800">
                  <strong>
                    Note finale : {selectedRemarquesStage.noteFinale}
                  </strong>
                </p>
                <p className="text-lg font-medium text-gray-800">
                  <strong>
                    Remarques : {selectedRemarquesStage.remarques}
                  </strong>
                </p>
                {/* <Button
                  onClick={() => handleDownloadCV("/cv")}
                  size="xs"
                  color="gray"
                  className="mt-2 text-xs"
                >
                  Voir CV
                </Button> */}
              </div>
              <div className="flex-shrink-0">
                <Button
                  onClick={() => handleEditStagiaire(selectedRemarquesStage)}
                  size="md"
                  color="success"
                  className="text-sm"
                >
                  Modifier
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}

      {editingRemarquesStage && (
        <Modal show={true} onClose={() => setEditingStagiaire(null)}>
          <Modal.Header className="text-lg font-semibold text-gray-800">
            Modifier
          </Modal.Header>
          <Modal.Body className="space-y-6">
            <p className="text-gray-700">
              Panel de modification{" "}
              <strong>
                {editingRemarquesStage.etudiant.user.nom}{" "}
                {editingRemarquesStage.etudiant.user.prenom}
              </strong>
            </p>

            <div className="space-y-4">
              {/* Note Input */}
              <label
                htmlFor="note"
                className="text-sm font-medium text-gray-700"
              >
                Note
              </label>
              <TextInput
                id="note"
                type="number"
                min="0" // Minimum value
                max="20" // Maximum value
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

              {/* Remark Input */}
              <label
                htmlFor="remark"
                className="text-sm font-medium text-gray-700"
              >
                Remarques
              </label>
              <TextInput
                id="remark"
                type="text"
                value={remarques}
                onChange={(e) => setRemark(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

              {/* Status Dropdown */}
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="status"
                  className="text-sm font-medium text-gray-700"
                >
                  Etat du stage
                </label>
                <select
                  id="status"
                  value={statutRemarquesStage}
                  onChange={(e) => setStatutRemarquesStage(e.target.value)}
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button
                  onClick={handleSaveStagiaire}
                  color="success"
                  className="px-6 py-2 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Enregistrer
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}

      {savedMessage && (
        <Toast>
          <div className="ml-3 text-sm font-normal">
            Enregistré avec succès !
          </div>
        </Toast>
      )}
    </div>
  );
};

export default OffersListPage;
