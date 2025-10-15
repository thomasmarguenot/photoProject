export interface Technology {
  name: string;
  icon: string;
  color: string;
}

export interface TechStackCardProps {
  technologies?: Technology[];
}
