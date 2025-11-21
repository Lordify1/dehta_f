import React, { useEffect, useState } from "react";
import { FaBars, FaSearchDollar, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { advisorName, advisorUrl, appName, appUrl } from "@/app";
import { LoadingDiv, classMap, buttonClass } from "@/components/Tools/Misc";
import { FaGlasses, FaFire, FaLock, FaShoppingCart, FaCoins, FaTrophy, FaSearch } from "react-icons/fa";
import { founderSidebar } from "@/data/founderSidebarData";
import { investorSidebar } from "@/data/investorSidebarData";
import { Helmet } from "react-helmet-async";
import { Link, Navigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import Modal from "@/components/ui/Modal";
import axios from "axios";



type SidebarItem = {
  label: string;
  path: string;
  icon?: string;
  method?: any;
  button?: string
};

type Props = {
  children: React.ReactNode;
  sidebarData: any;
  sidebarDataType: string;
  title?: string;
  user?: any
};

const DashboardLayout = ({children, sidebarData, sidebarDataType, title }: Props) => {
  const {user, setRole, setSidebarData} = useUser();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [sidebar, setSidebar] = useState(sidebarData);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const [lens, setLens] = useState(user?.total_lens || 0);
  const [glasses, setGlasses] = useState(user?.total_glasses || 0);

  const Logout = async () => {
    try{
      const res = await axios.post(`${appUrl}/logout`);
      console.log(res)
      window.location.href = appUrl
    }catch(err){
      console.log(err)
    }
  }
  

  useEffect(() => {
    if(user?.role === 'founder'){
      setSidebar(founderSidebar)
      setRole(user?.role)
      setSidebarData(founderSidebar)
    }else if(user?.role === 'investor'){
      setSidebar(investorSidebar)
      setSidebarData(investorSidebar)
      setRole(user?.role)
    }else{
      setSidebar(founderSidebar)
      setSidebarData(founderSidebar)
      setRole(user?.role)
    }
  },[])

  return (
    <>
    <div className="relative min-h-screen flex bg-background text-primary">
      
      {/* Overlay (for mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-accent border-t border-border flex justify-around items-center py-3 z-50 shadow-lg md:hidden">
          {sidebarData && sidebarData.length > 0 && sidebarData.map(({label, path, icon}:{label:string, path:string, icon:any}) => {
            const index = 0;
            return(
              <React.Fragment key={index + 1}>
              {
                <Link
                  replace={true}
                  to={appUrl + path}
                  className="flex flex-col items-center  hover:opacity-80 transition"
                >
                  <span className="text-lg">{icon || "•"}</span>
                  <small className="text-xs">{label}</small>
                </Link>
              }
            </React.Fragment>
            )
          })}
        </nav>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-accent border border-border px-6 py-4 flex flex-row w-full items-center justify-between">
          <Link
            to={`${appUrl}/index`}
            className="text-2xl font-extrabold tracking-wider text-[var(--primary)] select-none cursor-default"
          >
            <img src={`${appUrl}/favicon.ico`} alt="" />
          </Link>
          <div className="flex items-center space-x-4">
            {/* <appkit-button/> */}
            <span className={`${classMap.tempBtn}`}>
              <FaGlasses className="inline text-[var(--owner)] mr-1"/> {glasses}
            </span>
            <span className={`${classMap.tempBtn}`}><FaSearchDollar className="inline text-[var(--owner)] mr-1"/> {lens.toLocaleString()}</span>
            <h1 className="hidden md:block font-medium text-sm text-primary">
              {user?.username || "User"}
            </h1>
            {/* <img src={user?.avatar || "https://placehold.co/100x100"} alt="" className="w-10 h-10 rounded-full object-cover shadow-lg" /> */}
            <FaSignOutAlt 
            onClick={() => {Logout()}}
            className="ms-2 text-red-600 cursor-pointer"/>
          </div>
        </header>

        <div className="flex flex-row">
          {/* Sidebar */}
        <aside
          className={`fixed md:static top-0 left-0 z-50 w-50 bg-accent border-r border-border p-6 transform transition-transform duration-200 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="flex flex-col items-start justify-between min-h-screen">
            <div>
              <nav className="space-y-4">
                {sidebarData && sidebarData.length > 0 && sidebarData.map(({label, path, icon}:{label:string, path:string, icon:any}) => {
                  const index = 0;
                  return(
                    <>
                      {
                      <Link
                        key={index + 1}
                        replace={true}
                        to={appUrl + path}
                        className="flex items-center gap-3 hover:bg-background px-4 py-2 rounded-md transition cursor-pointer"
                      >
                        <span>{icon || "•"}</span>
                        <h5>{label}</h5>
                      </Link>
                      }
                    </>
                  )
                })}
              </nav>
            </div>
          </div>
          {/* Close btn for mobile */}
          {/* <button
            className="absolute top-4 right-4 text-red-500 opacity-20 hover:opacity-100 md:hidden"
            onClick={closeSidebar}
          >
            <FaTimes size={20} />
          </button> */}
        </aside>

        {/* Page content */}
        <section className="p-6 flex-1 mb-10">
          {children}
        </section>
        </div>
      </main>
    </div>
    </>
  );
};

export default DashboardLayout;