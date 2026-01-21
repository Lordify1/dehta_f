import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { apiUrl, appUrl } from "@/app";
import { founderSidebar } from "@/data/founderSidebarData";
import { investorSidebar } from "@/data/investorSidebarData";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  // 🔒 auth state
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  // 🚀 boot-only loader (THIS is the important one)
  const [isBooting, setIsBooting] = useState(true);

  // 🔄 action loader (logout, updates, etc)
  const [userLoading, setUserLoading] = useState(false);

  // 📦 extra state
  const [userTrends, setUserTrends] = useState([]);
  const [sidebarData, setSidebarData] = useState(null);

  const syncSidebar = (role) => {
    if (!role) return setSidebarData(null);
    setSidebarData(role === "founder" ? founderSidebar : investorSidebar);
  };

  const hydrateUser = async () => {
    try {
      await axios.get(`${apiUrl}/sanctum/csrf-cookie`, {
        withCredentials: true,
      });

      const isAuth = await axios.post(`${apiUrl}/api/auth-check`, {}, { withCredentials: true });
      if (!isAuth?.data) return;

      const res = await axios.post(`${apiUrl}/api/user`, {}, { withCredentials: true });

      if (res?.data) {
        setUser(res.data);
        setRole(res.data.role || null);
        setUserTrends(res.data.trends || []);
        syncSidebar(res.data.role);
      }
    } catch (err) {
      setUser(null);
      setRole(null);
      setSidebarData(null);
    } finally {
      // ❗ ONLY HERE
      setIsBooting(false);
    }
  };

  useEffect(() => {
    hydrateUser();
  }, []);

  const Logout = async () => {
    setUserLoading(true);
    try {
      await axios.post(`${apiUrl}/api/logout`, {}, { withCredentials: true });
      setUser(null);
      setRole(null);
      setSidebarData(null);
      window.location.href = appUrl;
    } catch (err) {
      console.error(err);
    } finally {
      setUserLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        role,
        sidebarData,
        setSidebarData,
        userTrends,
        isBooting,
        userLoading,
        setUser,
        setRole,
        syncSidebar,
        Logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);