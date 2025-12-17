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
import { FaChartLine, FaPen, FaPlusCircle, FaRegCalendarPlus, FaSearch } from "react-icons/fa";
import { DehtaConstruct, emptyResult, TrendCarousel } from "../../components/Tools/Misc";
import { Link } from "react-router-dom";


const TrendBet = () => {
    const {user, role, sidebarData} = useUser();
    const {selectedTrend, setSelectedTrend, trends, isLoading, setIsLoading, getTrends} = useMisc();
    const [userTrends, setUserTrends] = useState([]);
    const {setShowOffCanvas, OffId, Offtitle, setOffId, SetOfftitle} = useOffCanvas();
    const [search, setSearch] = useState("");
    const [displayedTrends, setDisplayedTrends] = useState([]);
    const [limit, setLimit] = useState(20); // how many items to show initially


    useEffect(() => {
        setUserTrends(user?.trends)

        getTrends();

        if (!trends) return;
        setIsLoading(false)

        const filtered = trends.filter(item =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.body.toLowerCase().includes(search.toLowerCase())
        );

        setDisplayedTrends(filtered.slice(0, limit));
    
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
                setLimit(prev => prev + 10);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [search, limit, trends, selectedTrend]);

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
                classy="trendBg"
                >
                    <LoadingDiv layout={[[3], [2], [1]]} height="h-20"/>
                </DashboardLayout>
            ) : (
                <>
                <DashboardLayout
                user={user}
                sidebarData={sidebarData}
                sidebarDataType={`${role}`}
                classy="trendBg"
                >
                    
                <div className="flex flex-col">
                    {user?.trendbet_role === 'creator' ? (
                    <>
                    <section className="flex flex-col mt-4">
                    <h1 className="text-4xl lg:text-5xl mb-2">Create Trend</h1>
                    <button
                    className={`${classMap.dehtaCard()} rounded-lg p-3 text-sm lg:text-lg mt-2 mb-2 w-full flex flex-row items-center justify-between bg-linear-to-b from-(--ceo) via-(--tbg) to-(--transparent)`}
                    onClick={() => {setOffId('CreateTrend'); setShowOffCanvas(true); SetOfftitle('Create Trend')}}
                    >
                        <span className="opacity-50">Create your Trend for others to vibe</span>
                        <FaPlusCircle className="text-2xl"/>
                    </button>
                    </section>
                    <section className={`flex flex-col p-3 rounded-2xl`}>
                        <div className="mb-3">
                            <div className="flex flex-row">
                                <h1 className="text-3xl lg:text-5xl">Your Trends</h1>
                            </div>
                            <small>View the Progress of Trends you Created</small>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 w-full p-3">
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
                    </>
                    ) : (
                        <section className={`${classMap.indexCard(10, 20)} w-full flex flex-col lg:flex-row items-center lg:justify-between`}>
                            <p className="lg:text-2xl">Purchase NFT to Create Trend</p>
                            <Link
                            to={'/market'}
                            className="underline text-(--owner) hover:text-white"
                            >
                                Buy NFT
                            </Link>
                        </section>
                    )}
                
                    {/* Trendbets  */}
                    <section className={'flex flex-col mt-2'}>
                        <div className="flex flex-col mb-3 bg-(--owner) p-4 text-black rounded-2xl h-40 items-center justify-center">
                            <h1 className="text-4xl lg:text-5xl">Vote Trend</h1>
                            <small>Participate in active Trends created by Others</small>
                        </div>
                        <div className="w-full flex items-center gap-2 bg-white/10 p-3 rounded-xl mb-4">
                            <FaSearch className="text-xl opacity-50" />
                            <input 
                                type="text"
                                placeholder="Search Trends..."
                                className="bg-transparent outline-none flex-1"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full p-3">
                        {displayedTrends && displayedTrends.length > 0 ? (displayedTrends.map((trend, key) => {
                            return(
                                <TrendCard
                                {...trend}
                                data={trend}
                                clickFunction={() => {
                                    setSelectedTrend([])    
                                }}
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
                <Offcanvas
                title={Offtitle}
                width={`${OffId === 'viewTrend' && 'lg:w-[500px] w-full'}`}
                >
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