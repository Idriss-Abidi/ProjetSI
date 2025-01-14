import { useState, useEffect } from "react";
import { RemarqueStage } from "@/types";

interface EvaluationPageProps {
  data: RemarqueStage; // Explicitly define the props structure
}

const EvaluationPage: React.FC<EvaluationPageProps> = ({ data }) => {
  const [stageFinal, setStage] = useState<RemarqueStage>();

  useEffect(() => {
    setStage(data);
  }, [data]);
  // console.log("ok:", stageFinal);
  return (
    <div className="p-4">
      {/* <div className="mt-4 flex justify-center items-center bg-yellow-100 text-yellow-800 p-4 rounded-md shadow-md border border-yellow-300">
        <p className="text-lg font-semibold">
          Stage est {stageFinal?.statutRemarqueStage}
        </p>
      </div> */}
      <h1 className="text-2xl font-bold mb-4">Evaluation de Stage: </h1>{" "}
      <small>{stageFinal?.statutRemarqueStage.replace("_", " ")}</small>
      <div className="space-y-4">
        <div key={stageFinal?.idRemarque} className="border rounded p-4">
          {/* Top Section with Étudiant and Tuteur Cards */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="border rounded p-4">
              <h2 className="font-semibold text-lg">Étudiant Information</h2>
              <p>
                <strong>Nom:</strong> {stageFinal?.etudiant?.user?.nom || "N/A"}
              </p>
              <p>
                <strong>Prénom:</strong>{" "}
                {stageFinal?.etudiant?.user?.prenom || "N/A"}
              </p>
              <p>
                <strong>Filière:</strong>{" "}
                {stageFinal?.etudiant?.filiere?.nomFiliere || "N/A"}
              </p>
              <p>
                <strong>Niveau:</strong> {stageFinal?.etudiant?.niveau || "N/A"}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {stageFinal?.etudiant?.user?.email || "N/A"}
              </p>
              {/* <p>
                <strong>Téléphone:</strong>{" "}
                {stageFinal?.etudiant?.user?.tel || "N/A"}
              </p> */}
            </div>
            <div className="border rounded p-4">
              <h2 className="font-semibold text-lg">Tuteur Information</h2>
              <p>
                <strong>Nom:</strong>{" "}
                {stageFinal?.stage?.tuteur?.user?.nom || "N/A"}
              </p>
              <p>
                <strong>Prénom:</strong>{" "}
                {stageFinal?.stage?.tuteur?.user?.prenom || "N/A"}
              </p>
              <p>
                <strong>Entreprise:</strong>{" "}
                {stageFinal?.stage?.tuteur?.entreprise?.nomEntreprise || "N/A"}
              </p>
              {/* <p>
                <strong>Téléphone:</strong>{" "}
                {stageFinal?.stage?.tuteur?.user?.tel || "N/A"}
              </p> */}
              <p>
                <strong>Email:</strong>{" "}
                {stageFinal?.stage?.tuteur?.user?.email || "N/A"}
              </p>
            </div>
          </div>

          {/* Wide Card for StageFinal Information */}
          <div className="border rounded p-4 mb-4">
            <h2 className="font-semibold text-lg">Stage Information</h2>
            <p>
              <strong>Titre:</strong> {stageFinal?.stage?.titre || "N/A"}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {stageFinal?.stage?.description || "N/A"}
            </p>
            <p>
              <strong>Tags:</strong> {stageFinal?.stage?.tags || "N/A"}
            </p>
            <p>
              <strong>Type:</strong> {stageFinal?.stage?.abbreviation || "N/A"}
            </p>
            <p>
              <strong>Dates:</strong>{" "}
              {stageFinal?.stage?.dateDebut.split("T")[0] || "N/A"} -{" "}
              {stageFinal?.stage?.dateFin.split("T")[0] || "N/A"}
            </p>
          </div>

          {/* Note and Remarque Section */}
          <div className="border rounded p-4">
            <h2 className="font-semibold text-lg">Notes and Remarque</h2>
            <p>
              <strong>Note:</strong>{" "}
              {stageFinal?.noteFinale || "No note available"}
            </p>
            <p>
              <strong>Remarque:</strong>{" "}
              {stageFinal?.remarques || "No remarque available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationPage;
