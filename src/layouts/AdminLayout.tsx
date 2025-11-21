// AdminLayout.tsx
import { Head, usePage } from "@inertiajs/react";
import { sidebarData } from "@/data/sidebarData";
import { PropsWithChildren, useState } from "react";
import { appUrl } from "@/app";
import { Link } from "react-router-dom";
import { FaBars, FaHamburger, FaIdeal, FaSignOutAlt } from "react-icons/fa";
import { useUser } from "@/context/UserContext";
import { classMap } from "@/components/Tools/Misc";
import axios from "axios";



export const AdminLayout = ({ children }: PropsWithChildren) => {
  const {user} = useUser();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [sidebar, setSidebar] = useState(sidebarData);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);


    const Logout = async () => {
      try{
        const res = await axios.post(`${appUrl}/logout`);
        console.log(res)
        window.location.href = appUrl
      }catch(err){
        console.log(err)
      }
    }


    
    
  return (
    <div className="min-h-screen flex-1 flex flex-col text-primary bg-background">
      <header className="bg-accent border border-border px-6 py-4 flex flex-row w-full items-center justify-between">
        <Link
          to={`${appUrl}/index`}
          className="text-2xl font-extrabold tracking-wider text-[var(--primary)] select-none cursor-default"
        >
          <img src={`${appUrl}/favicon.ico`} alt="" />
        </Link>
        <div className="hidden lg:flex items-center space-x-4">
          <h1 className="font-medium text-sm text-primary">
            {user?.username || user?.name}
          </h1>
          <img src={user?.avatar || "https://placehold.co/100x100"} alt="" className="w-10 h-10 rounded-full object-cover shadow-lg" />
          <FaSignOutAlt 
            onClick={() => {Logout()}}
            className="text-red-600 cursor-pointer"/>
        </div>
        

        {/* Mobile icon  */}
        <div className="lg:hidden md:hidden flex items-center space-x-4">
          <FaBars
          onClick={() => setSidebarOpen(isSidebarOpen ? false : true)}
          className={`text-lg text-primary`}/>
        </div>
      </header>
      {/* Sidebar */}
      <div className="flex flex-row min-h-screen">
      <aside
      className="w-[200px] bg-accent border-r border-border p-6 hidden md:block min:h-[90vh]">
        {sidebarData.map((section, idx) => (
          <div key={idx} className="mb-6">
            {section.items.map((group, gIdx) => (
              <div key={gIdx} className="mb-4">
                <h5 className="text-sm font-medium text-primary mb-2">{group.title}</h5>
                <ul className="space-y-1">
                  {group.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link
                        replace={true}
                        to={appUrl + link.href}
                        method={link?.method}
                        className="flex items-center gap-3 hover:bg-background px-4 py-2 rounded-md transition cursor-pointer"
                      >
                        {link.icon}
                        {link.name}
                      </Link>
                      {/* Nested children */}
                      {link.children && (
                        <ul className="ml-4 mt-1 space-y-1">
                          {link.children.map((child, cIdx) => (
                            <li key={cIdx}>
                              <Link
                                replace={true}
                                to={appUrl + child.href}
                                method={child?.method}
                                className="flex items-center gap-3 hover:bg-background px-4 py-2 rounded-md transition cursor-pointer"
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </aside>



      {/* Sidebar  */}
      <aside
      className={`${isSidebarOpen ? 'flex' : 'hidden'} w-[260px] bg-accent border-r border-border p-6 fixed z-1000 bottom-0 top-0 left-0`}>
        {sidebarData.map((section, idx) => (
          <div key={idx} className="mb-6">
            {section.items.map((group, gIdx) => (
              <div key={gIdx} className="mb-4">
                <h5 className="text-sm font-medium text-primary mb-2">{group.title}</h5>
                <ul className="space-y-1">
                  {group.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link
                        replace={true}
                        to={appUrl + link.href}
                        method={link?.method}
                        className="flex items-center gap-3 hover:bg-background px-4 py-2 rounded-md transition cursor-pointer"
                      >
                        {link.icon}
                        {link.name}
                      </Link>
                      {/* Nested children */}
                      {link.children && (
                        <ul className="ml-4 mt-1 space-y-1">
                          {link.children.map((child, cIdx) => (
                            <li key={cIdx}>
                              <Link
                                replace={true}
                                to={appUrl + child.href}
                                method={child?.method}
                                className="flex items-center gap-3 hover:bg-background px-4 py-2 rounded-md transition cursor-pointer"
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                  <li
                  className="flex items-center gap-3 hover:bg-background px-4 py-2 rounded-md transition cursor-pointer text-red-500"
                  onClick={() => {Logout()}}
                  >
                    <FaSignOutAlt 
                    className=" cursor-pointer"/>
                    Logout
                  </li>
                </ul>
              </div>
            ))}
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-x-scroll">{children}</main>
      </div>

    </div>
  );
};
