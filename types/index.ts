export type UserType = "GEST_ENTRE" | "RESPO_STAGE" | "ADMIN_ECOLE" | "ETUDIANT" | "PROFESSEUR" | "TUTEUR"; // Add more user types as needed
export type StageStatutType = "EN_ATTENTE" | "ACCEPTE" | "REFUSE" | "EXPIRE";

export interface User {
  idUser: number;
  nom: string;
  prenom: string;
  email: string;
  tel: string | null;
  userType: UserType;
}

export interface Entreprise {
  idEntreprise: number;
  nomEntreprise: string;
  adresse: string;
  tel: string;
}

export interface Gestionnaire {
  idGestEntr: number;
  user: User;
  entreprise: Entreprise;
}

export interface Stage {
  idStage: number;
  gestionnaire: Gestionnaire;
  titre: string;
  description: string;
  dateDebut: string; // ISO 8601 format
  dateFin: string; // ISO 8601 format
  statut: StageStatutType;
  abbreviation: "PFA_1A" | "PFA_2A" | "PFE";
  tags:string;
}

export interface Affectation{
  stage : Stage;
  statutAffectation:string;
}