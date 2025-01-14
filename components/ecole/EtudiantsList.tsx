import { useState, useEffect } from "react";
import { Modal, Button, Label, TextInput, Dropdown } from "flowbite-react";
import { Etudiant, Filiere } from "@/types"; // Assuming you have a Filiere type
import { BASE_URL } from "@/constants/baseUrl";

const EtudiantsList: React.FC<{ data: Etudiant[] }> = ({ data }) => {
  const [etudiants, setEtudiants] = useState<Etudiant[]>([]);
  const [filieres, setFilieres] = useState<Filiere[]>([]); // State for filieres
  const [selectedEtudiant, setSelectedEtudiant] = useState<Etudiant | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state for editing
  const [updatedNom, setUpdatedNom] = useState("");
  const [updatedPrenom, setUpdatedPrenom] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedTel, setUpdatedTel] = useState("");
  const [updatedCNE, setUpdatedCNE] = useState("");
  const [updatedPromo, setUpdatedPromo] = useState("");
  const [updatedNiveau, setUpdatedNiveau] = useState<string>("");
  const [updatedFiliere, setUpdatedFiliere] = useState<number>();

  // State for delete confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [etudiantToDelete, setEtudiantToDelete] = useState<Etudiant | null>(
    null
  );

  useEffect(() => {
    setEtudiants(data);
  }, [data]);

  useEffect(() => {
    // Fetch filieres from the API
    const fetchFilieres = async () => {
      try {
        const response = await fetch(`${BASE_URL}/filiere/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const filieresData = await response.json();
        setFilieres(filieresData);
      } catch (error) {
        console.error("Error fetching filieres:", error);
      }
    };

    fetchFilieres();
  }, []); // Empty dependency array ensures this runs once on mount

  const handleEditClick = (etudiant: Etudiant) => {
    setSelectedEtudiant(etudiant);
    setUpdatedNom(etudiant.user.nom);
    setUpdatedPrenom(etudiant.user.prenom);
    setUpdatedEmail(etudiant.user.email);
    setUpdatedTel(etudiant.user.tel ?? ""); // Use an empty string as fallback if tel is null
    setUpdatedCNE(etudiant.cne);
    setUpdatedPromo(etudiant.promo);
    setUpdatedNiveau(etudiant.niveau);
    setUpdatedFiliere(etudiant?.filiere?.idFiliere);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = () => {
    if (selectedEtudiant) {
      const updatedEtudiant = {
        ...selectedEtudiant,
        nom: updatedNom,
        prenom: updatedPrenom,
        email: updatedEmail,
        tel: updatedTel,
        CNE: updatedCNE,
        promo: updatedPromo,
        niveau: updatedNiveau,
        filiere: updatedFiliere,
      };

      const updatedData = {
        id_etudiant: updatedEtudiant.idEtudiant,
        id_user: updatedEtudiant.user.idUser,
        CNE: updatedEtudiant.CNE,
        promo: updatedEtudiant.promo,
        niveau: updatedEtudiant.niveau,
        filiere: updatedEtudiant.filiere,
        nom: updatedEtudiant.nom,
        prenom: updatedEtudiant.prenom,
        email: updatedEtudiant.email,
        tel: updatedEtudiant.tel,
      };

      console.log(updatedData);

      setIsModalOpen(false);
    }
  };

  const handleDelete = (etudiant: Etudiant) => {
    setEtudiantToDelete(etudiant);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (etudiantToDelete) {
      const deleteData = { id_etudiant: etudiantToDelete.idEtudiant };
      console.log(deleteData);

      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="p-4 mx-auto mt-10 flex justify-center items-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Liste des Etudiants
        </h1>
        <div className="space-y-4 flex-col items-center">
          {etudiants.map((etudiant) => (
            <div
              key={etudiant.idEtudiant}
              className="flex justify-between w-full items-center p-4 border rounded"
            >
              <label htmlFor={`etudiant-${etudiant.idEtudiant}`}>
                {etudiant.user.nom} {etudiant.user.prenom} - Niveau:{" "}
                {etudiant.niveau} - Filière: {etudiant.filiere?.abbreviation}
              </label>
              {/* <div className="flex items-center space-x-2">
                <Button onClick={() => handleEditClick(etudiant)}>
                  Modifier
                </Button>
                <Button onClick={() => handleDelete(etudiant)} color="failure">
                  Supprimer
                </Button>
              </div> */}
            </div>
          ))}
        </div>

        {/* Modal for editing student */}
        {isModalOpen && (
          <Modal show={isModalOpen} onClose={handleCloseModal}>
            <Modal.Header>Modifier les informations de l'étudiant</Modal.Header>
            <Modal.Body>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="CNE">CNE</Label>
                  <TextInput
                    id="CNE"
                    type="text"
                    value={updatedCNE}
                    onChange={(e) =>
                      setUpdatedCNE((e.target as HTMLInputElement).value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="nom">Nom</Label>
                  <TextInput
                    id="nom"
                    type="text"
                    value={updatedNom}
                    onChange={(e) =>
                      setUpdatedNom((e.target as HTMLInputElement).value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="prenom">Prénom</Label>
                  <TextInput
                    id="prenom"
                    type="text"
                    value={updatedPrenom}
                    onChange={(e) =>
                      setUpdatedPrenom((e.target as HTMLInputElement).value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <TextInput
                    id="email"
                    type="email"
                    value={updatedEmail}
                    onChange={(e) =>
                      setUpdatedEmail((e.target as HTMLInputElement).value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="tel">Téléphone</Label>
                  <TextInput
                    id="tel"
                    type="tel"
                    value={updatedTel}
                    onChange={(e) =>
                      setUpdatedTel((e.target as HTMLInputElement).value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="promo">Promo</Label>
                  <TextInput
                    id="promo"
                    type="text"
                    placeholder="Ex: 2024/25"
                    value={updatedPromo}
                    onChange={(e) =>
                      setUpdatedPromo((e.target as HTMLInputElement).value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="niveau">Niveau</Label>
                  <Dropdown label={updatedNiveau}>
                    {["1A", "2A", "3A"].map((niveau) => (
                      <Dropdown.Item
                        key={niveau}
                        onClick={() => setUpdatedNiveau(niveau)}
                      >
                        {niveau}
                      </Dropdown.Item>
                    ))}
                  </Dropdown>
                </div>
                <div>
                  <Label htmlFor="filiere">Filière</Label>
                  <Dropdown label="Filiere">
                    {filieres.map((filiere) => (
                      <Dropdown.Item
                        key={filiere.idFiliere}
                        onClick={() => setUpdatedFiliere(filiere.idFiliere)}
                      >
                        {filiere.nomFiliere}
                      </Dropdown.Item>
                    ))}
                  </Dropdown>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleCloseModal}>Annuler</Button>
              <Button onClick={handleSaveChanges}>Confirmer</Button>
            </Modal.Footer>
          </Modal>
        )}

        {/* Modal for delete confirmation */}
        {isDeleteModalOpen && (
          <Modal
            show={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
          >
            <Modal.Header>Confirmer la suppression</Modal.Header>
            <Modal.Body>
              <p>Êtes-vous sûr de vouloir supprimer cet étudiant ?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button color="gray" onClick={() => setIsDeleteModalOpen(false)}>
                Annuler
              </Button>
              <Button color="failure" onClick={confirmDelete}>
                Confirmer
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default EtudiantsList;
