import { BASE_URL } from "@/constants/baseUrl";
import { Filiere } from "@/types";
import { useState, useEffect } from "react";

const AddEtudiantForm = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    userType: "ETUDIANT", // valeurs possibles: RESPO_STAGE, ADMIN_ECOLE, ETUDIANT, PROFESSEUR, GEST_ENTRE, TUTEUR
    cne: "",
    promo: "",
    niveau: "",
    filiere: null,
    tel: "",
  });

  const [filieres, setFilieres] = useState([]);
  const [loadingFilieres, setLoadingFilieres] = useState(true);

  useEffect(() => {
    const fetchFilieres = async () => {
      try {
        const response = await fetch(`${BASE_URL}/filiere/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFilieres(data);
        } else {
          console.error("Failed to fetch filieres");
        }
      } catch (error) {
        console.error("Error fetching filieres:", error);
      } finally {
        setLoadingFilieres(false);
      }
    };

    fetchFilieres();
  }, []);

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

    const newEtudiant = {
      cne: formData.cne,
      promo: formData.promo,
      niveau: formData.niveau,
      id_filiere: formData.filiere,
      nom: formData.nom,
      prenom: formData.prenom,
      password: formData.cne, // Assuming password is CNE by default
      email: formData.email,
      tel: formData.tel,
      userType: formData.userType,
    };

    console.log(newEtudiant);

    // Uncomment to submit the form data
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newEtudiant),
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
    <div className="max-w-xl mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-4 rounded-lg shadow-lg"
      >
        {/* CNE */}
        <div>
          <label
            htmlFor="cne"
            className="block text-sm font-medium text-gray-700"
          >
            CNE
          </label>
          <input
            type="text"
            name="cne"
            id="cne"
            value={formData.cne}
            onChange={handleChange}
            placeholder="Entrer CNE"
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
            placeholder="Entrer Promo (e.g., 2024/25)"
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
            <option value="">Sélectionner Niveau...</option>
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
            value={formData?.filiere || ""}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loadingFilieres}
          >
            <option value="">Sélectionner Filière...</option>
            {filieres.map((filiere: Filiere) => (
              <option key={filiere.idFiliere} value={filiere.idFiliere}>
                {filiere.nomFiliere} - {filiere.abbreviation}
              </option>
            ))}
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
            className="w-full sm:w-auto mt-4 px-6 py-2 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEtudiantForm;
