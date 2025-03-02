import React, { createContext, useContext, useState, useEffect } from 'react';
import { Concept } from '../types';

interface AppState {
    currentView: 'list' | 'detail';
    concepts: Concept[];
    currentConceptId: number | null;
    isLoading: boolean;
    error: string | null;
}

interface AppContextType extends AppState {
    navigateToList: () => void;
    navigateToDetail: (conceptId: number) => void;
    fetchConcepts: () => Promise<void>;
}

const api = {
    getConcepts: async (): Promise<Concept[]> => {
        const response = await fetch(process.env.REACT_APP_API_URL + '/concepts'); 
        if (!response.ok) throw new Error('Failed to fetch concepts');
        return response.json();
    }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    
    const [state, setState] = useState<AppState>({
        currentView: 'list',
        concepts: [],
        currentConceptId: null,
        isLoading: false,
        error: null
    });

    // Navigation functions
    const navigateToList = () => {
        setState(prev => ({ ...prev, currentView: 'list', currentConceptId: null }));
    };

    const navigateToDetail = (conceptId: number) => {
        setState(prev => ({ ...prev, currentView: 'detail', currentConceptId: conceptId }));
    };

    // Fetch all concepts (with detailed data)
    const fetchConcepts = async () => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const concepts = await api.getConcepts();
            setState(prev => ({ ...prev, concepts, isLoading: false }));
        } catch (err) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: err instanceof Error ? err.message : 'Unknown error'
            }));
        }
    };

    // Load initial data
    useEffect(() => {
        fetchConcepts();
    }, []);

    const value = {
        ...state,
        navigateToList,
        navigateToDetail,
        fetchConcepts
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
