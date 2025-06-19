// context/GlobalContext.js
import React, { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState(() => {
    // Load from localStorage initially
    if (typeof window !== 'undefined') {
      const storedState = localStorage.getItem('globalState');
      return storedState ? JSON.parse(storedState) : {};
    }
    return {};
  });

  // Persist state changes to localStorage
  useEffect(() => {
    localStorage.setItem('globalState', JSON.stringify(globalState));
  }, [globalState]);

  const clearGlobalState = () => {
    setGlobalState({});
    localStorage.removeItem('globalState');
  };

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState, clearGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};
