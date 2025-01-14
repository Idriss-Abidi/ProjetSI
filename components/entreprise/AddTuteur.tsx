import { BASE_URL } from "@/constants/baseUrl";
import { Filiere } from "@/types";
import useFetch from "@/utils/useFetch";
import { useState, useEffect } from "react";

const AddTuteurForm = () => {
  // Fetch the user data
  const gest = useFetch(`${BASE_URL}/user-info`, {
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
    userType: "TUTEUR",
    id_entreprise: null, // Default value is null
    tel: "",
  });

  useEffect(() => {
    // Ensure that gest.data is available and then set the id_entreprise
    if (gest.data?.entreprise?.idEntreprise) {
      setFormData((prevData) => ({
        ...prevData,
        id_entreprise: gest.data.entreprise.idEntreprise,
      }));
    }
  }, [gest.data]); // Run this effect when gest.data changes

  console.log("idEntreprise is:", formData.id_entreprise);
  console.log("info : ", formData);

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

    const newTuteur = {
      nom: formData.nom,
      prenom: formData.prenom,
      password: formData.nom + "_" + formData.prenom, // Assuming password is CNE by default
      email: formData.email,
      tel: formData.tel,
      userType: formData.userType,
      id_entreprise: formData.id_entreprise,
    };

    console.log(newTuteur);
    // Uncomment to submit the form data
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newTuteur),
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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Ajouter Tuteur</h1>
      <form
        onSubmit={handleSubmit}
        // className="space-y-6 bg-white p-4 rounded-lg shadow-lg"
        className="space-y-4"
      >
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
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            placeholder="Entrer Téléphone"
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
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTuteurForm;
