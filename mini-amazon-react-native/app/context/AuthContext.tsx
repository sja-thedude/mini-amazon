import React, { createContext, useState, ReactNode } from "react";
import { User } from "../types/user";

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string, role: "admin" | "client") => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string, role: "admin" | "client") => {
    if (
      (role === "admin" && username === "admin" && password === "admin123") ||
      (role === "client" && username === "client" && password === "client123")
    ) {
      setUser({ username, role });
    } else {
      alert("Invalid credentials");
    }
  };

  const logout = () => {
  console.log("AuthProvider: logging out (before setUser):", user);
  setUser(null);
  console.log("AuthProvider: user after setUser:", null);
};

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
