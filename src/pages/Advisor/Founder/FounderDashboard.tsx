import React, { useState, useEffect } from "react";
import DashboardLayout from "@/layouts/Advisor/DashboardLayout";
import { founderSidebar } from "@/data/founderSidebarData";
import { LoadingDiv, classMap } from "@/components/Tools/Misc";
import { FaShoppingCart, FaCoins } from "react-icons/fa";
import CheckInCalendar from "@/components/Advisor/CheckInCalendar";
import AchievementPanel from "@/components/Advisor/Achievements";
import LensActivity from "@/components/Advisor/LensActivity";
import { Helmet } from "react-helmet-async";
import { appName, appUrl } from "@/app";
import { useUser } from "@/context/UserContext";
import { Link } from "react-router-dom";
import PayButton from "../../../components/ui/PayButton";
import { bgClass } from "../../../components/Tools/Misc";
import TrendingTokens from "../../../components/Advisor/TrendingTokens";
import TrendBet from "../TrendBet";
import TrendBetDB from "../../../components/Advisor/TrendBetDB";

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
          <div className="">
          {/* Welcome Banner */}
          <h1 className="text-2xl lg:text-4xl mb-3">GM, {user?.username} 👋</h1>
          

          {/* User Info & Lens Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

            <section className={`${classMap.dehtaCard()} flex flex-col justify-center text-start col-span-3`}>
              <h3 className="font-semibold text-lg mb-2">Lens Goal Progress</h3>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="bg-[var(--owner)] animate-pulse h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${(lens / 30000) * 100}%` }}
                ></div>
              </div>
              <div className="flex flex-col lg:flex-row justify-between w-full mt-2 text-sm text-gray-400">
                <span>{lens.toLocaleString()} / 30,000 Lens {" "}</span>
                {lens >= 30000 ? (
                  <span className="text-green-400">✅ Ready to Unlock Project Listing!</span>
                ) : (
                  <span>{(30000 - lens).toLocaleString()} left to unlock Project Listing</span>
                )}
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
          <TrendingTokens/>
          <TrendBetDB/>
          </section>
        </div>
          {/* Achievements */}
        </DashboardLayout>
      )}
    </>
  );
};

export default FounderDashboard;