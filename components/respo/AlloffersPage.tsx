import { useState, useEffect } from "react";
import { Modal, Button, TextInput, Label, Toast, Alert } from "flowbite-react";
import { HiCheck } from "react-icons/hi";

interface Offer {
  id: number;
  title: string;
  description: string;
  type: string[];
  tags: string[];
  date_debut: string;
  date_fin: string;
  statut: string;
}

interface DataList {
  data: Offer[];
}

const OffersListPage: React.FC<DataList> = ({ data }) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [showCandidatures, setShowCandidatures] = useState<Offer | null>(null);
  const [tempStatut, setTempStatut] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setOffers(data);
  }, [data]);

  const handleSave = () => {
    if (editingOffer) {
      console.log("Saving offer data:", editingOffer);

      setOffers((prevOffers) =>
        prevOffers.map((offer) =>
          offer.id === editingOffer.id ? editingOffer : offer
        )
      );
      setEditingOffer(null);
    }
  };

  const handleTypeChange = (type: string) => {
    if (editingOffer) {
      const newTypes = editingOffer.type.includes(type)
        ? editingOffer.type.filter((t) => t !== type)
        : [...editingOffer.type, type];
      setEditingOffer({ ...editingOffer, type: newTypes });
    }
  };

  const handleStatusChange = (status: "active" | "inactive") => {
    if (editingOffer) {
      setEditingOffer({ ...editingOffer, statut: status });
    }
  };

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
              <Button
                value="active"
                onClick={() => {
                  handleStatusChange("active");
                  setEditingOffer({ ...offer, statut: "active" });
                }}
                size="xs"
              >
                Accepter
              </Button>
              <Button
                color="failure"
                onClick={() => {
                  handleStatusChange("inactive");
                  setEditingOffer({ ...offer, statut: "inactive" });
                }}
                size="xs"
              >
                Rejeter
              </Button>
              <Button onClick={() => setEditingOffer(offer)} size="xs">
                Modifier
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modify Modal */}
      {editingOffer && (
        <Modal show={true} onClose={() => setEditingOffer(null)}>
          <Modal.Header>Modify Offer</Modal.Header>
          <Modal.Body>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <Label htmlFor="edit-title" value="Titre" />
                  <TextInput
                    id="edit-title"
                    value={editingOffer.title}
                    onChange={(e) =>
                      setEditingOffer({
                        ...editingOffer,
                        title: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="edit-description" value="Description" />
                  <textarea
                    id="edit-description"
                    value={editingOffer.description}
                    onChange={(e) =>
                      setEditingOffer({
                        ...editingOffer,
                        description: e.target.value,
                      })
                    }
                    className="w-full border rounded p-2"
                    rows={4}
                    required
                  />
                </div>

                {/* Types */}
                <div>
                  <Label value="Types" />
                  <div className="flex space-x-4">
                    {["PFA-1A", "PFA-2A", "PFE"].map((type) => (
                      <div key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`edit-type-${type}`}
                          checked={editingOffer.type.includes(type)}
                          onChange={() => handleTypeChange(type)}
                        />
                        <label
                          htmlFor={`edit-type-${type}`}
                          className="ml-2 font-medium"
                        >
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Date Debut */}
                <div>
                  <Label htmlFor="edit-date-debut" value="Date Début" />
                  <TextInput
                    id="edit-date-debut"
                    type="date"
                    value={editingOffer.date_debut}
                    onChange={(e) =>
                      setEditingOffer({
                        ...editingOffer,
                        date_debut: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                {/* Date Fin */}
                <div>
                  <Label htmlFor="edit-date-fin" value="Date Fin" />
                  <TextInput
                    id="edit-date-fin"
                    type="date"
                    value={editingOffer.date_fin}
                    onChange={(e) =>
                      setEditingOffer({
                        ...editingOffer,
                        date_fin: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button type="submit">Confirmer</Button>
                <Button color="gray" onClick={() => setEditingOffer(null)}>
                  Annuler
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default OffersListPage;
