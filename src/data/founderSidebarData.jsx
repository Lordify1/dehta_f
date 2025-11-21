import { FaBriefcase, FaHome, FaUser, FaSignOutAlt, FaStore, FaWallet, FaChartLine } from "react-icons/fa";


export const founderSidebar = [
    { 
      label: "Dashboard",
      path: "/dashboard",
      icon: <FaHome className="text-[var(--accent-foreground)]"/>
    },
    { 
      label: "Projects",
      path: "/",
      icon: <FaBriefcase className="text-[var(--accent-foreground)]"/> 
    },
    { 
      label: "TrendBet",
      path: "/trendbet",
      icon: <FaChartLine className="text-[var(--accent-foreground)]"/> 
    },
    {
      label: "Profile",
      path: "/profile",
      icon: <FaUser className="text-[var(--accent-foreground)]"/>,
      seperate: true,
      first: true
    },
    {
      label: "Market",
      path: "/market",
      icon: <FaStore className="text-[var(--accent-foreground)]"/>,
      seperate: true,
    },
    {
      label: "Wallet",
      path: "/wallet",
      icon: <FaWallet className="text-[var(--accent-foreground)]"/>,
      seperate: true,
    },
  ];
