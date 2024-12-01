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

interface FormData {
    firstname: string;
    lastname: string;
    email: string;
    age: string;
    isActive: boolean;
}

interface GlobalState {
    users: User[];
    setUsers: (users: User[]) => void;
    addUser: (formData: FormData) => void;
    deleteUser: (id: number) => void;
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

    // Function to add a new user
    const addUser = (formData: FormData) => {
        const newUser = {
            id: Math.floor(Math.random() * 1000),
            name: {
                first: formData.firstname,
                last: formData.lastname,
            },
            email: formData.email,
            dob: {
                age: parseInt(formData.age, 10),
            },
            isActive: formData.isActive,
        };

        setUsers([...users, newUser]);
    };

    // Function to delete a user
    const deleteUser = (id: number) => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <GlobalContext.Provider value={{ users, setUsers, addUser, deleteUser }}>
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