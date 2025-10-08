import React, { createContext, useState, ReactNode } from "react";

type User = {
  username: string;
  role: "admin" | "client";
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string) => {
    // Dummy login
    if (username === "admin") setUser({ username, role: "admin" });
    else setUser({ username, role: "client" });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
