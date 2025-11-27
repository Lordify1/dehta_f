import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { advisorUrl, appUrl, apiUrl } from "@/app";
import { founderSidebar } from "@/data/founderSidebarData";
import { investorSidebar } from "@/data/investorSidebarData";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Grab cached user on first render
    const cached = localStorage.getItem("user");
    return cached ? JSON.parse(cached) : null;
  });

  const [loading, setLoading] = useState(!user); 
  const [sidebarData, setSidebarData] = useState(() => {
    if (!user) return null;
    return user.role === "founder" ? founderSidebar : investorSidebar;
  });
  const [role, setRole] = useState(user?.role || null);

  const syncSidebar = (role) => {
    setSidebarData(role === "founder" ? founderSidebar : investorSidebar);
  };

  const getUser = async () => {
    try {
      await axios.get(`${apiUrl}/sanctum/csrf-cookie`, {
        withCredentials: true
      })
      
      const isAuth = await axios.post(`${apiUrl}/api/auth-check`);
      if (!isAuth) return;

      const res = await axios.post(`${apiUrl}/api/user`);
      if (res?.data) {
        setUser(res.data);
        setRole(res.data.role || null);
        syncSidebar(res.data.role);
        localStorage.setItem("user", JSON.stringify(res.data));
      }
    } catch (error) {
      // console.error("Error fetching user:", error);
      setUser(null);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Still hit backend to validate or update user
    getUser();
  }, []);

  const logout = () => {
    setUser(null);
    setRole(null);
    setSidebarData(null);
    localStorage.removeItem("user");
    // Also call your backend logout if needed
  };

  return (
    <UserContext.Provider 
      value={{ user, setUser, loading, role, setRole, sidebarData, setSidebarData, logout, getUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);