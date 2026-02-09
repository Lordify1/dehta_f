import { FaBriefcase, FaHome, FaUser, FaSignOutAlt, FaStore, FaWallet, FaChartLine, FaDollarSign } from "react-icons/fa";


export const investorSidebar = [
    { 
      label: "Dashboard",
      path: "/dashboard",
      icon: <FaHome className="text-(--accent-foreground)"/>
    },
    { 
      label: "Buildfi",
      path: "/buildfi",
      icon: <FaBriefcase className="text-(--accent-foreground)"/> 
    },
    { 
      label: "TrendBet",
      path: "/trendbet",
      icon: <FaChartLine className="text-(--accent-foreground)"/> 
    },
    {
      label: "Market",
      path: "/market",
      icon: <FaStore className="text-(--danger)"/>,
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
      icon: <FaUser className="text-(--accent-foreground)"/>,
      seperate: true,
      first: true
    }
  ];
