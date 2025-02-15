import React, { createContext, useContext, useEffect, useState } from "react";
import useAuthStore from "../stores/authStore";

// Define the AuthContext Type
interface AuthContextType {
  user: any; // You can specify a better type for user
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create Context with default values
const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, login, logout } = useAuthStore(); // Get Zustand functions

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
