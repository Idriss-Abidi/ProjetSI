import { useState, useEffect } from "react";
import { Modal, Button, Label, Dropdown } from "flowbite-react";
import { Stage } from "@/types";
import { BASE_URL } from "@/constants/baseUrl";

interface DataList {
  data: Stage[];
}

const OffersListPage: React.FC<DataList> = ({ data }) => {
  const [offers, setOffers] = useState<Stage[]>([]);
  const [editingOffer, setEditingOffer] = useState<Stage | null>(null);
  const [tempStatut, setTempStatut] = useState<{ [key: string]: string }>({});
  const [selectedStats, setSelectedStats] = useState<string[]>([]);

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    idStage: number | null;
    action: "ACCEPTED" | "REFUSED" | null;
  }>({ isOpen: false, idStage: null, action: null });

  useEffect(() => {
    setOffers(data);
  }, [data]);

  const handleStatChange = (stat: string) => {
    setSelectedStats((prev) =>
      prev.includes(stat)
        ? prev.filter((item) => item !== stat)
        : [...prev, stat]
    );
  };
  const handleActionConfirm = async (
    idStage: number,
    action: "ACCEPTED" | "REFUSED"
  ) => {
    try {
      let url = "";
      if (action === "ACCEPTED") {
        url = `${BASE_URL}/stage/accept/${idStage}`;
      } else if (action === "REFUSED") {
        url = `${BASE_URL}/stage/refuse/${idStage}`;
      }

      const response = await fetch(url, {
        method: "PUT", // Use PUT instead of POST
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        // Update local state if the action is successful
        window.location.reload();
        setConfirmModal({ isOpen: false, idStage: null, action: null });
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  // Filter cards based on query, dates, and selected tips
  const filteredOffers = (data || []).filter((card) => {
    const matchesStats =
      selectedStats.length === 0 ||
      selectedStats.some((stat) => card.statut.includes(stat));

    return matchesStats;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des Offres</h1>
      {/* statut  */}
      <div className="flex items-center gap-4 px-2 my-4 ">
        <Dropdown
          label="Statut Stage"
          size="sm"
          className="bg-gray-50 border rounded shadow-md"
        >
          <div className="px-4 py-2 space-y-3">
            <label className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded transition duration-200">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring focus:ring-blue-300"
                onChange={() => handleStatChange("EN_ATTENTE")}
                checked={selectedStats.includes("EN_ATTENTE")}
              />
              <span className="text-gray-800 font-medium">En Attente</span>
            </label>
            <label className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded transition duration-200">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600 rounded border-gray-300 focus:ring focus:ring-green-300"
                onChange={() => handleStatChange("ACCEPTE")}
                checked={selectedStats.includes("ACCEPTE")}
              />
              <span className="text-gray-800 font-medium">Acceptée</span>
            </label>
            <label className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded transition duration-200">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-red-600 rounded border-gray-300 focus:ring focus:ring-red-300"
                onChange={() => handleStatChange("REFUSE")}
                checked={selectedStats.includes("REFUSE")}
              />
              <span className="text-gray-800 font-medium">Refusée</span>
            </label>
          </div>
        </Dropdown>
      </div>
      <div className="space-y-4">
        {filteredOffers.map((offer) => (
          <div
            key={offer.idStage}
            className="flex justify-between items-center p-4 border rounded"
          >
            <div>
              <h3 className="text-lg font-semibold">{offer.titre}</h3>
              <p>Description: {offer.description}</p>
              <p>Type: {offer.abbreviation}</p>
              <p>Tags: {offer.tags?.split(", ")}</p>
              <p>Date Debut: {offer.dateDebut.split("T")[0]}</p>
              <p>Date Fin: {offer.dateFin.split("T")[0]}</p>
              <p>Statut: {offer.statut}</p>
            </div>
            <div className="flex space-x-2">
              <Button
                value="ACCEPTE"
                onClick={() =>
                  setConfirmModal({
                    isOpen: true,
                    idStage: offer.idStage,
                    action: "ACCEPTED",
                  })
                }
                size="xs"
              >
                Accepter
              </Button>
              <Button
                color="failure"
                onClick={() =>
                  setConfirmModal({
                    isOpen: true,
                    idStage: offer.idStage,
                    action: "REFUSED",
                  })
                }
                size="xs"
              >
                Rejeter
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <Modal
          show={confirmModal.isOpen}
          onClose={() =>
            setConfirmModal({ isOpen: false, idStage: null, action: null })
          }
        >
          <Modal.Header>Confirmation</Modal.Header>
          <Modal.Body>
            <p>
              Êtes-vous sûr de vouloir
              {confirmModal.action === "ACCEPTED" ? "accept" : "reject"} cette
              offre ?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() =>
                handleActionConfirm(confirmModal.idStage!, confirmModal.action!)
              }
              color={confirmModal.action === "ACCEPTED" ? "success" : "failure"}
            >
              Confirmer
            </Button>
            <Button
              color="gray"
              onClick={() =>
                setConfirmModal({ isOpen: false, idStage: null, action: null })
              }
            >
              Annuler
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default OffersListPage;
