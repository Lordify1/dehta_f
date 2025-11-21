import React, { useContext, useEffect, useState } from 'react';
import ProjectCard from '@/components/ui/Advisor/ProjectCard';
import {
  headingClass,
  emptyResult,
  Loading,
  classMap,
  advisorPostData,
} from '@/components/Tools/Misc';
import { FaFilter, FaTimes } from 'react-icons/fa';

import { Header } from '@/components/Main/Header';
import Filters from '@/components/Tools/ProjectsFilter';
import LandingLayout from '@/layouts/Advisor/LandingLayout';
import { Empty } from 'antd';
import Offcanvas from '@/components/ui/Offcanvas';
import {RateForm} from '@/components/Advisor/Forms/RateForm';
import { OffCanvasContext, OffCanvasProvider } from '@/context/OffCanvasContext';
import { useAuth } from '@/context/AuthContext';
import { advisorUrl, appName, appUrl } from '@/app';
import { useUser } from '@/context/UserContext';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';


export default function Projects() {
  const [showFilters, setShowFilters] = useState(false);
  const [projects, setProjects] = useState();
  const authUserId = 1; // Replace with actual auth user ID when available
  const [filteredProjects, setFilteredProjects] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showRateForm, setShowRateForm] = useState(false);
  const {offData} = useContext(OffCanvasContext)
  const {user} =  useUser();

  // useEffect(() => {
  //   axios.post(`${appUrl}/project/all`)
  //     .then((data:any) => {
  //       setProjects(data.data.projects);
  //       console.log(data)
  //       setIsLoading(false);
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  return (
    <>
    {/* <OffCanvasProvider> */}
    <Helmet>
      <title>Listed Projects - {appName}</title>
    </Helmet>
    <LandingLayout>
    <div className="min-h-screen flex flex-col items-center bg-background text-primary px-4 py-6 text-[0.7rem]">
  {/* Header Section */}
  <div className="flex justify-between items-center mb-6 w-full max-w-7xl">
    <h1 className="">Explore Projects</h1>
    <button
      onClick={() => setShowFilters(!showFilters)}
      className={`${classMap.button('bg-transparent', '', 'text-primary', '', '')} lg:hidden flex items-center gap-2 px-3 py-2 rounded-md`}
    >
      {showFilters ? <FaTimes className='text-red-500'/> : <FaFilter />}
    </button>
  </div>

  {/* Main Content Grid */}
  <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6">
    {/* Filter Sidebar */}
    <div className={`lg:col-span-3 ${showFilters ? 'block' : 'hidden'} lg:block`}>
      <Filters
        showFilters={showFilters}
        data={projects}
        filteredData={(e: any) => setFilteredProjects(e)}
      />
    </div>

    {/* Project Cards */}
    <div className="lg:col-span-9 flex flex-col">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loading />
        </div>
      ) : (filteredProjects || projects)?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {(filteredProjects || projects)?.map((project) => (
            // <ProjectCard
            //   key={project.id}
            //   {...project}
            //   authUserId={user?.id}
            //   userId={project?.user_id}
            //   more={project.id}
            // />
            <></>
          ))}
        </div>
      ) : (
        emptyResult('No Project Found')
      )}
    </div>
  </div>
</div>

    </LandingLayout>
    <Offcanvas
      isOpen={showRateForm}
      onClose={() => setShowRateForm(false)}
      title={`Rate Project`}
    >
      <RateForm
      auth={user}
      />
    </Offcanvas>
    {/* </OffCanvasProvider> */}
    </>
  );
}