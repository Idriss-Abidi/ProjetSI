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

export interface Filiere{
  idFiliere: number;
        nomFiliere: string;
        abbreviation: string
}
export interface Etudiant {
  idEtudiant: number;
  user: User;
  promo: string;
  niveau: string;
  filiere: Filiere | null;
  cne: string;
  chercheStage: string
}

export interface Entreprise {
  idEntreprise: number;
  nomEntreprise: string;
  adresse: string;
  tel: string;
}

export interface Tuteur{
  idTuteur : number;
  user : User;
  entreprise:Entreprise;

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
  tuteur : Tuteur;
}

export interface Affectation{
  stage : Stage;
}

export interface Candidature{
  idCand: number;
  stage: Stage;
  etudiant: Etudiant;
  statutCandidature:string;
  cvPath: string;
}

export interface Entretien{
  idEntretien:number;
  stage: Stage;
  etudiant: Etudiant;
  statutEntretien:string;
  dateEntretien:string;
}

export interface RemarqueStage{
  idRemarque:number;
  stage : Stage;
  etudiant : Etudiant;
  tuteur:Tuteur;
  noteFinale: string,
  remarques: string,
  statutRemarqueStage: string
}


export interface Convention{
  idConvention:number;
  stage: Stage; 
  tuteur: Tuteur; 
  dateDebut: string; 
  dateFin: string; 
  sujet: string; 
  conventionPdf: string;
}
