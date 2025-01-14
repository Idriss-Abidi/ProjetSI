import { useState, useEffect } from "react";
import { Modal, Button, Label } from "flowbite-react";
import { Stage } from "@/types";
import { BASE_URL } from "@/constants/baseUrl";

interface DataList {
  data: Stage[];
}

const OffersListPage: React.FC<DataList> = ({ data }) => {
  const [offers, setOffers] = useState<Stage[]>([]);
  const [editingOffer, setEditingOffer] = useState<Stage | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    idStage: number | null;
    action: "ACCEPTED" | "REFUSED" | null;
  }>({ isOpen: false, idStage: null, action: null });

  useEffect(() => {
    setOffers(data);
  }, [data]);

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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">List of Offers</h1>
      <div className="space-y-4">
        {offers.map((offer) => (
          <div
            key={offer.idStage}
            className="flex justify-between items-center p-4 border rounded"
          >
            <div>
              <h3 className="text-lg font-semibold">{offer.titre}</h3>
              <p>Description: {offer.description}</p>
              <p>Types: {offer.abbreviation}</p>
              <p>Tags: {offer.tags?.split(", ")}</p>
              <p>Date Debut: {offer.dateDebut}</p>
              <p>Date Fin: {offer.dateFin}</p>
              <p>Status: {offer.statut}</p>
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
              Are you sure you want to{" "}
              {confirmModal.action === "ACCEPTED" ? "accept" : "reject"} this
              offer?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() =>
                handleActionConfirm(confirmModal.idStage!, confirmModal.action!)
              }
              color={confirmModal.action === "ACCEPTED" ? "success" : "failure"}
            >
              Confirm
            </Button>
            <Button
              color="gray"
              onClick={() =>
                setConfirmModal({ isOpen: false, idStage: null, action: null })
              }
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default OffersListPage;
