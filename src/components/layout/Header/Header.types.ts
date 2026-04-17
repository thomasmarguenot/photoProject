export interface HeaderProps {
  title?: string;
  romanTitle?: string;
  hidden?: boolean;
}

export interface NavItem {
  to: string;
  label: string;
  end?: boolean;
}
