import { createContext, useContext, useState } from "react";

const MiscContext = createContext()

export const MiscProvider = ({children}) => {
    const [selectedTrend, setSelectedTrend] = useState([])

    return(
        <MiscContext.Provider value={{ selectedTrend, setSelectedTrend }}>
            {children}
        </MiscContext.Provider>
    )
}

export const useMisc = () => useContext(MiscContext)