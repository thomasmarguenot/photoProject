import { createContext, useContext, useState, type ReactNode } from 'react';

interface HeaderContextValue {
  hidden: boolean;
  setHidden: (hidden: boolean) => void;
}

const HeaderContext = createContext<HeaderContextValue | null>(null);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [hidden, setHidden] = useState(false);

  return (
    <HeaderContext.Provider value={{ hidden, setHidden }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeader must be used within HeaderProvider');
  }
  return context;
}
