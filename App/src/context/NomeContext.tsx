import React, { createContext, useState, useContext } from 'react';

interface NomeContextType {
    nome: string;
    setNome: (nome: string) => void;
}

const NomeContext = createContext<NomeContextType | undefined>(undefined);

export const NomeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [nome, setNome] = useState<string>("");

    return (
        <NomeContext.Provider value={{ nome, setNome }}>
            {children}
        </NomeContext.Provider>
    );
};

export const useNome = () => {
    const context = useContext(NomeContext);
    if (!context) throw new Error("useNome deve estar dentro de NomeProvider");
    return context;
};
