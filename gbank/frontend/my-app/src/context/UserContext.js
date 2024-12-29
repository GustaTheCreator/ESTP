import React, { createContext, useState } from 'react';

export const UserContext = createContext(); // Criação do contexto

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado global do usuário

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
