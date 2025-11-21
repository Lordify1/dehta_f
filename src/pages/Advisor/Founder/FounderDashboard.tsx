import React, { useState, useEffect } from "react";
import DashboardLayout from "@/layouts/Advisor/DashboardLayout";
import { founderSidebar } from "@/data/founderSidebarData";
import { LoadingDiv, classMap, buttonClass } from "@/components/Tools/Misc";
import { FaGlasses, FaFire, FaLock, FaShoppingCart, FaCoins, FaTrophy, FaSearch } from "react-icons/fa";
import SendRequest from "@/components/Tools/SendRequest";
import CheckInCalendar from "@/components/Advisor/CheckInCalendar";
import AchievementPanel from "@/components/Advisor/Achievements";
import LensActivity from "@/components/Advisor/LensActivity";
import { Helmet } from "react-helmet-async";
import { appName, appUrl } from "@/app";
import { useUser } from "@/context/UserContext";
import { Link } from "react-router-dom";

const FounderDashboard = () => {
  const {user} = useUser()
  const [isLoading, setIsLoading] = useState(true);
  const [lens, setLens] = useState(user?.total_lens || 0);
  const [glasses, setGlasses] = useState(user?.total_glasses || 0);
  const [streak, setStreak] = useState(6);

  useEffect(() => {
    setIsLoading(false);
  }, [user]);


  return (
    <>
      <Helmet>
        <title>Dashboard - {appName}</title>
      </Helmet>
      {isLoading ? (
        <DashboardLayout
        sidebarDataType="founder" sidebarData={founderSidebar} >
          <LoadingDiv layout={[[1],[1],[1],[3,3,3]]} height="h-40" />
        </DashboardLayout>
      ) : (
        <DashboardLayout sidebarDataType="founder" sidebarData={founderSidebar}>
          {/* Welcome Banner */}
          {(user?.checkins[0]?.streak && user?.checkins[0]?.streak > 1) && (
            <section className="text-sm flex flex-row items-center justify-between bg-[var(--owner)] p-4 mb-4 rounded-2xl text-primary">
              <h4>
                Welcome back, {user?.username} 👋; You’ve checked in for{" "}
                <strong>{user?.checkins[0]?.streak || 0}</strong> days straight — keep your streak alive!
              </h4>
              <span className="text-2xl animate-pulse">🔥</span>
            </section>
          )}
          

          {/* User Info & Lens Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            {/* <section
              className={`${classMap.userCard(3)} flex flex-row items-center justify-between`}
            >
              <div className="flex items-center">
                <img
                  src={user?.avatar || "https://placehold.co/100x100"}
                  alt="User Avatar"
                  className="w-16 h-16 rounded-full border-border"
                />
                <div className="ml-3 flex flex-col">
                  <h2 className="text-lg font-bold">{user?.username}</h2>
                  <div className="flex">
                    <span className={`${classMap.tempBtn}`}>
                    <FaGlasses className="inline mr-1"/> {glasses}
                  </span>
                  <span className={`${classMap.tempBtn}`}><FaSearch className="inline mr-1"/> {lens.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </section> */}

            <section className={`${classMap.userCard(3)} flex flex-col justify-center text-start`}>
              <h3 className="font-semibold text-lg mb-2">Lens Goal Progress</h3>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="bg-[var(--owner)] animate-pulse h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${(lens / 30000) * 100}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                {lens.toLocaleString()} / 30,000 Lens —{" "}
                {lens >= 30000 ? (
                  <span className="text-green-400">✅ Ready to Unlock Project Listing!</span>
                ) : (
                  `${(30000 - lens).toLocaleString()} left to unlock Project Listing`
                )}
              </p>
            </section>

            <section className={`${classMap.userCard(3)} flex flex-col justify-center items-center w-full`}>
              <h3 className="font-semibold text-lg mb-2">Quick Actions</h3>
              <div className="grid grid-cols-3 items-center justify-between gap-2">
                {/* <Link
                to={``}
                title="Unlock Listing"
                className={`${classMap.tempBtn}`}
                >
                  <FaLock className="inline" />
                </Link> */}
                <Link
                to={`${appUrl}/market/#glass`}
                title="Buy Glass"
                className={`${classMap.tempBtn}`}
                >
                  <FaShoppingCart className="inline" />
                </Link>
                <Link
                to={`${appUrl}/market/#lens`}
                title="Buy Lens"
                className={`${classMap.tempBtn}`}
                >
                  <FaCoins className="inline" />
                </Link>
              </div>
            </section>
          </div>

          {/* Check-in Calendar */}
          <section className={`grid grid-cols-1 lg:grid-cols-3 items-center justify-center mb-4 gap-4`}>
          <CheckInCalendar
          lens={() => {}}
          streak={() => {}}
          checkins={user?.checkins[0]}
          transactions={() => {}}
          history={user?.checkinhistory}
          />
          <AchievementPanel
          userAchievements={user?.achievements}
          />
          <LensActivity
          userTransact={user?.lens_transactions}
          />
          </section>
          

          {/* Achievements */}
          
        </DashboardLayout>
      )}
    </>
  );
};

export default FounderDashboard;