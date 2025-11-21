import { appName, appUrl } from "@/app"
import TrendBetCreatorForm from "@/components/Advisor/Forms/TrendBetCreatorForm";
import { classMap, emptyData, LoadingDiv, TrendCreateBtn } from "@/components/Tools/Misc";
import TrendCard from "@/components/ui/Advisor/TrendCard";
import TrendDetail from "@/components/ui/Advisor/TrendDetail";
import Offcanvas from "@/components/ui/Offcanvas";
import { useMisc } from "@/context/MiscContext";
import { useOffCanvas } from "@/context/OffCanvasContext";
import { useUser } from "@/context/UserContext";
import DashboardLayout from "@/layouts/Advisor/DashboardLayout";
import axios from "axios";
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { FaChartLine, FaPen, FaSearch } from "react-icons/fa";


const TrendBet = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {user, role, sidebarData} = useUser();
    const {selectedTrend} = useMisc();
    const [trends, setTrends] = useState([]);
    const {setShowOffCanvas, OffId, Offtitle} = useOffCanvas();

    const getTrendBets = async () => {
        try{
            const res = await axios.post(`${appUrl}/trendbet/get`);
            setTrends(res.data)
            setIsLoading(false)
        }catch(err){
            setIsLoading(false)
            console.log(err)
        }
    }

    useEffect(() => {
        getTrendBets();
    },[selectedTrend])

    return(
        <>
            <Helmet>
                <title>TrendBet - {appName}</title>
            </Helmet>
            {isLoading ? (
                <DashboardLayout
                user={user}
                sidebarData={sidebarData}
                sidebarDataType={`${role}`}
                >
                    <LoadingDiv layout={[[3], [1,1,1,1], [1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1]]} height="h-30"/>
                </DashboardLayout>
            ) : (
                <>
                <DashboardLayout
                user={user}
                sidebarData={sidebarData}
                sidebarDataType={`${role}`}
                >
                    <section className={`${classMap.section} flex flex-col md:flex-col lg:flex-row mb-6`}>
                      <h2 className="text-2xl font-bold flex items-center gap-2">
                        <FaChartLine className="text-[var(--owner)]" /> TrendBet
                      </h2>
                      <small className="text-[var(--muted-foreground)] text-center">
                        Create <FaPen className="inline underline text-[var(--owner)]"/> or Vote the Trend
                      </small>
                    </section>

                
                    {/* Trendbets  */}

                    <section className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 w-full'}>
                        {trends && trends.length > 0 ? ( trends.map((trend, key) => {
                            return(
                                <TrendCard
                                {...trend}
                                data={trend}
                                />
                            )
                        }) ) : (
                            emptyData('No Trend to Bet On Yet')
                        )}
                    </section>

                    
                </DashboardLayout>
                {<TrendCreateBtn/>}

                {/* Create Trend  */}
                <Offcanvas title={Offtitle}>
                    {OffId === 'CreateTrend' && <TrendBetCreatorForm/>}
                    {OffId === 'viewTrend' && (
                        selectedTrend && selectedTrend.length > 0 && (
                            <TrendDetail
                                data={selectedTrend}
                            />
                        )
                    )}
                </Offcanvas>
                {/* View Trend  */}
                </>
            )}
        </>
    )
}


export default TrendBet