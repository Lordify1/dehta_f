import React, { useEffect } from "react"
import { buttonClass, classMap, inputClass, stages } from "./Misc"
import { IoReload, IoReloadCircle } from "react-icons/io5"
import { FaFilter, FaSlidersH } from "react-icons/fa"

type Props = {
    showFilters: boolean,
    data: {},
    filteredData?: CallableFunction
}

const Filters = ({showFilters, data, filteredData}:Props) => {
    const [search, setSearch] = React.useState({
        text_search: '',
        stage: '',
        industry: '',
    })


    const filterData = (search:any) => {
        if (!data || !Array.isArray((data as any))) return;

        const filtered = (data as any).filter((project: any) => {
            const matchesText = search.text_search === '' ||
                (project.name && project.name.toLowerCase().includes(search.text_search.toLowerCase()));
            const matchesStage = search.stage === '' || project.stage.toLowerCase() === search.stage.toLowerCase();
            const matchesIndustry = search.industry === '' || project.industry.toLowerCase() === search.industry.toLowerCase();
            return matchesText && matchesStage && matchesIndustry;
        });

        // You can call a prop function or set a state here to send filtered data to the parent/front end
      filteredData(filtered)
    }
    return(
          <>
            <div className="mb-4 w-full">
              <div className="relative">
                <input
                  type="search"
                  className={`${classMap.dehtaBorder()} rounded-2xl pr-12 p-3 text-lg lg:text-2xl w-full`}
                  value={search.text_search}
                  onChange={e => setSearch({ ...search, text_search: e.target.value })}
                  placeholder="Search..."
                />
                <button
                  type="button"
                  onClick={() => filterData(search)}
                  className={`flex absolute right-1 top-1/2 -translate-y-1/2 text-primary text-lg lg:text-2xl`}
                  aria-label="Apply filters"
                ><FaSlidersH className="mt-1 me-1 text-[var(--owner)]"/>
                  Filters
                </button>
              </div>
            </div>
          </>
    )
}

export default Filters