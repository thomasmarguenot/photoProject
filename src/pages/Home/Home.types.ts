export interface Technology {
  name: string;
  icon?: string;
}

export interface Client {
  name: string;
  logo?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  technologies?: string[];
}

export interface AgencyInfo {
  name: string;
  tagline: string;
  description: string;
  link: string;
}
