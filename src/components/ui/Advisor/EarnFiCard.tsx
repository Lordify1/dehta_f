import { useEffect, useState } from "react";
import { classMap } from "../../Tools/Misc";


type JobType = {
  position: string;
  reward_amount: string;
  reward_type: string;
  job_duration: string;
  organization_name: string;
  is_funded: boolean;
  logo?: string;
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
};

type Props = {
  type: 'job' | 'tasks';
  Job?: JobType;
  Task?: TaskType;
};


const EarnFiCard = ({ type, Job, Task }: Props) => {
  return type === "job" ? (
    <div className="w-full rounded-xl border border-green-500/30 bg-black/60 p-4 shadow-[0_0_20px_rgba(0,255,120,0.08)]">
      {/* Top Row */}
      <section className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center text-black font-bold">
            U
          </div>

          <div className="flex flex-col">
            <span className="text-white font-medium">
              {Job.title}
            </span>
            <span className="text-sm text-gray-400">
              ${Job?.reward_amount} · {Job.reward_type} · {Job?.job_duration}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-sm text-green-400">
            {Job.organization_name}
          </span>
          <span className="text-xs text-green-500">
            {Job.is_funded ? "Funds secured" : "Not secured"}
          </span>
        </div>
      </section>

      {/* Divider */}
      <div className="my-4 h-px w-full bg-white/10" />

      {/* CTA */}
      <button
        className="w-full rounded-md bg-white py-2 text-sm font-semibold text-black transition hover:bg-green-400"
      >
        APPLY NOW
      </button>
    </div>
  ) : (
    <div className="w-full rounded-xl border border-green-500/30 bg-black/60 p-4 shadow-[0_0_20px_rgba(0,255,120,0.08)]">
      {/* Top */}
      <section className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-black border border-white/20 flex items-center justify-center text-white">
          ✕
        </div>
        <span className="text-white font-medium">
          {Task.title}
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
            {Task?.max_participants} spots left
          </span>
        </div>

        <button className="rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-green-400">
          Start Task
        </button>
      </section>
    </div>
  );
};



export default EarnFiCard