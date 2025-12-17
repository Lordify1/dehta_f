import React, { useEffect, useState } from 'react';
import {
  emptyResult,
  Loading,
} from '@/components/Tools/Misc';
import Filters from '@/components/Tools/ProjectsFilter';
import Layout from '../components/Layout';
import ProjectCard from '../../components/ui/Advisor/ProjectCard';
import axios from 'axios';
import DashboardLayout from '../../layouts/Advisor/DashboardLayout';
import { Helmet } from 'react-helmet-async';
import { apiUrl, appName } from '../../App';
import { useUser } from '@/context/UserContext';
import { useMisc } from '@/context/MiscContext';
import Offcanvas from '@/components/ui/Offcanvas';
import { RateForm } from '@/components/Advisor/Forms/RateForm';

export default function Projects() {
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [showRateForm, setShowRateForm] = useState(false);
  const { user, role, sidebarData } = useUser();
  const {getProjects, isLoading, projects} = useMisc();

  useEffect(() => {
    getProjects();
  },[])

  const Content = (
    <div className={`min-h-screen flex flex-col items-center text-primary px-6 md:px-10 lg:px-16 py-14 ${user ? '' : 'projectsbg py-20'} w-full`}>

      {/* Header */}
      <div className="w-full max-w-7xl flex flex-col items-center mb-10 text-center">
        <h1 className="text-5xl lg:text-7xl font-semibold">Projects</h1>
        <p className="lg:text-2xl text-lg mt-3">
          Explore Verified and AI-Analyzed Projects across the crypto ecosystem
        </p>

        <Filters
          showFilters={showFilters}
          data={projects}
          filteredData={(e: any) => setFilteredProjects(e)}
        />
      </div>

      {/* Content Grid */}
      {isLoading ? (
        <div className="flex flex-col justify-center items-center min-h-[50vh]">
          <Loading />
        </div>
      ) : (filteredProjects.length > 0 || projects.length > 0) ? (
        <div className={`w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6`}>
          {(filteredProjects.length > 0 ? filteredProjects : projects).map((project: any) => (
            <ProjectCard
              key={project.id}
              {...project}
              authUserId={user?.id}
              userId={project?.user_id}
              more={project.id}
            />
          ))}
        </div>
      ) : (
        emptyResult('No Project Found')
      )}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Listed Projects - {appName}</title>
      </Helmet>

      {/* If logged in, show Dashboard layout; otherwise the public layout */}
      {user ? (
        <DashboardLayout
          user={user}
          sidebarData={sidebarData}
          sidebarDataType={`${role}`}
          classy="projectsbg"
        >
          {Content}
        </DashboardLayout>
      ) : (
        <Layout>
          {Content}
        </Layout>
      )}

      <Offcanvas
        isOpen={showRateForm}
        onClose={() => setShowRateForm(false)}
        title="Rate Project"
      >
        <RateForm auth={user} />
      </Offcanvas>
    </>
  );
}
