import { useState } from "react";
import { Label, TextInput, Button, Modal, Select } from "flowbite-react"; // Ensure Flowbite components are properly installed
import { BASE_URL } from "@/constants/baseUrl";
import useFetch from "@/utils/useFetch";
import { Tuteur } from "@/types";

const FormComponent = () => {
  const [titre, setTitre] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [dateDebut, setDateDebut] = useState<string>("");
  const [dateFin, setDateFin] = useState<string>("");
  const [idTuteur, setIdTuteur] = useState<number | undefined>();
  const [showModal, setShowModal] = useState<boolean>(false);

  // Handle radio button change
  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  const token = localStorage.getItem("token") || "";
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const idGest = decodedToken.entityId;

  const gest = useFetch(`${BASE_URL}/user-info`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const gestData = gest.data;
  const idEntrp = gestData?.entreprise?.idEntreprise;
  console.log(idEntrp);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      id_gestionnaire: idGest,
      id_tuteur: idTuteur,
      titre,
      description,
      abbreviation: selectedType,
      tags: tags,
      dateDebut: dateDebut + "T00:00:00",
      dateFin: dateFin + "T00:00:00",
    };

    console.log("Form Data (JSON):", JSON.stringify(formData, null, 2));
    try {
      const response = await fetch(`${BASE_URL}/stage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Data submitted successfully!");
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error("Error submitting data:", errorData);
        alert("Failed to submit data. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data. Please try again.");
    }
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  // Fetch Tuteurs data
  const { data: dataTuteurs } = useFetch(`${BASE_URL}/tuteur/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  // Ensure dataTuteurs is an array and safely filter based on entreprise ID
  const filteredTuteurs = Array.isArray(dataTuteurs)
    ? dataTuteurs.filter(
        (tuteur: Tuteur) => tuteur.entreprise?.idEntreprise === idEntrp
      )
    : [];
  console.log("Filtered Tuteurs:", filteredTuteurs);
  return (
    <div className="p-8 mt-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Creer Offre de Stage
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <Label htmlFor="titre" className="font-bold text-gray-700">
            Titre
          </Label>
          <TextInput
            id="titre"
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            className="mt-1 w-full"
            placeholder="Entrer le titre d'offre"
            required
          />
        </div>
        {/* Description */}
        <div>
          <Label htmlFor="description" className="font-bold text-gray-700">
            Description
          </Label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Entrer la description d'offre"
            required
          />
        </div>
        {/* Types (Radio Buttons) */}
        <div>
          <Label className="font-bold text-gray-700">Type</Label>
          <div className="flex space-x-4 mt-2">
            {["PFA_1A", "PFA_2A", "PFE"].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={type}
                  name="type"
                  value={type}
                  checked={selectedType === type}
                  onChange={() => handleTypeChange(type)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={type} className="text-gray-700">
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>
        {/* Tags */}
        <div>
          <Label htmlFor="tags" className="font-bold text-gray-700">
            Tags
          </Label>
          <TextInput
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-1 w-full"
            placeholder="Enter tags separated by commas (e.g., internship, project)"
            required
          />
        </div>
        {/* Date Debut */}
        <div>
          <Label htmlFor="dateDebut" className="font-bold text-gray-700">
            Date Debut
          </Label>
          <TextInput
            id="dateDebut"
            type="date"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
            className="mt-1 w-full"
            required
          />
        </div>
        {/* Date Fin */}
        <div>
          <Label htmlFor="dateFin" className="font-bold text-gray-700">
            Date Fin
          </Label>
          <TextInput
            id="dateFin"
            type="date"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
            className="mt-1 w-full"
            required
          />
        </div>
        {/* Tutor Dropdown */}
        <div>
          <Label htmlFor="tuteur" className="font-bold text-gray-700">
            Tuteur
          </Label>
          <Select
            id="tuteur"
            value={idTuteur || ""}
            onChange={(e) => setIdTuteur(Number(e.target.value))}
            className="mt-1 w-full"
          >
            <option value="">Sélectionner un tuteur</option>
            {filteredTuteurs.map((tuteur: Tuteur) => (
              <option key={tuteur.idTuteur} value={tuteur.idTuteur}>
                {tuteur.user.nom} {tuteur.user.prenom}
              </option>
            ))}
          </Select>
        </div>
        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Soumettre
          </Button>
          <Button
            color="gray"
            onClick={handlePreview}
            className="bg-gray-200 hover:bg-gray-600"
          >
            Aperçu
          </Button>
        </div>
      </form>

      {/* Preview Modal */}
      {showModal && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <Modal.Header>Aperçu</Modal.Header>
          <Modal.Body>
            <h3 className="text-xl font-bold">{titre}</h3>
            <p className="mt-2 text-gray-600">{description}</p>
            <div className="mt-4">
              <strong>Type:</strong> {selectedType}
            </div>
            <div className="mt-4">
              <strong>Tags:</strong>{" "}
              {tags
                .split(",")
                .map((tag) => tag.trim())
                .join(", ")}
            </div>
            <div className="mt-4">
              <strong>Date Debut:</strong> {dateDebut}
            </div>
            <div className="mt-4">
              <strong>Date Fin:</strong> {dateFin}
            </div>
            <div className="mt-4">
              <strong>Tuteur:</strong>{" "}
              {
                filteredTuteurs.find((t: Tuteur) => t.idTuteur === idTuteur)
                  ?.user.nom
              }{" "}
              {
                filteredTuteurs.find((t: Tuteur) => t.idTuteur === idTuteur)
                  ?.user.prenom
              }
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => setShowModal(false)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default FormComponent;
