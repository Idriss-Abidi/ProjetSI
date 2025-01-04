import React, { useState } from "react";

interface Candidature {
  etudiant: number;
  nom: string;
  prenom: string;
  cv_path: string;
  statut: string;
  offer: number;
}

interface CandidatureListProps {
  candidaturesData: Candidature[];
}
const CandidatureList: React.FC<CandidatureListProps> = ({
  candidaturesData,
}) => {
  const [candidatures, setCandidatures] =
    useState<Candidature[]>(candidaturesData);

  const handleStatusChange = (
    etudiant: number,
    offer: number,
    newStatut: string
  ) => {
    setCandidatures((prevCandidatures) =>
      prevCandidatures.map((c) =>
        c.offer === offer && c.etudiant == etudiant
          ? { ...c, statut: newStatut }
          : c
      )
    );
  };

  const handleExportCV = (cvPath: string) => {
    const link = document.createElement("a");
    link.href = cvPath;
    link.download = cvPath.split("/").pop() || "cv.pdf"; // Extract file name from path
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Candidatures list */}
      {candidatures.map((candidature) => (
        <div
          key={candidature.offer && candidature.etudiant}
          className="flex justify-between items-center p-4 border rounded"
        >
          <div>
            <h3 className="text-lg font-semibold">
              Etudiant(e) : {candidature.nom} - {candidature.prenom}
            </h3>
            <p>
              CV PDF:{" "}
              <button
                onClick={() => handleExportCV(candidature.cv_path)}
                className="text-blue-500 underline"
              >
                Download CV
              </button>
            </p>
          </div>
          <div className="flex space-x-4 items-center">
            <select
              value={candidature.statut}
              onChange={(e) =>
                handleStatusChange(
                  candidature.offer,
                  candidature.etudiant,
                  e.target.value
                )
              }
              className="border rounded px-2 py-1"
            >
              <option value="en attente">En attente</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CandidatureList;
