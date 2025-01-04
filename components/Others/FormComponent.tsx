import { useState } from "react";
import { Label, TextInput, Button, Modal } from "flowbite-react"; // Ensure Flowbite components are properly installed

const FormComponent = () => {
  const [titre, setTitre] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [dateDebut, setDateDebut] = useState<string>("");
  const [dateFin, setDateFin] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prevTypes) =>
      prevTypes.includes(type)
        ? prevTypes.filter((item) => item !== type)
        : [...prevTypes, type]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      titre,
      description,
      types: selectedTypes,
      tags: tags.split(",").map((tag) => tag.trim()),
      date_debut: dateDebut,
      date_fin: dateFin,
    };

    console.log("Form Data (JSON):", JSON.stringify(formData, null, 2));
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <div className="p-8 mt-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Create a New Offer
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
            placeholder="Enter the offer title"
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
            placeholder="Provide a detailed description"
            required
          />
        </div>

        {/* Types */}
        <div>
          <Label className="font-bold text-gray-700">Type</Label>
          <div className="flex space-x-4 mt-2">
            {["PFA-1A", "PFA-2A", "PFE"].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={type}
                  checked={selectedTypes.includes(type)}
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

        {/* Buttons */}
        <div className="flex space-x-4">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Submit
          </Button>
          <Button
            color="gray"
            onClick={handlePreview}
            className="bg-gray-200 hover:bg-gray-600"
          >
            Preview
          </Button>
        </div>
      </form>

      {/* Preview Modal */}
      {showModal && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <Modal.Header>Preview</Modal.Header>
          <Modal.Body>
            <h3 className="text-xl font-bold">{titre}</h3>
            <p className="mt-2 text-gray-600">{description}</p>
            <div className="mt-4">
              <strong>Types:</strong>
              <ul className="list-disc pl-5 text-gray-700">
                {selectedTypes.map((type) => (
                  <li key={type}>{type}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <strong>Tags:</strong>
              <ul className="list-disc pl-5 text-gray-700">
                {tags.split(",").map((tag, index) => (
                  <li key={index}>{tag.trim()}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <strong>Date Debut:</strong> {dateDebut}
            </div>
            <div className="mt-4">
              <strong>Date Fin:</strong> {dateFin}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => setShowModal(false)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default FormComponent;
