import React, { useEffect, useState } from "react";
import { FaBars, FaSearchDollar, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { advisorName, advisorUrl, appName, appUrl } from "@/app";
import { LoadingDiv, classMap, buttonClass } from "@/components/Tools/Misc";
import { FaGlasses } from "react-icons/fa";
import { founderSidebar } from "@/data/founderSidebarData";
import { investorSidebar } from "@/data/investorSidebarData";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import { apiUrl } from "../../App";
import { Lens, PresaleBtn } from "../../components/Tools/Misc";
import PayWithDePay from "../../components/ui/PayButton";

type Props = {
  children: React.ReactNode;
  sidebarData: any;
  sidebarDataType: string;
  title?: string;
  classy?: any
};

const DashboardLayout = ({ children, sidebarData, classy }: Props) => {
  const { user, setRole, setSidebarData } = useUser();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [sidebar, setSidebar] = useState(sidebarData);
  const location = useLocation();

  const currentPage = (path:string) => {
    const classes = location.pathname === path ? 'text-(--owner) bg-black rounded-md p-1' : ''
    return classes
  }


  const [lens, setLens] = useState(user?.total_lens || 0);
  const [glasses, setGlasses] = useState(user?.total_glasses || 0);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const Logout = async () => {
    try {
      const res = await axios.post(`${apiUrl}/api/logout`);
      console.log(res);
      localStorage.removeItem('user')
      window.location.href = appUrl;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user?.role === "founder") {
      setSidebar(founderSidebar);
      setSidebarData(founderSidebar);
      setRole(user.role);
    } else if (user?.role === "investor") {
      setSidebar(investorSidebar);
      setSidebarData(investorSidebar);
      setRole(user.role);
    } else {
      setSidebar(founderSidebar);
      setSidebarData(founderSidebar);
      setRole(user?.role);
    }
  }, []);

  return (
    <>
      <div className={`flex flex-row min-h-screen text-primary ${classy ? classy : 'dbBg'}`}>
        
        {/* SIDEBAR */}
        <aside
          className={`fixed md:static top-0 left-0 z-50 w-56 bg-accent border-r border-border p-6 transform transition-transform duration-200 
            h-screen flex flex-col justify-between 
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          {/* TOP NAV BUTTONS */}
          <nav className="flex flex-col space-y-4">
            {sidebar?.map(({ label, path, icon }: any, i: number) => (
              <Link
                key={i}
                replace={true}
                to={appUrl + path}
                className={`flex items-center gap-3 hover:bg-background px-4 py-2 rounded-md transition cursor-pointer ${currentPage(path)}`}
              >
                <span className={`${currentPage(path)}`}>{icon}</span>
                <h5>{label}</h5>
              </Link>
            ))}
          </nav>

          {/* USER INFO + LENS + LOGOUT */}
          <div className="mt-6 border-t border-border pt-6">
            {/* Lens + Glasses */}
            <div className="flex flex-row gap-2 mb-4">
              <div className={`${classMap.tempBtn} bg-black`}>
                <FaGlasses className="inline mr-1" /> {glasses}
              </div>

              <div className={`${classMap.tempBtn} bg-black`}>
                {Lens()} {lens.toLocaleString()}
              </div>
            </div>
            {/* Avatar + Username */}
            <div className="flex items-center gap-3">
              <img
                src={user?.avatar || "https://placehold.co/100x100"}
                className="w-10 h-10 rounded-full object-cover shadow-lg"
              />
              <div className="text-sm font-medium">
                {user?.username || "User"}
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={Logout}
              className="mt-4 flex items-center gap-3 text-red-600 hover:opacity-70 transition ms-2"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT WRAPPER */}
        <div className="flex flex-col flex-1 max-h-screen">
          
          {/* HEADER (Connect + Glass + Lens ONLY) */}
          <header className="bg-accent border-b border-border px-6 py-4 flex w-full items-center justify-between">
            <Link
              to={`/`}
              className="w-15"
            >
              <img src={`/logo.svg`} alt="Dehta+Logo" loading="lazy"/>
            </Link>

            <div className="flex items-center gap-4">
              <appkit-button/>
              <button
                onClick={Logout}
                className="flex items-center text-red-600 hover:opacity-70 transition"
              >
                <FaSignOutAlt />
              </button>
            </div>
          </header>

          {/* SCROLLABLE PAGE CONTENT */}
          <section className="flex-1 overflow-y-auto p-4 lg:p-6 pb-15 lg:pb-0">
            {children}
          </section>
        </div>

        <PresaleBtn/>

        {/* <PayWithDePay amount={0.05}/> */}
        

        {/* MOBILE BOTTOM NAV */}
        <nav className="fixed bottom-0 left-0 right-0 bg-accent border-t border-border flex justify-around items-center py-3 z-50 shadow-lg md:hidden">
          {sidebar?.map(({ label, path, icon }: any, index: number) => (
            <Link
              key={index}
              replace={true}
              to={appUrl + path}
              className={`flex flex-col items-center hover:opacity-80 transition ${currentPage(path)} `}
            >
              <span className={`text-lg`}>{icon}</span>
              <small className="text-xs">{label}</small>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default DashboardLayout;