import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
    id: number;
    isActive: boolean;
    name: {
        first: string;
        last: string;
    };
    email: string;
    dob: {
        age: number;
    };
}

export interface ApiResponse {
    results: User[];
}

interface GlobalState {
    users: User[];
    setUsers: (users: User[]) => void;
}

const GlobalContext = createContext<GlobalState | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<User[]>([]); // Initialize with an empty array
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Function to fetch user data
    const fetchUsers = async () => {
        try {
            const response = await fetch('https://randomuser.me/api/?inc=name,email,dob&results=20&format=json&noinfo');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data: ApiResponse = await response.json();
            const usersWithIds: User[] = data.results.map((user, index) => ({
                ...user,
                id: Math.floor(Math.random() * 1000), // Generate random ID
                isActive: Math.random() > 0.5, // Random true/false value
            }));
            setUsers(usersWithIds);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <GlobalContext.Provider value={{ users, setUsers }}>
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