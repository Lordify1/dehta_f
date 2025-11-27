import { FaBriefcase, FaHome, FaUser, FaSignOutAlt, FaStore, FaWallet, FaChartLine } from "react-icons/fa";


export const investorSidebar = [
    { 
      label: "Dashboard",
      path: "/dashboard",
      icon: <FaHome className="text-(--accent-foreground)"/>
    },
    { 
      label: "Projects",
      path: "/projects",
      icon: <FaBriefcase className="text-(--accent-foreground)"/> 
    },
    { 
      label: "TrendBet",
      path: "/trendbet",
      icon: <FaChartLine className="text-(--accent-foreground)"/> 
    },
    {
      label: "Profile",
      path: "/profile",
      icon: <FaUser className="text-(--accent-foreground)"/>,
      seperate: true,
      first: true
    },
    {
      label: "Market",
      path: "/market",
      icon: <FaStore className="text-(--danger)"/>,
      seperate: true,
    }
  ];
