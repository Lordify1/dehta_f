import { createContext, useContext, useState } from "react";
import { apiUrl } from "@/App";
import axios from "axios";

const AdminContext = createContext()

export const AdminProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [glasses, setGlasses] = useState(null);
    const [dbData, setDbData] = useState({});

    const getGlasses = async () => {
        try{
            const res = await axios.post(`${apiUrl}/api/admin/glass/get`);
            setGlasses(res.data)
            setIsLoading(false)
        }catch(err){
            setIsLoading(false)
        }
    }

    const getDBData = async () => {
        try{
            const res = await axios.post(`${apiUrl}/api/admin/db_data`);
            setDbData(res.data);
            setIsLoading(false);
        }catch(err){
            setIsLoading(false);
            console.log(err)
        }
    }
    
    return(
        <AdminContext.Provider value={{ isLoading, setIsLoading, glasses, getGlasses, dbData, getDBData }}>
            {children}
        </AdminContext.Provider>
    )
}

export const useAdmin = () => useContext(AdminContext)