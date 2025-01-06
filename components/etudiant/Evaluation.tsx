import { useState, useEffect } from "react";
import { Modal, Button, Toast } from "flowbite-react";
interface Offer {
  id_stage: number;
  id_entreprise: number;
  entreprise: string;
  conventionCode: string;
  title: string;
  description: string;
  date_debut: string;
  date_fin: string;
  type: string[];
  tags: string[];
  id_tuteur: number;
  nom_tuteur: string;
  prenom_tuteur: string;
  email_tuteur: string;
  tel_tuteur: string;
  note: string | null;
  remarques: string;
  id_etudiant: number;
  CNE: string;
  promo: string;
  niveau: string;
  filiere: string;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  userType: string;
  tel: string;
  statut_etudiant: number;
  cv_path: string;
  convention_path: string;
  statut: string;
}

interface OffersListPageProps {
  data: Offer[];
}

const EvaluationPage: React.FC<OffersListPageProps> = ({ data }) => {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const uniqueOffers = Array.from(
      new Map(data.map((offer) => [offer.id_stage, offer])).values()
    );
    setOffers(uniqueOffers);
  }, [data]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Evaluation de Stage:</h1>
      <div className="space-y-4">
        {offers.map((offer) => (
          <div key={offer.id_stage} className="border rounded p-4">
            {/* Top Section with Étudiant and Tuteur Cards */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border rounded p-4">
                <h2 className="font-semibold text-lg">Étudiant Information</h2>
                <p>
                  <strong>Nom:</strong> {offer.nom}
                </p>
                <p>
                  <strong>Prénom:</strong> {offer.prenom}
                </p>
                <p>
                  <strong>Filière:</strong> {offer.filiere}
                </p>
                <p>
                  <strong>Niveau:</strong> {offer.niveau}
                </p>
                <p>
                  <strong>Email:</strong> {offer.email}
                </p>
                <p>
                  <strong>Téléphone:</strong> {offer.tel}
                </p>
              </div>
              <div className="border rounded p-4">
                <h2 className="font-semibold text-lg">Tuteur Information</h2>
                <p>
                  <strong>Nom:</strong> {offer.nom_tuteur}
                </p>
                <p>
                  <strong>Prénom:</strong> {offer.prenom_tuteur}
                </p>
                <p>
                  <strong>Entreprise:</strong> {offer.entreprise}
                </p>
                <p>
                  <strong>Téléphone:</strong> {offer.tel_tuteur}
                </p>
                <p>
                  <strong>Email:</strong> {offer.email_tuteur}
                </p>
              </div>
            </div>

            {/* Wide Card for Stage Information */}
            <div className="border rounded p-4 mb-4">
              <h2 className="font-semibold text-lg">Stage Information</h2>
              <p>
                <strong>Titre:</strong> {offer.title}
              </p>
              <p>
                <strong>Description:</strong> {offer.description}
              </p>
              <p>
                <strong>Tags:</strong> {offer.tags.join(", ")}
              </p>
              <p>
                <strong>Type:</strong> {offer.type.join(", ")}
              </p>
              <p>
                <strong>Dates:</strong> {offer.date_debut} - {offer.date_fin}
              </p>
            </div>

            {/* Note and Remarque Section */}
            <div className="border rounded p-4">
              <h2 className="font-semibold text-lg">Notes and Remarque</h2>
              <p>
                <strong>Note:</strong> {offer.note || "No note available"}
              </p>
              <p>
                <strong>Remarque:</strong>{" "}
                {offer.remarques || "No remark available"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvaluationPage;
