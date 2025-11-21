import React, { useEffect } from "react"
import { buttonClass, classMap, inputClass, stages } from "./Misc"
import { IoReload, IoReloadCircle } from "react-icons/io5"

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
        <div
          className={`${
            showFilters ? 'block' : 'hidden'
          } lg:block col-span-3 bg-accent border border-primary p-4 rounded-md`}
        >
          <div className="flex flex-row items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Filter Projects</h2>
            <button onClick={() => {
                setSearch({text_search: '', stage: '', industry: ''}),
                filterData(search)
            }}>
                <IoReload className="text-accent-foreground text-lg hover:text-red-500"/>
            </button>
          </div>
          <div className="mb-4">
            <label
            className={`${classMap.label}`}
            >Search</label>
            <input type="search" className={inputClass()} name="" id="" 
            value={search.text_search}
            onChange={e => {
                setSearch({ ...search, text_search: e.target.value })
            }}
            />
          </div>
          <div className="mb-4">
            <label
            className={`${classMap.label}`}
            >Stage</label>
            <select 
            className={inputClass()}
            value={search.stage}
            onChange={e => setSearch({...search, stage: e.target.value})}
            >
              <option value="">Any</option>
              {stages.map((item, index) => {
                return(
                  <option value={item.key}>{item.label}</option>
                )
              })}
            </select>
          </div>

          <div className="mb-4">
            <label
            className={`${classMap.label}`}
            >Industry</label>
            <input 
            className={inputClass()}
            value={search.industry}
            onChange={e => setSearch({...search, industry: e.target.value})}
            type="text"
            />
          </div>

          <div className="me-2">
            <button 
          onClick={(e:any) => filterData(search)}
          className={`${classMap.button('','','','','down')} w-full`}>Apply Filters</button>
          </div>
        </div>
    )
}

export default Filters