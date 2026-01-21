import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import DashboardLayout from '../../layouts/Advisor/DashboardLayout';
import { Helmet } from 'react-helmet-async';
import { apiUrl, appName } from '../../App';
import { useUser } from '@/context/UserContext';
import { useMisc } from '@/context/MiscContext';
import Offcanvas from '@/components/ui/Offcanvas';
import { RateForm } from '@/components/Advisor/Forms/RateForm';
import { classMap, Loading, UnderConstruction } from '../../components/Tools/Misc';
import EarnFiCard from '../../components/ui/Advisor/EarnFiCard';
import { IoBriefcase, IoShieldCheckmark } from 'react-icons/io5';
import { FaUsers } from 'react-icons/fa';
import { useOffCanvas } from '../../context/OffCanvasContext';
import EarnFiCreateForm from '../../components/Advisor/Forms/EarnFiCreateForm';
import { Link } from 'react-router-dom';
import clsx from 'clsx'; // for conditional classNames

export default function EarnFi() {
  const { user, role, sidebarData } = useUser();
  const { setShowOffCanvas, OffId, Offtitle, setOffId, SetOfftitle } = useOffCanvas();
  const { getEarnFiOffers, earnfiJobs, earnfiTasks, earnfiStats } = useMisc();

  // Local UI states
  const [activeSection, setActiveSection] = useState<'tasks' | 'jobs'>('tasks');
  const [offerType, setOfferType] = useState('job');
  const [fade, setFade] = useState(true);
  const [hideHIWD, setHideHIWD] = useState(false);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [tasksFilter, setTasksFilter] = useState<string>('all');
  const [jobsFilter, setJobsFilter] = useState<string>('all');
  const [jobSort, setJobSort] = useState<'newest'|'oldest'>('newest');
  const [taskSort, setTaskSort] = useState<'newest'|'oldest'>('newest');
  const [tasksPage, setTasksPage] = useState(1);
  const [jobsPage, setJobsPage] = useState(1);

  // Dummy Data
  const HIWD = [
    { title: "Project Deposits Funds", subtitle: "Funds Secured Upfront", color: 'bg-green-500', textBg: 'bg-white' },
    { title: "Users work", subtitle: "Complete Jobs & Tasks", color: 'bg-white', textBg: 'bg-green-500' },
    { title: "Earn Securely", subtitle: "Instant Payout", color: 'bg-green-500', textBg: 'bg-white' },
  ];

  const JO = [
    { position: "Community Manager", price: "$500", pay_type: "Monthly", duration: "14 days", company: "Spur Protocol", fs: true, logo: "/logos/spur-protocol.png" },
    { position: "UI / UX Designer", price: "$1500", pay_type: "One-time", duration: "Flexible", company: "Red Protocol", fs: true, logo: "/logos/red-protocol.png" },
  ];

  const TASKS = [
    { title: "Tweet Campaign", reward: "$5", reward_type: "Per Tweet", spots_left: 180, platform: "X", fs: true, icon: "/icons/x.png" },
    { title: "App Review", reward: "$5", reward_type: "Per Review", spots_left: 180, platform: "Mobile App", fs: true, icon: "/icons/app-review.png" }
  ];

  // Simulate loading delay
  useEffect(() => {
    getEarnFiOffers();

    const t = setTimeout(() => setLoadingTasks(false), 1000);
    const j = setTimeout(() => setLoadingJobs(false), 1200);
    return () => { clearTimeout(t); clearTimeout(j); };
  }, []);

  // Section toggle with fade animation
  const handleToggle = (section:'tasks'|'jobs') => {
    if(section === activeSection) return;
    setFade(false);
    setTimeout(() => { setActiveSection(section); setFade(true); }, 300);
  };

  // DRY component for Jobs & Tasks sections
  const SectionGrid = ({ type, data, loading, filter, sort, page, setPage, setFilter }) => {
    const filteredData = data.filter(item => filter === 'all' || item.platform === filter || item.pay_type === filter);
    const sortedData = filteredData.sort((a, b) => {
      if(sort === 'newest') return 0; // replace with timestamp if real API
      return 0;
    });

    const pagedData = sortedData.slice(0, page * 10);

    if(loading) {
      return (
        <Loading/>
      );
    }

    if(pagedData.length === 0) {
      return <p className="text-center text-gray-500 py-10">No {type} yet. Be the first to post 👀</p>;
    }

    return (
      <>
        <div className="flex flex-wrap gap-2 mb-4">
          {/* Filter by type / platform */}
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="px-3 py-1 rounded-lg bg-gray-800 text-white"
          >
            <option value="all">All</option>
            {type === 'tasks' && <>
              <option value="X">X</option>
              <option value="Mobile App">Mobile App</option>
            </>}
            {type === 'job' && <>
              <option value="Monthly">Monthly</option>
              <option value="One-time">One-time</option>
            </>}
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={e => type === 'tasks' ? setTaskSort(e.target.value as any) : setJobSort(e.target.value as any)}
            className="px-3 py-1 rounded-lg bg-gray-800 text-white"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 w-full'>
          {pagedData.map((item, idx) => (
            <div key={idx} className="transition-all duration-300 hover:scale-101">
              <EarnFiCard type={type} {...(type === 'job' ? { Job: item } : { Task: item })} />
            </div>
          ))}
        </div>
        {pagedData.length < sortedData.length && (
          <button
            className="mt-4 px-4 py-2 bg-[var(--owner)] text-white rounded-lg"
            onClick={() => setPage(prev => prev + 1)}
          >Load More {type}</button>
        )}
      </>
    );
  };

  // Main content
  const Content = (
    <div className={`min-h-screen flex flex-col items-center text-primary px-4 md:px-10 lg:px-10 md:py-30 lg:py-15 py-25 w-full`}>

      {/* Header */}
      <div className="flex flex-col items-center text-center w-full space-y-4">
        <h1 className={`text-5xl transition-opacity font-semibold text-[var(--owner)] animate-pulse delay-200`}>EARNFI</h1>
        <h3 className='text-lg lg:text-5xl'>Work, Earn and Get Paid Securely</h3>
        <section className="flex flex-col items-center text-center text-md lg:text-lg space-y-1 opacity-70">
          <span>A Transparent Job and Task Marketplace powered by Dehta Labs.</span>
          <span>Funds are secured before work Begins</span>
        </section>

        {/* User buttons / auth badge */}
        <section className="flex flex-row items-center gap-5 justify-center w-full">
          {user ? (
            <>
              <button className={`${classMap.button()}`} onClick={() => { setOffId('create_job_or_task'); SetOfftitle('job'); setShowOffCanvas(true); setOfferType('job')}}>Post a Job</button>
              <button className={`${classMap.button()}`} onClick={() => { setOffId('create_job_or_task'); SetOfftitle('task'); setShowOffCanvas(true); setOfferType('task')}}>Post a Task</button>
            </>
          ) : (
            <Link to={`/login`} className={`${classMap.button()}`} title="Get verified to post jobs or tasks">
              <IoShieldCheckmark className='inline mr-1 text-black'/> Get Verified
            </Link>
          )}
        </section>

        {/* Stats */}
        <section className="flex flex-col md:flex-row justify-around items-center gap-4 p-4 bg-white/10 rounded-lg shadow-md w-full max-w-5xl mx-auto my-4">
          <div className="flex items-center gap-2"><IoBriefcase className='text-[var(--owner)] text-2xl'/><div><span className="font-bold text-lg animate-pulse">{earnfiStats.total_offers_posted || '--'}</span><span className="block text-sm opacity-70">Offers Posted</span></div></div>
          <div className="flex items-center gap-2"><IoShieldCheckmark className='text-[var(--owner)] text-2xl'/><div><span className="font-bold text-lg animate-pulse">${earnfiStats.secured_funds || '--'}</span><span className="block text-sm opacity-70">Funds Secured</span></div></div>
          <div className="flex items-center gap-2"><FaUsers className='text-[var(--owner)] text-2xl'/><div><span className="font-bold text-lg animate-pulse">{earnfiStats.total_contributors || '--'}</span><span className="block text-sm opacity-70">Contributors</span></div></div>
        </section>

        {/* How it Works */}
        {!hideHIWD && (
          <section className={`${classMap.glassEffect()} p-4 rounded-lg my-4 relative w-full max-w-5xl`}>
            <button className="absolute top-2 right-2 text-red-500 font-bold" onClick={() => setHideHIWD(true)}>X</button>
            <div className="flex flex-col items-center justify-center w-full">
              <h3 className='text-2xl lg:text-4xl mb-4 text-[var(--owner)]'>How EarnFi Tasks Works</h3>
              <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-black w-full">
                {HIWD.map((it, ind) => (
                  <div className={`${it.color} relative flex flex-col items-center justify-center h-30 rounded-lg p-4`} key={ind}>
                    <section className={`${it.textBg} p-3 absolute rounded-full -top-3 shadow-2xs`}><small>{ind + 1}</small></section>
                    <span className='text-sm font-bold'>{it.title}</span>
                    <span className='text-sm'>{it.subtitle}</span>
                  </div>
                ))}
              </section>
            </div>
          </section>
        )}

        {/* Section Toggle */}
        <section className="flex justify-center gap-4 my-4">
          <button className={clsx('px-4 py-2 rounded-lg transition-all', activeSection === 'tasks' ? 'bg-[var(--owner)] text-white' : 'bg-gray-200 text-black')} onClick={() => handleToggle('tasks')}>Tasks & Campaigns</button>
          <button className={clsx('px-4 py-2 rounded-lg transition-all', activeSection === 'jobs' ? 'bg-[var(--owner)] text-white' : 'bg-gray-200 text-black')} onClick={() => handleToggle('jobs')}>Job Opportunities</button>
        </section>
      </div>

      {/* Content Sections */}
      <div className={`transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'} w-full max-w-5xl`}>
        {activeSection === 'tasks' && (
          <SectionGrid
            type="tasks"
            data={earnfiTasks}
            loading={loadingTasks}
            filter={tasksFilter}
            sort={taskSort}
            page={tasksPage}
            setPage={setTasksPage}
            setFilter={setTasksFilter}
          />
        )}
        {activeSection === 'jobs' && (
          <SectionGrid
            type="job"
            data={earnfiJobs}
            loading={loadingJobs}
            filter={jobsFilter}
            sort={jobSort}
            page={jobsPage}
            setPage={setJobsPage}
            setFilter={setJobsFilter}
          />
        )}
      </div>
    </div>
  );

  return (
    <>
      <Helmet><title>EarnFi - {appName}</title></Helmet>
      {user ? <DashboardLayout user={user} sidebarData={sidebarData} sidebarDataType={`${role}`} classy="projectsBg">{Content}</DashboardLayout>
           : <Layout push={true}>{Content}</Layout>}

      <Offcanvas title={`Create ${Offtitle}`}>{OffId === 'create_job_or_task' && <EarnFiCreateForm type={`${offerType}`}/>}</Offcanvas>
    </>
  );
}