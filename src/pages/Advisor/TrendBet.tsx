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
import { apiUrl } from "../../App";
import TrendCarousel, { DehtaConstruct, emptyResult } from "../../components/Tools/Misc";
import Carousel from "../../components/ui/Carousel";
import useEmblaCarousel from "embla-carousel-react";


const TrendBet = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {user, role, sidebarData} = useUser();
    const {selectedTrend} = useMisc();
    const [trends, setTrends] = useState([]);
    const [userTrends, setUserTrends] = useState([]);
    const {setShowOffCanvas, OffId, Offtitle, setOffId, SetOfftitle} = useOffCanvas();

    const getTrendBets = async () => {
        try{
            const res = await axios.post(`${apiUrl}/api/trendbet/get`);
            setTrends(res.data)
            setIsLoading(false)
        }catch(err){
            setIsLoading(false)
            console.log(err)
        }
    }

    useEffect(() => {
        getTrendBets();
        setUserTrends(user?.trends)
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
                    <LoadingDiv layout={[[3], [2], [1]]} height="h-20"/>
                </DashboardLayout>
            ) : (
                <>
                <DashboardLayout
                user={user}
                sidebarData={sidebarData}
                sidebarDataType={`${role}`}
                >
                    
                    
                <div className="flex flex-col">
                    {user?.trendbet_role === 'creator' && (
                    <section className={`flex flex-col p-3 rounded-2xl ${classMap.dehtaCard()}`}>
                        <div className="mb-3">
                            <div className="flex flex-row">
                                <h1 className="text-3xl lg:text-5xl">Your Trends</h1>
                                <button
                                      onClick={() => {setOffId('CreateTrend'); setShowOffCanvas(true); SetOfftitle('Create Trend')}}
                                      className={`flex ms-2 ${classMap.button()}`}
                                    >
                                    <FaPen className="m-0 p-0"/>
                                </button>
                            </div>
                            <small>View the Progress of Trends you Created</small>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 w-full p-3">
                        {userTrends && userTrends.length > 0 ? (
                        userTrends.length === 1 ? (
                            <TrendCard {...userTrends[0]} data={userTrends[0]} />
                        ) : (
                            <div className="col-span-4 w-full">
                            <TrendCarousel trends={userTrends} />
                            </div>
                        )
                        ) : (
                        <div className="flex flex-col col-span-4 w-full opacity-50">
                            {emptyResult('Your Trends will Show Here')}
                        </div>
                        )}
                        </div>
                    </section>
                    )}
                
                    {/* Trendbets  */}
                    <section className={'flex flex-col mt-2'}>
                        <div className="flex flex-col mb-3 bg-(--owner) p-4 text-black rounded-2xl h-40 items-center justify-center">
                            <h1 className="text-4xl lg:text-5xl">Vote Trend</h1>
                            <small>Participate in active Trends created by Others</small>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full p-3">
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
                        </div>
                    </section>
                </div>
                    
                </DashboardLayout>
                {/* {<TrendCreateBtn/>} */}

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