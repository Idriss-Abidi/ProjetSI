import { MouseEventHandler } from "react";

export interface CarProps {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
}

export interface FilterProps {
  manufacturer?: string;
  year?: number;
  model?: string;
  limit?: number;
  fuel?: string;
}

export interface HomeProps {
  searchParams: FilterProps;
}

export interface CarCardProps {
  model: string;
  make: string;
  mpg: number;
  transmission: string;
  year: number;
  drive: string;
  cityMPG: number;
}

export interface CustomButtonProps {
  isDisabled?: boolean;
  btnType?: "button" | "submit";
  containerStyles?: string;
  textStyles?: string;
  title: string;
  rightIcon?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface OptionProps {
  title: string;
  value: string;
}

export interface CustomFilterProps {
  title: string;
  options: OptionProps[];
}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}

export interface SearchManuFacturerProps {
  manufacturer: string;
  setManuFacturer: (manufacturer: string) => void;
}


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
}