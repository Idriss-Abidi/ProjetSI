import { useState, useEffect } from "react";
import { Modal, Button, TextInput, Toast } from "flowbite-react";

interface Offer {
  id_stage: number;
  title: string;
  description: string;
  date_debut: string;
  date_fin: string;
  type: string[];
  tags: string[];
  id_etudiant: number;
  nom: string;
  prenom: string;
  statut: string;
  cv_path: string;
  note?: string;
  remarques?: string;
}

interface OffersListPageProps {
  data: Offer[];
}

const OffersListPage: React.FC<OffersListPageProps> = ({ data }) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [editingStagiaire, setEditingStagiaire] = useState<Offer | null>(null);
  const [note, setNote] = useState<string>("");
  const [remarques, setRemark] = useState<string>("");
  const [statut, setStatut] = useState<string>("");
  const [savedMessage, setSavedMessage] = useState(false);

  useEffect(() => {
    const uniqueOffers = Array.from(
      new Map(data.map((offer) => [offer.id_stage, offer])).values()
    );
    setOffers(uniqueOffers);
  }, [data]);

  const handleShowStagiaires = (offer: Offer) => {
    setSelectedOffer(offer);
  };

  const handleEditStagiaire = (stagiaire: Offer) => {
    setEditingStagiaire(stagiaire);
    setNote(stagiaire.note || ""); // Initialize with existing note
    setRemark(stagiaire.remarques || ""); // Initialize with existing remark
    setStatut(stagiaire.statut || ""); // Initialize with existing statut
  };

  const handleSaveStagiaire = () => {
    if (editingStagiaire) {
      const updatedData = {
        id_stage: editingStagiaire.id_stage,
        id_etudiant: editingStagiaire.id_etudiant,
        note,
        remarques,
        statut,
      };
      console.log("Saved data:", updatedData);
      setSavedMessage(true);
      setTimeout(() => setSavedMessage(false), 2000);
      setEditingStagiaire(null);
      setNote("");
      setRemark("");
      setStatut("");
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
      <h1 className="text-2xl font-bold mb-4">List of Offers</h1>
      <div className="space-y-4">
        {offers.map((offer) => (
          <div
            key={offer.id_stage}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold text-lg">{offer.title}</h2>
              <p>{offer.description}</p>
              <p>
                From {offer.date_debut} to {offer.date_fin}
              </p>
              <p>Tags: {offer.tags.join(", ")}</p>
            </div>
            <Button onClick={() => handleShowStagiaires(offer)} size="sm">
              View Stagiaires
            </Button>
          </div>
        ))}
      </div>

      {selectedOffer && (
        <Modal show={true} onClose={() => setSelectedOffer(null)}>
          <Modal.Header>Stagiaires for {selectedOffer.title}</Modal.Header>
          <Modal.Body>
            {data
              .filter((d) => d.id_stage === selectedOffer.id_stage)
              .map((stagiaire) => (
                <div
                  key={stagiaire.id_etudiant}
                  className="border rounded p-4 mb-4 flex justify-between items-center"
                >
                  <div>
                    <p>
                      <strong>
                        Stagiaire : {stagiaire.nom} {stagiaire.prenom}
                      </strong>
                    </p>
                    <p>CV:</p>
                    <Button
                      onClick={() => handleDownloadCV(stagiaire.cv_path)}
                      size="xs"
                      color="gray"
                    >
                      Download CV
                    </Button>
                  </div>
                  <Button
                    onClick={() => handleEditStagiaire(stagiaire)}
                    size="xs"
                    color="success"
                  >
                    Edit
                  </Button>
                </div>
              ))}
          </Modal.Body>
        </Modal>
      )}

      {editingStagiaire && (
        <Modal show={true} onClose={() => setEditingStagiaire(null)}>
          <Modal.Header>Edit Stagiaire</Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              <p>
                Editing{" "}
                <strong>
                  {editingStagiaire.nom} {editingStagiaire.prenom}
                </strong>
              </p>
              <TextInput
                type="number"
                placeholder="Enter note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <TextInput
                type="text"
                placeholder="Enter remark"
                value={remarques}
                onChange={(e) => setRemark(e.target.value)}
              />
              <select
                value={statut}
                onChange={(e) => setStatut(e.target.value)}
                className="border p-2 rounded"
              >
                {/* <option value="">-- Select Status --</option> */}
                <option value="en cours">En cours</option>
                <option value="termine">Terminé</option>
              </select>
              <Button onClick={handleSaveStagiaire} color="success">
                Save
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}

      {savedMessage && (
        <Toast>
          <div className="ml-3 text-sm font-normal">Saved successfully!</div>
        </Toast>
      )}
    </div>
  );
};

export default OffersListPage;
