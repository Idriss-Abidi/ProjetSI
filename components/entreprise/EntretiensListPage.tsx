import { useState, useEffect } from "react";
import { Modal, Button } from "flowbite-react";
import { Entretien } from "@/types";
import { BASE_URL } from "@/constants/baseUrl";

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
  const [savedMessage, setSavedMessage] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    if (data && data.length > 0) {
      // Extract distinct stages based on stage.idStage
      const stages = Array.from(
        new Map(
          data.map((entretien) => [entretien.stage.idStage, entretien])
        ).values()
      );
      setDistinctStages(stages);
      setEntretiens(data);

      // Initialize tempStatut with the initial statutEntretien for each id_etudiant
      const initialStatut = data.reduce((acc, entretien) => {
        acc[entretien.etudiant.idEtudiant] = entretien.statutEntretien;
        return acc;
      }, {} as { [key: string]: string });

      // Initialize tempDate with the initial date_entretien for each id_entretien
      const initialDate = data.reduce((acc, entretien) => {
        acc[entretien.idEntretien] = entretien.dateEntretien;
        return acc;
      }, {} as { [key: string]: string | null });

      setTempStatut(initialStatut);
      setTempDate(initialDate);
    }
  }, [data]);

  const filteredEntretiens = showEntretiens
    ? entretiens.filter(
        (entretien) => entretien.stage.idStage === showEntretiens.stage.idStage
      )
    : [];

  const handleStatusChange = (idEntretien: number, newStatut: string) => {
    // Update tempStatut with the new value based on user selection
    setTempStatut((prevState) => ({
      ...prevState,
      [idEntretien]: newStatut,
    }));
  };

  const handleDateChange = (idEntretien: number, newDate: string | null) => {
    // Update tempDate with the new date value
    setTempDate((prevState) => ({
      ...prevState,
      [idEntretien]: newDate + "T00:00:00",
    }));
  };

  const handleSaveStatus = async (
    idEntretien: number,
    id_etudiant: number,
    id_stage: number,
    offer: number,
    dateEntretien: string | null
  ) => {
    const newStatut =
      tempStatut[idEntretien] !== undefined
        ? tempStatut[idEntretien]
        : entretiens.find((entretien) => entretien.idEntretien === idEntretien)
            ?.statutEntretien; // If statut is undefined, fallback to the current value
    const currentStatut = entretiens.find(
      (entretien) =>
        entretien.etudiant.idEtudiant === id_etudiant &&
        entretien.stage.idStage === offer
    )?.statutEntretien;

    // If statutEntretien has changed, update the entretiens state
    // if (newStatut !== currentStatut) {
    //@ts-ignore
    setEntretiens((prevEntretiens) =>
      prevEntretiens.map((entretien) =>
        entretien.idEntretien === idEntretien
          ? {
              ...entretien,
              statutEntretien: newStatut,
              dateEntretien:
                dateEntretien || new Date().toISOString().split("T")[0],
            }
          : entretien
      )
    );
    // }

    // Create the JSON object
    const updatedData = {
      dateEntretien: dateEntretien || new Date().toISOString().split(".")[0],
      statutEntretien: newStatut,
    };

    // Log the JSON object to the console
    console.log("Updated data:", updatedData);

    // Show the success message
    setSavedMessage((prevState) => ({
      ...prevState,
      [id_etudiant]: true,
    }));

    //
    const response = await fetch(`${BASE_URL}/entretien/${idEntretien}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedData), // Directly send the updatedData object
    });

    if (!response.ok) {
      console.error("Error rejecting candidature:", response.statusText);
      return;
    }

    window.location.reload();
    // Hide the success message after 2 seconds
    setTimeout(() => {
      setSavedMessage((prevState) => ({
        ...prevState,
        [id_etudiant]: false,
      }));
    }, 1000);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">List of Offers</h1>
      <div className="space-y-4">
        {distinctStages.map((stage) => (
          <div
            key={stage.stage.idStage}
            className="flex justify-between items-center p-4 border rounded"
          >
            <div>
              <h3 className="text-lg font-semibold">{stage.stage.titre}</h3>
              <p>Description: {stage.stage.description}</p>
              <p>Types: {stage.stage.abbreviation}</p>
              <p>Tags: {stage.stage.tags}</p>
              <p>Date Debut: {stage.stage.dateDebut}</p>
              <p>Date Fin: {stage.stage.dateFin}</p>
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
          <Modal.Header>
            Entretiens for {showEntretiens.stage.titre}
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              {filteredEntretiens.map((entretien) => (
                <div
                  key={entretien.idEntretien}
                  className="flex justify-between items-center p-4 border rounded"
                >
                  <div>
                    <h3 className="text-lg font-semibold">
                      Student: {entretien.etudiant.user.nom}{" "}
                      {entretien.etudiant.user.prenom}
                    </h3>
                    {/* Use defaultValue for the date field */}
                    <div>
                      <p>Date: {entretien.dateEntretien.split("T")[0]}</p>
                      <input
                        type="date"
                        defaultValue={
                          tempDate[entretien.idEntretien + "T00:00:00"] ||
                          new Date().toISOString().split("T")[0] // Ensure format is yyyy-mm-dd for type="date"
                        }
                        className="border rounded px-2 py-1"
                        onChange={
                          (e) =>
                            handleDateChange(
                              entretien.idEntretien,
                              e.target.value
                            ) // e.target.value will also be in yyyy-mm-dd
                        }
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-4">
                      <select
                        value={
                          tempStatut[entretien.idEntretien] ||
                          entretien.statutEntretien
                        }
                        onChange={(e) =>
                          handleStatusChange(
                            entretien.idEntretien,
                            e.target.value
                          )
                        }
                        className="border rounded px-2 py-1"
                      >
                        <option value="EN_ATTENTE">En attente</option>
                        <option value="ACCEPTE">Accepted</option>
                        <option value="REFUSE">Rejected</option>
                        <option value="EN_COURS">EN cours</option>
                      </select>
                      <Button
                        onClick={() => {
                          handleSaveStatus(
                            entretien.idEntretien,
                            entretien.etudiant.idEtudiant,
                            entretien.stage.idStage,
                            entretien.stage.idStage,
                            tempDate[entretien.idEntretien]
                          );
                        }}
                        size="sm"
                        color="success"
                      >
                        Save
                      </Button>

                      {/* Show success message if statut was updated */}
                      {savedMessage[entretien.idEntretien] && (
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
