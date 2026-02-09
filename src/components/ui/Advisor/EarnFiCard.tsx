import { useEffect, useState } from "react";
import { classMap } from "../../Tools/Misc";
import { useMisc } from '@/context/MiscContext';
import { useOffCanvas } from '@/context/OffCanvasContext';
import { IoShield, IoShieldCheckmark, IoShieldHalf } from "react-icons/io5";


type JobType = {
  position: string;
  reward_amount: string;
  reward_type: string;
  job_duration: string;
  organization_name: string;
  is_funded: boolean;
  logo?: string;
  slug?: any;
};

type TaskType = {
  title: string;
  reward_amount: string;
  reward_type: string;
  max_participants: number;
  current_participants: number;
  platform?: string;
  is_funded: boolean;
  icon?: string;
  slug?: any;
};

type Props = {
  type: 'job' | 'tasks';
  Job?: JobType;
  Task?: TaskType;
};


const EarnFiCard = ({ type, Job, Task }: Props) => {
  const {setEarnFiOffer} = useMisc();
  const { setShowOffCanvas, OffId, Offtitle, setOffId, SetOfftitle } = useOffCanvas();

  return type === "job" ? (
    <div className="w-full rounded-xl border border-green-500/30 bg-black/60 p-4 shadow-[0_0_20px_rgba(0,255,120,0.08)]">
      {/* Top Row */}
      <section className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center text-black font-bold">
            J
          </div>

          <div className="flex flex-col">
            <span className="text-white font-medium">
              {Job.title}
            </span>
            <span className="text-sm text-gray-400">
              ${Job?.reward_amount} · {Job.reward_type.toUpperCase()} · {Job?.job_duration + ' Days'}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-sm text-green-400 truncate w-30 text-end">
            {Job.organization_name}
          </span>
          <span className="text-xs text-green-500">
            {Job.is_funded ? <IoShieldCheckmark title="Funded" className="text-sm text-green-400"/> : <IoShield title="Not Funded" className="text-sm text-red-500"/>}
          </span>
        </div>
      </section>

      {/* Divider */}
      <div className="my-4 h-px w-full bg-white/10" />

      {/* CTA */}
      <button
        className={`${classMap.button()} w-full`}
        onClick={() => {
          setEarnFiOffer(Job);
          setOffId('submit_job_or_task');
          setShowOffCanvas(true);
          SetOfftitle(`Job ${Job?.slug.toUpperCase()} Detail`)
        }}
      >
        APPLY NOW
      </button>
    </div>
  ) : (
    <div className="w-full rounded-xl border border-green-500/30 bg-black/60 p-4 shadow-[0_0_20px_rgba(0,255,120,0.08)]">
      {/* Top */}
      <section className="flex items-center justify-between gap-3">
        <section className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-black border border-white/20 flex items-center justify-center text-white">
          T
          </div>
          <span className="ms-2 text-white font-medium">
            {Task?.title}
          </span>
        </section>
        <span className="text-xs text-green-500">
            {Task?.is_funded ? <IoShieldCheckmark title="Funded" className="text-sm text-green-400"/> : <IoShield title="Not Funded" className="text-sm text-red-500"/>}
        </span>
      </section>

      {/* Divider */}
      <div className="my-4 h-px w-full bg-white/10" />

      {/* Bottom */}
      <section className="flex items-center justify-between">
        <div className="flex flex-col text-sm">
          <span className="text-gray-300">
            Earn ${Task?.reward_amount} {Task.reward_type}
          </span>
          <span className="text-gray-500">
            {Number(Task?.max_participants) - Number(Task?.current_participants)} spots left
          </span>
        </div>

        <button 
        className={`${classMap.button()}`}
        onClick={() => {
          setEarnFiOffer(Task);
          setOffId('submit_job_or_task');
          setShowOffCanvas(true);
          SetOfftitle(`Task ${Task?.slug.toUpperCase()} Detail`)
        }}
        >
          Start Task
        </button>
      </section>
    </div>
  );
};



export default EarnFiCard