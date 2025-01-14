import { BASE_URL } from "@/constants/baseUrl";
import { Entreprise } from "@/types";
import useFetch from "@/utils/useFetch";
import { Select } from "flowbite-react";
import { useState } from "react";
import Loading from "../Loading";

const AddGestForm = () => {
  // Fetch the user data
  const {
    data: entreprises = [],
    error,
    //@ts-ignore
    isLoading,
  } = useFetch(`${BASE_URL}/entreprise/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  // Initialize the state for form data
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    userType: "GEST_ENTRE",
    id_entreprise: "",
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

    const newGestEntr = {
      ...formData,
      password: `${formData.nom}_${formData.prenom}`, // Assuming password is generated using name
    };

    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newGestEntr),
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

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-red-500">Failed to load entreprises data.</p>;
  }

  return (
    <div className="p-8 mt-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Ajouter Gestionnaire d'Entreprise
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="Entrer Nom"
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
            placeholder="Entrer Prénom"
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
            placeholder="Entrer Email"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Téléphone */}
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
            placeholder="Entrer Téléphone"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Select Entreprise */}
        <div>
          <label
            htmlFor="id_entreprise"
            className="block text-sm font-medium text-gray-700"
          >
            Entreprise
          </label>
          <Select
            id="id_entreprise"
            name="id_entreprise"
            value={formData.id_entreprise}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="">Sélectionner une entreprise</option>
            {entreprises?.map((entreprise: Entreprise) => (
              <option
                key={entreprise.idEntreprise}
                value={entreprise.idEntreprise}
              >
                {entreprise.nomEntreprise}
              </option>
            ))}
          </Select>
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

export default AddGestForm;
