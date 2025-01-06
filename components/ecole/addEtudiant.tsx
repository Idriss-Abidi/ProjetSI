import { useState } from "react";

const AddEtudiantForm = () => {
  const [formData, setFormData] = useState({
    CNE: "",
    promo: "",
    niveau: "",
    filiere: "",
    nom: "",
    prenom: "",
    email: "",
    tel: "",
    statut: 0,
    userType: "ETUDIANT",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create the JSON object from form data
    const updatedData = {
      CNE: formData.CNE,
      promo: formData.promo,
      niveau: formData.niveau,
      filiere: formData.filiere,
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      tel: formData.tel,
      statut: formData.statut,
      userType: formData.userType,
    };

    console.log(updatedData); // Log the updated data as a JSON object
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="space-y26 bg-white p-2 rounded-lg shadow-lg"
      >
        {/* CNE */}
        <div>
          <label
            htmlFor="CNE"
            className="block text-sm font-medium text-gray-700"
          >
            CNE
          </label>
          <input
            type="text"
            name="CNE"
            id="CNE"
            value={formData.CNE}
            onChange={handleChange}
            placeholder="Enter CNE"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Promo */}
        <div>
          <label
            htmlFor="promo"
            className="block text-sm font-medium text-gray-700"
          >
            Promo
          </label>
          <input
            type="text"
            name="promo"
            id="promo"
            value={formData.promo}
            onChange={handleChange}
            placeholder="Enter Promo (e.g., 2024/25)"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Niveau */}
        <div>
          <label
            htmlFor="niveau"
            className="block text-sm font-medium text-gray-700"
          >
            Niveau
          </label>
          <select
            name="niveau"
            id="niveau"
            value={formData.niveau}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1A">1A</option>
            <option value="2A">2A</option>
            <option value="3A">3A</option>
          </select>
        </div>

        {/* Filière */}
        <div>
          <label
            htmlFor="filiere"
            className="block text-sm font-medium text-gray-700"
          >
            Filière
          </label>
          <select
            name="filiere"
            id="filiere"
            value={formData.filiere}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="GL">GL</option>
            <option value="GD">GD</option>
            <option value="IDSIT">IDSIT</option>
            <option value="SSE">SSE</option>
            <option value="SSI">SSI</option>
            <option value="2IA">2IA</option>
          </select>
        </div>

        {/* Nom */}
        <div>
          <label
            htmlFor="nom"
            className="block text-sm font-medium text-gray-700"
          >
            Nom
          </label>
          <input
            type="text"
            name="nom"
            id="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Enter Nom"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Prénom */}
        <div>
          <label
            htmlFor="prenom"
            className="block text-sm font-medium text-gray-700"
          >
            Prénom
          </label>
          <input
            type="text"
            name="prenom"
            id="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder="Enter Prénom"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tel */}
        <div>
          <label
            htmlFor="tel"
            className="block text-sm font-medium text-gray-700"
          >
            Téléphone
          </label>
          <input
            type="tel"
            name="tel"
            id="tel"
            value={formData.tel}
            onChange={handleChange}
            placeholder="Enter Téléphone"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEtudiantForm;
