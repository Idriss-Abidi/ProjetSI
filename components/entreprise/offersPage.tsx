import { useState, useEffect } from "react";
import { Modal, Button } from "flowbite-react";
import { Candidature, Stage } from "@/types";
import { BASE_URL } from "@/constants/baseUrl";

interface DataList {
  data: Stage[];
  dataCandidatures: Candidature[];
}

const OffersListPage: React.FC<DataList> = ({ data, dataCandidatures }) => {
  const [offers, setOffers] = useState<Stage[]>([]);
  const [editingOffer, setEditingOffer] = useState<Stage | null>(null);
  const [showCandidatures, setShowCandidatures] = useState<Stage | null>(null);
  const [candidatures, setCandidatures] = useState<Candidature[]>([]);
  const [tempStatut, setTempStatut] = useState<{ [key: string]: string }>({});
  const [savedMessage, setSavedMessage] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    setOffers(data);
    setCandidatures(dataCandidatures);
  }, [data, dataCandidatures]);

  const handleSaveStatus = async (
    id_etudiant: number,
    idStage: number,
    idCandidature: number
  ) => {
    const newStatut = tempStatut[idCandidature];

    try {
      if (newStatut === "ACCEPTEE") {
        const response1 = await fetch(
          `${BASE_URL}/candidature/${idCandidature}/accept`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response1.ok) {
          console.error("Error accepting candidature:", response1.statusText);
          return;
        }

        const response2 = await fetch(`${BASE_URL}/entretien`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            idEtudiant: id_etudiant,
            idStage,
            dateEntretien: new Date().toISOString().split(".")[0],
          }),
        });

        if (!response2.ok) {
          console.error("Error scheduling interview:", response2.statusText);
          return;
        }

        if (response1.ok && response2.ok) {
          window.location.reload();
        }
      } else if (newStatut === "REFUSEE") {
        const response = await fetch(
          `${BASE_URL}/candidature/${idCandidature}/refuse`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          console.error("Error rejecting candidature:", response.statusText);
          return;
        }
        window.location.reload();
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }

    setSavedMessage((prevState) => ({
      ...prevState,
      [id_etudiant]: true,
    }));

    setTimeout(() => {
      setSavedMessage((prevState) => ({
        ...prevState,
        [id_etudiant]: false,
      }));
    }, 1000);
  };

  const handleStatusChange = (idCandidature: number, newStatut: string) => {
    setTempStatut((prevState) => ({
      ...prevState,
      [idCandidature]: newStatut,
    }));
  };

  const handleExportCV = async (idCandidature: number) => {
    try {
      const response = await fetch(
        `${BASE_URL}/candidature/${idCandidature}/download-cv`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        console.error("Failed to fetch CV link:", response.statusText);
        return;
      }

      const cvLink = await response.text();

      const link = document.createElement("a");
      link.target = "_blank"; // Open in a new tab
      link.href = cvLink;
      link.download = cvLink.split("/").pop() || "cv.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error fetching CV link:", error);
    }
  };

  const filteredCandidatures = candidatures.filter(
    (c) => c.stage.idStage === showCandidatures?.idStage
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des Offres</h1>
      <div className="space-y-4">
        {offers.map((offer) => {
          const countCandidatures = candidatures.filter(
            (c) => c.stage.idStage === offer.idStage
          ).length;

          return (
            <div
              key={offer.idStage}
              className="flex justify-between items-center p-4 border rounded"
            >
              <div>
                <h3 className="text-lg font-semibold">{offer.titre}</h3>
                <p>Description: {offer.description}</p>
              </div>
              <div className="flex space-x-2">
                <Button onClick={() => setShowCandidatures(offer)} size="xs">
                  Voir Candidatures ({countCandidatures})
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {showCandidatures && (
        <Modal show={true} onClose={() => setShowCandidatures(null)}>
          <Modal.Header>
            Candidatures pour {showCandidatures.titre}
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              {filteredCandidatures.map((candidature) => (
                <div
                  key={candidature.idCand}
                  className="flex justify-between items-center p-4 border rounded"
                >
                  <div>
                    <h3 className="text-lg font-semibold">
                      {candidature.etudiant.user.nom}{" "}
                      {candidature.etudiant.user.prenom}
                    </h3>
                    <p>
                      CV:{" "}
                      <button
                        onClick={() => handleExportCV(candidature.idCand)}
                        className="text-blue-500 underline"
                      >
                        Télécharger
                      </button>
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <select
                      value={
                        tempStatut[candidature.idCand] ||
                        candidature.statutCandidature
                      }
                      onChange={(e) =>
                        handleStatusChange(candidature.idCand, e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="EN_ATTENTE">En attente</option>
                      <option value="ACCEPTEE">Accepter</option>
                      <option value="REFUSEE">Rejecter</option>
                    </select>
                    <Button
                      onClick={() =>
                        handleSaveStatus(
                          candidature.etudiant.idEtudiant,
                          candidature.stage.idStage,
                          candidature.idCand
                        )
                      }
                      size="sm"
                      color="success"
                    >
                      Sauvegarder
                    </Button>
                    {savedMessage[candidature.etudiant.idEtudiant] && (
                      <span className="text-green-500 text-sm ml-2">
                        Sauvegardé!
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default OffersListPage;
