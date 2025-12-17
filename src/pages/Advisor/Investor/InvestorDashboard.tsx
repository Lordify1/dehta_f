import React, { useState, useEffect } from "react";
import DashboardLayout from "@/layouts/Advisor/DashboardLayout";
import { LoadingDiv, classMap } from "@/components/Tools/Misc";
import CheckInCalendar from "@/components/Advisor/CheckInCalendar";
import { Helmet } from "react-helmet-async";
import { appName, appUrl } from "@/app";
import { useUser } from "@/context/UserContext";
import TrendingTokens from "../../../components/Advisor/TrendingTokens";
import TrendBetDB from "../../../components/Advisor/TrendBetDB";
import { investorSidebar } from "@/data/investorSidebarData";
import QuestDB from "../../../components/Advisor/QuestDB";

const InvestorDashboard = () => {
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
        sidebarDataType="investor" sidebarData={investorSidebar} >
          <LoadingDiv layout={[[1],[1],[1],[3,3,3]]} height="h-40" />
        </DashboardLayout>
      ) : (
        <DashboardLayout sidebarDataType="investor" sidebarData={investorSidebar}>
          <div className="">
            {/* Welcome Banner */}
              <h1 className="text-2xl lg:text-4xl mb-3">GM, {user?.username} 👋</h1>
            
        
            {/* DB Quests  */}
            <QuestDB/>
        
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
        </DashboardLayout>
      )}
    </>
  );
};

export default InvestorDashboard;