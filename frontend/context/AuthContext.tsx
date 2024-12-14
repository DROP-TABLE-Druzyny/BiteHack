'use client'

import { clientService } from "@/services";
import { IClientService } from "@/services/ClientService";
import { createContext, useContext } from "react";

const AuthContext = createContext<IClientService>(clientService);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    return (
    <AuthContext.Provider value={clientService}>
        {children}
    </AuthContext.Provider>
    );
};
    
export const useMapContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
    throw new Error('useMapContext must be used within a MapProvider');
    }
    return context;
};
    