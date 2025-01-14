import { BASE_URL } from "@/constants/baseUrl";
import { useState } from "react";

const AddEntrepriseForm = () => {
  // Initialize the state for form data
  const [formData, setFormData] = useState({
    nomEntreprise: "",
    adresse: "",
    tel: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newEntreprise = {
      nomEntreprise: formData.nomEntreprise,
      adresse: formData.adresse,
      tel: formData.tel,
    };
    console.log(JSON.stringify(newEntreprise));

    try {
      const response = await fetch(`${BASE_URL}/entreprise`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newEntreprise),
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

  return (
    <div className="p-8 mt-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Ajouter Entreprise
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nom */}
        <div>
          <label
            htmlFor="nomEntreprise"
            className="block text-sm font-medium text-gray-700"
          >
            Nom
          </label>
          <input
            type="text"
            name="nomEntreprise"
            id="nomEntreprise"
            value={formData.nomEntreprise}
            onChange={handleChange}
            placeholder="Entrer Nom Entreprise"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Adresse */}
        <div>
          <label
            htmlFor="adresse"
            className="block text-sm font-medium text-gray-700"
          >
            Adresse
          </label>
          <input
            type="text"
            name="adresse"
            id="adresse"
            value={formData.adresse}
            onChange={handleChange}
            placeholder="Entrer Adresse"
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
            type="text"
            name="tel"
            id="tel"
            value={formData.tel}
            onChange={handleChange}
            placeholder="Entrer Téléphone"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto mt-4 px-6 py-2 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEntrepriseForm;
