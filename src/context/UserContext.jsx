import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { advisorUrl, appUrl } from "@/app";
import { founderSidebar } from "@/data/founderSidebarData";
import { investorSidebar } from "@/data/investorSidebarData";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarData, setSidebarData] = useState(null);
  const [role, setRole] = useState(null);


  const getUser = async () => {
    // try {
    //   const isAuth = await axios.post(`${appUrl}/auth-check`)
    //   console.log(isAuth)
    //   if(!isAuth){
    //     return
    //   };

    //   // If no local user, fetch from API
    //   const res = await axios.post(`${advisorUrl}/user`);
    //   if (res?.data) {
    //     setUser(res.data);
    //     setRole(res.data?.role || null)
    //     setSidebarData(res.data?.role === 'founder' ? founderSidebar : investorSidebar)
    //     localStorage.setItem("fa_user", JSON.stringify(res.data));
    //   }
    // } catch (error) {
    //   console.error("Error fetching user:", error);
    //   setUser(null);
    // } finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, role, setRole, sidebarData, setSidebarData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);