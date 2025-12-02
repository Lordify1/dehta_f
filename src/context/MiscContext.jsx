import { createContext, useContext, useEffect, useState } from "react";
import { apiUrl } from "@/App";
import axios from "axios";



const MiscContext = createContext()

export const MiscProvider = ({children}) => {
    const [selectedTrend, setSelectedTrend] = useState([])
    const [trends, setTrends] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const getTrends = async () => {
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
        getTrends()
    }, [])
    
    return(
        <MiscContext.Provider value={{ trends ,selectedTrend, setSelectedTrend, getTrends, isLoading }}>
            {children}
        </MiscContext.Provider>
    )
}

export const useMisc = () => useContext(MiscContext)