export interface SidebarButtonsTypes {
  name: string[];
}

export interface ButtonTypes {
  name: string;
  onChange: () => void;
  className: string;
}

interface Option {
  id: number;
  name: string;
}

export interface CustomSelectProps {
  defaultText: string;
  optionsList: Option[];
  onSelect: (selectedItem: string) => void;
}

export interface LayoutTypes {
  children: React.ReactNode;
}
