import { useState, useEffect } from "react";
import { Modal, Button, TextInput, Label, Toast, Alert } from "flowbite-react";
import CandidatureList from "./CandidatureList";
import { HiCheck } from "react-icons/hi";

interface Offer {
  id: number;
  title: string;
  description: string;
  type: string[];
  tags: string[];
  date_debut: string;
  date_fin: string;
}

interface Candidature {
  id_etudiant: number;
  nom: string;
  prenom: string;
  cv_path: string;
  statut: string;
  id_offre: number;
}

interface DataList {
  data: Offer[];
  dataCandidatures: Candidature[];
}

const OffersListPage: React.FC<DataList> = ({ data, dataCandidatures }) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [showCandidatures, setShowCandidatures] = useState<Offer | null>(null);
  const [deletingOfferId, setDeletingOfferId] = useState<number | null>(null);
  const [candidatures, setCandidatures] = useState<Candidature[]>([]);
  // Temporarily store the status before saving
  const [tempStatut, setTempStatut] = useState<{ [key: string]: string }>({});

  // Show success message for saving the statut
  const [savedMessage, setSavedMessage] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    setOffers(data);
    setCandidatures(dataCandidatures);
  }, []);

  const handleDelete = () => {
    // if (deletingOfferId !== null) {
    //   setOffers((prevOffers) =>
    //     prevOffers.filter((offer) => offer.id !== deletingOfferId)
    //   );
    //   setDeletingOfferId(null);
    // }
  };

  const handleSave = () => {
    if (editingOffer) {
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

  const handleStatusChange = (etudiant: string, newStatut: string) => {
    // Store the status temporarily for each candidature
    setTempStatut((prevState) => ({
      ...prevState,
      [etudiant]: newStatut,
    }));
  };

  const handleSaveStatus = (id_etudiant: string, offer: number) => {
    const newStatut = tempStatut[id_etudiant];
    const currentStatut = candidatures.find(
      (candidature) =>
        candidature.id_etudiant.toString() === id_etudiant &&
        candidature.id_offre === offer
    )?.statut;

    // Only update if statut has changed
    if (newStatut !== currentStatut) {
      setCandidatures((prevCandidatures) =>
        prevCandidatures.map((candidature) =>
          candidature.id_etudiant.toString() === id_etudiant &&
          candidature.id_offre === offer
            ? { ...candidature, statut: newStatut }
            : candidature
        )
      );
      // Show the success message
      setSavedMessage((prevState) => ({
        ...prevState,
        [id_etudiant]: true,
      }));

      // Hide the success message after 2 seconds
      setTimeout(() => {
        setSavedMessage((prevState) => ({
          ...prevState,
          [id_etudiant]: false,
        }));
      }, 2000);
    }
  };

  const handleExportCV = (cvPath: string) => {
    const link = document.createElement("a");
    link.href = cvPath;
    link.download = cvPath.split("/").pop() || "cv.pdf"; // Extract file name from path
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredCandidatures = candidatures.filter(
    (c) => c.id_offre === showCandidatures?.id
  );

  // Log the updated candidatures whenever the 'candidatures' state changes
  useEffect(() => {
    console.log("Updated candidatures:", candidatures);
  }, [candidatures]); // Runs when 'candidatures' state changes
  useEffect(() => {
    console.log("Data received in OffersListPage:", data);
    console.log("Candidatures data:", dataCandidatures);
    setOffers(data);
    setCandidatures(dataCandidatures);
  }, [data, dataCandidatures]);

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
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => setShowCandidatures(offer)} size="xs">
                Show Candidatures
              </Button>
              <Button onClick={() => setEditingOffer(offer)} size="xs">
                Modify
              </Button>
              <Button
                color="failure"
                onClick={() => setDeletingOfferId(offer.id)}
                size="xs"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Candidatures Modal */}
      {showCandidatures && (
        <Modal show={true} onClose={() => setShowCandidatures(null)}>
          <Modal.Header>Candidatures for {showCandidatures.title}</Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              {filteredCandidatures.map((candidature) => (
                <div
                  key={`${candidature.id_offre}-${candidature.id_etudiant}`}
                  className="flex justify-between items-center p-4 border rounded"
                >
                  <div>
                    <h3 className="text-lg font-semibold">
                      Etudiant(e): {candidature.nom} - {candidature.prenom}
                    </h3>
                    <p>
                      CV PDF:{" "}
                      <button
                        onClick={() => handleExportCV(candidature.cv_path)}
                        className="text-blue-500 underline"
                      >
                        Download CV
                      </button>
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <select
                      value={
                        tempStatut[candidature.id_etudiant] ||
                        candidature.statut
                      }
                      onChange={(e) =>
                        handleStatusChange(
                          candidature.id_etudiant.toString(),
                          e.target.value
                        )
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="en attente">En attente</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <Button
                      onClick={() =>
                        handleSaveStatus(
                          candidature.id_etudiant.toString(),
                          candidature.id_offre
                        )
                      }
                      size="sm"
                      color="success"
                    >
                      Save
                    </Button>

                    {/* Show success message if statut was updated */}
                    {savedMessage[candidature.id_etudiant] && (
                      <span className="text-green-500 text-sm ml-2">
                        Saved!
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Modal.Body>
        </Modal>
      )}

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
                {/* Titre */}
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

                {/* Tags */}
                {/* <div>
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
                </div> */}

                {/* Date Début */}
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
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button type="submit">Save</Button>
                <Button color="gray" onClick={() => setEditingOffer(null)}>
                  Cancel
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deletingOfferId !== null && (
        <Modal show={true} onClose={() => setDeletingOfferId(null)}>
          <Modal.Header>Delete Offer</Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this offer?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button color="failure" onClick={handleDelete}>
              Delete
            </Button>
            <Button color="gray" onClick={() => setDeletingOfferId(null)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default OffersListPage;
