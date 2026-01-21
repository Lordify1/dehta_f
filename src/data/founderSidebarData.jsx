import { FaBriefcase, FaHome, FaUser, FaSignOutAlt, FaStore, FaWallet, FaChartLine, FaDollarSign } from "react-icons/fa";


export const founderSidebar = [
    { 
      label: "Dashboard",
      path: "/dashboard",
      icon: <FaHome className="text-[var(--accent-foreground)]"/>
    },
    { 
      label: "Projects",
      path: "/projects",
      icon: <FaBriefcase className="text-[var(--accent-foreground)]"/> 
    },
    { 
      label: "TrendBet",
      path: "/trendbet",
      icon: <FaChartLine className="text-[var(--accent-foreground)]"/> 
    },
    {
      label: "Market",
      path: "/market",
      icon: <FaStore className="text-[var(--accent-foreground)]"/>,
      seperate: true,
    },
    {
      label: "EarnFi",
      path: "/earnfi",
      icon: <FaDollarSign className="text-(--danger)"/>,
      seperate: true,
    },
    {
      label: "Profile",
      path: "/profile",
      icon: <FaUser className="text-[var(--accent-foreground)]"/>,
      seperate: true,
      first: true
    }
  ];
