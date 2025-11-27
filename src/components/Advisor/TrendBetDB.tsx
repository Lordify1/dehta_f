import React, { useEffect, useState } from "react";
import { FaLock, FaCheckCircle, FaStar, FaFire, FaRocket, FaAward, FaChartLine, FaVoteYea } from "react-icons/fa";
import { classMap, emptyData, Loading, postData } from "../Tools/Misc";
import { appUrl } from "@/app";
import { Col } from "antd";

const TrendBetDB = () => {
  
  const [trendPredictions, setTrendPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return(
        <section className={`${classMap.dehtaCard()} border-(--owner) min-h-[60vh]`}>
            <div className="overflow-y-scroll">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <FaVoteYea/> Trend Predictions
              </h3>
              <div className="space-y-3 w-full overflow-y-auto min-h-60">
                {isLoading ? (<Loading/>) : (trendPredictions && trendPredictions.length > 0 ? (trendPredictions.map((tx, index) => (
                  <div
                    key={index}
                    className={`${classMap.section} text-start`}
                  >
                    <span>{tx.description}</span>
                    <span className={tx.method === 'minus' ? "text-red-400" : "text-[var(--owner)]"}>
                     {tx.method === 'plus' ? '+' : '-'}{tx.amount}
                    </span>
                  </div>
                ))) : (
                    <div className="flex flex-col items-center justify-center">
                        {emptyData('Your Trend Predictions will appear here')}
                    </div>
                ))}
              </div>
            </div>
        </section>
    )
};

export default TrendBetDB;