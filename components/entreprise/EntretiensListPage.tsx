import { useState, useEffect } from "react";
import { Modal, Button } from "flowbite-react";

interface Entretien {
  id_stage: number;
  title: string;
  description: string;
  date_debut: string;
  date_fin: string;
  type: string[];
  tags: string[];
  date_entretien: string | null; // Ensure nullable date
  statut_entretien: string;
  cv_path: string;
  id_etudiant: number;
  nom: string;
  prenom: string;
}

const EntretienListPage: React.FC<{ data?: Entretien[] }> = ({ data = [] }) => {
  const [distinctStages, setDistinctStages] = useState<Entretien[]>([]);
  const [entretiens, setEntretiens] = useState<Entretien[]>([]);
  const [showEntretiens, setShowEntretiens] = useState<Entretien | null>(null);
  const [selectedEntretien, setSelectedEntretien] = useState<Entretien | null>(
    null
  );
  const [tempStatut, setTempStatut] = useState<{ [key: string]: string }>({});
  const [tempDate, setTempDate] = useState<{ [key: string]: string | null }>(
    {}
  );

  // Show success message for saving the statut
  const [savedMessage, setSavedMessage] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    if (data && data.length > 0) {
      // Extract distinct stages based on id_stage
      const stages = Array.from(
        new Map(
          data.map((entretien) => [entretien.id_stage, entretien])
        ).values()
      );
      setDistinctStages(stages);
      setEntretiens(data);
      // Initialize tempStatut with the initial statut_entretien for each id_etudiant
      const initialStatut = data.reduce((acc, entretien) => {
        acc[entretien.id_etudiant] = entretien.statut_entretien;
        return acc;
      }, {} as { [key: string]: string });

      // Initialize tempDate with the initial date_entretien for each id_etudiant
      const initialDate = data.reduce((acc, entretien) => {
        acc[entretien.id_etudiant] = entretien.date_entretien;
        return acc;
      }, {} as { [key: string]: string | null });

      setTempStatut(initialStatut);
      setTempDate(initialDate);
    }
  }, [data]);

  const filteredEntretiens = showEntretiens
    ? entretiens.filter(
        (entretien) => entretien.id_stage === showEntretiens.id_stage
      )
    : [];

  const handleStatusChange = (etudiant: number, newStatut: string) => {
    // Store the status temporarily for each candidature
    setTempStatut((prevState) => ({
      ...prevState,
      [etudiant]: newStatut,
    }));
  };

  const handleDateChange = (etudiant: number, newDate: string | null) => {
    // Store the date temporarily for each candidature
    setTempDate((prevState) => ({
      ...prevState,
      [etudiant]: newDate,
    }));
  };

  const handleSaveStatus = (
    id_etudiant: number,
    offer: number,
    date_selected: string | null
  ) => {
    const newStatut = tempStatut[id_etudiant];
    const currentStatut = entretiens.find(
      (entretien) =>
        entretien.id_etudiant === id_etudiant && entretien.id_stage === offer
    )?.statut_entretien;

    // Only update if statut has changed
    // if (newStatut !== currentStatut) {
    setEntretiens((prevEntretiens) =>
      prevEntretiens.map((entretien) =>
        entretien.id_etudiant === id_etudiant && entretien.id_stage === offer
          ? {
              ...entretien,
              statut_entretien: newStatut,
              date_entretien: date_selected,
            }
          : entretien
      )
    );

    // Create the JSON object
    const updatedData = {
      date_selected,
      id_etudiant,
      id_stage: offer,
      statut_entretien: newStatut,
    };

    // Log the JSON object to the console
    console.log("Updated data:", updatedData);

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
    }, 1000);
    // }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">List of Offers</h1>
      <div className="space-y-4">
        {distinctStages.map((stage) => (
          <div
            key={stage.id_stage}
            className="flex justify-between items-center p-4 border rounded"
          >
            <div>
              <h3 className="text-lg font-semibold">{stage.title}</h3>
              <p>Description: {stage.description}</p>
              <p>Types: {stage.type.join(", ")}</p>
              <p>Tags: {stage.tags.join(", ")}</p>
              <p>Date Debut: {stage.date_debut}</p>
              <p>Date Fin: {stage.date_fin}</p>
            </div>
            <Button onClick={() => setShowEntretiens(stage)}>
              Show Entretiens
            </Button>
          </div>
        ))}
      </div>

      {/* Modal for showing Entretiens */}
      {showEntretiens && (
        <Modal show={true} onClose={() => setShowEntretiens(null)}>
          <Modal.Header>Entretiens for {showEntretiens.title}</Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              {filteredEntretiens.map((entretien) => (
                <div
                  key={entretien.id_etudiant}
                  className="flex justify-between items-center p-4 border rounded"
                >
                  <div>
                    <h3 className="text-lg font-semibold">
                      Student: {entretien.nom} {entretien.prenom}
                    </h3>
                    {/* Use defaultValue for the date field */}
                    <div>
                      <p>Date:</p>
                      <input
                        type="date"
                        defaultValue={
                          tempDate[entretien.id_etudiant] ||
                          new Date().toISOString().split("T")[0]
                        }
                        className="border rounded px-2 py-1"
                        onChange={(e) =>
                          handleDateChange(
                            entretien.id_etudiant,
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <Button
                      size="sm"
                      color="info"
                      //   onClick={() => handleDownloadCV(entretien.cv_path)}
                    >
                      Download CV
                    </Button>
                    <div className="flex items-center space-x-4">
                      <select
                        value={
                          tempStatut[entretien.id_etudiant] ||
                          entretien.statut_entretien
                        }
                        onChange={(e) =>
                          handleStatusChange(
                            entretien.id_etudiant,
                            e.target.value
                          )
                        }
                        className="border rounded px-2 py-1"
                      >
                        <option value="EN_ATTENTE">En attente</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                        <option value="EN_COURS">EN cours</option>
                      </select>
                      <Button
                        onClick={() => {
                          handleSaveStatus(
                            entretien.id_etudiant,
                            entretien.id_stage,
                            tempDate[entretien.id_etudiant]
                          );
                        }}
                        size="sm"
                        color="success"
                      >
                        Save
                      </Button>

                      {/* Show success message if statut was updated */}
                      {savedMessage[entretien.id_etudiant] && (
                        <span className="text-green-500 text-sm ml-2">
                          Saved!
                        </span>
                      )}
                    </div>
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

export default EntretienListPage;
