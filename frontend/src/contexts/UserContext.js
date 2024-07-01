// frontend/src/contexts/UserContext.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState('default_username'); // Ganti dengan username yang diambil dari login

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {children}
        </UserContext.Provider>
    );
};
