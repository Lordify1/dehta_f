import { Helmet } from "react-helmet-async";
import { advisorUrl, appName, appUrl } from "@/app";
import { classMap, ComingSoon, DehtaConstruct, emptyData, Loading } from "../../components/Tools/Misc";
import DashboardLayout from "../../layouts/Advisor/DashboardLayout";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import { apiUrl } from "../../App";
import { useEffect, useState } from "react";
import { FaDollarSign, FaSearchDollar } from "react-icons/fa";
import { useOffCanvas } from "@/context/OffCanvasContext";
import Offcanvas from "../../components/ui/Offcanvas";
import GlassPurchase from "../../components/Advisor/Forms/GlassPurchase";


const Market = () => {
  const { user, role, sidebarData } = useUser();
  const {setShowOffCanvas, OffId, Offtitle, setOffId, SetOfftitle} = useOffCanvas();

  const [glasses, setGlasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userGlasses, setUserGlasses] = useState([]); // Assuming you want to track user's glasses
  const [showModal, setShowModal] = useState(false);
  const [selectedGlass, setSelectedGlass] = useState(null);

  const getMarketInfo = async () => {
    try {
      const res = await axios.post(`${apiUrl}/api/market/all`);
      if (res.data) {
        setGlasses(res?.data?.glasses || []);
        setUserGlasses(res?.data?.userGlasses || []); // If API returns user's glasses
      }
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMarketInfo();
  }, []);

  return (
    <>
      <Helmet>
        <title>Market Place - Buy Lens, Glasses and More - {appName}</title>
      </Helmet>
      <DashboardLayout
        user={user}
        sidebarData={sidebarData}
        sidebarDataType={`${role}`}
        classy={'bg-background'}
      >
        <section className="flex flex-col space-y-6">
          {/* Hero Section */}
          <div className="flex flex-col items-center justify-center min-h-40 text-black w-full bg-(--owner) p-6 rounded-lg">
            <h1 className="text-3xl lg:text-5xl font-bold">Discover and</h1>
            <h1 className="text-3xl lg:text-5xl font-bold">Collect Dehta NFTs</h1>
          </div>

          <div className="h-10 w-full"></div>

          {/* Glass Picks */}
          <div className="flex flex-col items-center justify-center text-black w-full bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl lg:text-3xl font-semibold mb-4">Glass Picks</h1>

             {isLoading ? (
            <Loading/>
          ) : glasses.length > 0 ? (
            <div
              id="glass"
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 items-center justify-between"
            >
              {glasses.map((glass) => {
                return (
                  <div
                    key={glass.id}
                    className="shadow-2xl flex flex-col items-center justify-center w-full max-w-6xl mx-auto rounded-2xl bg-white p-2"
                  >
                    <div className="flex flex-col items-center text-center w-full">
                      <div className={`${glass?.color ? `bg-${glass?.color}` : 'bg-(--owner)'} rounded-lg p-3 mb-3 flex items-center justify-center`}>
                        <img
                          src={glass.icon}
                          alt={glass.name}
                          className="w-50 h-50 object-contain mx-auto"
                        />
                      </div>

                      <h4 className="font-semibold text-lg truncate w-full">{glass.name}</h4>

                      <div className="flex items-center gap-2 mb-3 text-sm text-gray-700">
                        <span>$ {Number(glass.cost).toLocaleString()}</span>
                      </div>

                      <button
                        className={`${classMap.button()}`}
                        onClick={() => {
                          setOffId("buyGlass");
                          SetOfftitle("Glass Purchase");
                          setShowOffCanvas(true);
                          setSelectedGlass({ ...glass });
                        }}
                      >
                        Buy Glass
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col w-full col-span-3">
              {emptyData('Glasses Coming in Hot! Hold on!!!')}
            </div>
          )}
          </div>

          {/* Top Seller */}
          <div className="flex flex-col items-center justify-center min-h-40 text-white w-full bg-black p-6 rounded-lg shadow-md">
            <h1 className="text-2xl lg:text-3xl font-semibold mb-4">Top Seller</h1>
            <ComingSoon />
          </div>

          {/* NFT Collection */}
          <div className="flex flex-col items-center justify-center min-h-40 text-black w-full bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl lg:text-3xl font-semibold mb-4">NFT Collection</h1>
            <ComingSoon />
          </div>
        </section>


        <Offcanvas
        title={Offtitle}
        >
          {OffId === 'buyGlass' && (
            <GlassPurchase
            key={selectedGlass?.id}
            price={selectedGlass?.cost}
            glass_id={selectedGlass?.id}
            data={selectedGlass}
            />
          )}
        </Offcanvas>

      </DashboardLayout>
    </>
  );
};

export default Market;
