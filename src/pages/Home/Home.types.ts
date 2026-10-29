interface ProjectDetail {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies?: string[];
  details?: ProjectDetail[];
}
