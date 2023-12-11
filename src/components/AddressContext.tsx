import React, { createContext, ReactNode, useContext, useState } from 'react';

interface AddressContextProps {
  children: ReactNode;
}

interface AddressContextValue {
  address: string | undefined;
  setAddress: (address: string) => void;
}

const AddressContext = createContext<AddressContextValue | undefined>(undefined);

export const AddressProvider: React.FC<AddressContextProps> = ({ children }) => {
  const [address, setAddress] = useState<string | undefined>(undefined);

  return (
    <AddressContext.Provider value={{ address, setAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error('useAddress must be used within an AddressProvider');
  }
  return context;
};
