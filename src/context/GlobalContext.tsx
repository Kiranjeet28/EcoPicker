// context/GlobalContext.tsx
'use client'; // if you're using App Router (Next.js 13+)

import React, { createContext, useContext, useState, ReactNode } from 'react';

type GlobalContextType = {
    topic : string;
    setTopic: (topic: string) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [topic, setTopic] = useState('GDP Growth');

    return (
        <GlobalContext.Provider value={{ topic, setTopic }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};
