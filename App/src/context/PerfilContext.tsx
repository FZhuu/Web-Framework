// context/PerfilContext.tsx
import React, { createContext, useState, useContext } from 'react';

interface PerfilContextType {
    fotoPreview: string | null;
    setFotoPreview: (foto: string | null) => void;
}

const PerfilContext = createContext<PerfilContextType | undefined>(undefined);

export const PerfilProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [fotoPreview, setFotoPreview] = useState<string | null>(null);

    return (
        <PerfilContext.Provider value={{ fotoPreview, setFotoPreview }}>
    {children}
    </PerfilContext.Provider>
);
};

export const usePerfil = () => {
    const context = useContext(PerfilContext);
    if (!context) throw new Error("usePerfil deve estar dentro de PerfilProvider");
    return context;
};
