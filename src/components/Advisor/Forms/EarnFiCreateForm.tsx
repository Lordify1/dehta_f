import { useEffect, useState } from "react";
import { classMap } from "@/components/Tools/Misc";
import SendRequest from "@/components/Tools/SendRequest";
import {
  FaBriefcase,
  FaTasks,
  FaMoneyBillWave,
  FaBuilding,
  FaCalendarAlt,
  FaUsers,
  FaClipboardList,
  FaDollarSign,
  FaClock
} from "react-icons/fa";

type EarnFiCreateFormProps = {
  type: "job" | "task";
};

type EarnFiOfferFormData = {
  type: "job" | "task";
  title: string;
  description: string;
  organization_name: string;
  reward_type: "fixed" | "monthly" | "per_task";
  reward_amount: string;
  currency: string;
  expires_at?: string;

  // Job only
  employment_type?: "one_time" | "contract" | "monthly";
  job_duration?: string;

  // Task only
  max_participants?: string;
  proof_requirements?: string;
};

const EarnFiCreateForm = ({ type }: EarnFiCreateFormProps) => {

  const [data, setData] = useState<EarnFiOfferFormData>({
    type: "",
    title: "",
    description: "",
    organization_name: "",
    reward_type: type === "job" ? "monthly" : "per_task",
    reward_amount: "",
    currency: "USD",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setData(prev => ({...prev, type: type}))
  }, [type])

  return (
    <section className="flex flex-col gap-4">

      {/* Title */}
      <div>
        <label className={classMap.label()}>
          <FaBriefcase className="inline mr-2 opacity-70 text-[var(--owner)]" />
          Offer Title
        </label>
        <input
          className={classMap.input()}
          name="title"
          value={data.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className={classMap.label()}>
          <FaClipboardList className="inline mr-2 opacity-70 text-[var(--owner)]" />
          Description
        </label>
        <textarea
          className={classMap.input()}
          name="description"
          value={data.description}
          onChange={handleChange}
          rows={4}
          required
        />
      </div>

      {/* Organization */}
      <div>
        <label className={classMap.label()}>
          <FaBuilding className="inline mr-2 opacity-70 text-[var(--owner)]" />
          Organization / Project Name
        </label>
        <input
          className={classMap.input()}
          name="organization_name"
          value={data.organization_name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Reward */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={classMap.label()}>
            <FaMoneyBillWave className="inline mr-2 opacity-70 text-[var(--owner)]" />
            Reward Type
          </label>
          <select 
            className={`${classMap.select()} [&>option]:bg-slate-900 [&>option]:text-white`}
            name="reward_type"
            value={data.reward_type}
            onChange={handleChange}
          >
            {type === "job" && <option value="monthly">Monthly</option>}
            <option value="fixed">Fixed</option>
            {type === "task" && <option value="per_task">Per Task</option>}
          </select>
        </div>

        <div>
          <label className={classMap.label()}>
            <FaDollarSign className="inline mr-2 opacity-70 text-[var(--owner)]"/>
            Amount
            </label>
          <input
            className={classMap.input()}
            name="reward_amount"
            value={data.reward_amount}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Expiry */}
      <div>
        <label className={classMap.label()}>
          <FaCalendarAlt className="inline mr-2 opacity-70 text-[var(--owner)]" />
          Expiration Date
        </label>
        <input
          type="date"
          className={classMap.input()}
          name="expires_at"
          onChange={handleChange}
        />
      </div>

      {/* JOB ONLY */}
      {type === "job" && (
        <>
          <div>
            <label className={classMap.label()}>
              <FaBriefcase className="inline mr-2 opacity-70 text-[var(--owner)]" />
              Employment Type
            </label>
            <select 
              className={`${classMap.select()} [&>option]:bg-slate-900 [&>option]:text-white`}
              name="employment_type"
              onChange={handleChange}
            >
              <option value="one_time">One-time</option>
              <option value="contract">Contract</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div>
            <label className={classMap.label()}>
                <FaClock className="inline mr-2 opacity-70 text-[var(--owner)]"/>
                Job Duration</label>
            <input
              className={classMap.input()}
              name="job_duration"
              placeholder="e.g. 14 days"
              onChange={handleChange}
            />
          </div>
        </>
      )}

      {/* TASK ONLY */}
      {type === "task" && (
        <>
          <div>
            <label className={classMap.label()}>
              <FaUsers className="inline mr-2 opacity-70 text-[var(--owner)]" />
              Max Participants
            </label>
            <input
              className={classMap.input()}
              name="max_participants"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className={classMap.label()}>
              <FaTasks className="inline mr-2 opacity-70 text-[var(--owner)]" />
              Proof Requirements
            </label>
            <textarea
              className={classMap.input()}
              name="proof_requirements"
              rows={3}
              placeholder="Tweet link + screenshot, etc"
              onChange={handleChange}
            />
          </div>
        </>
      )}

      {/* Submit */}
      <SendRequest
        url="/api/earnfi/create"
        data={data}
        method="post"
        text={`Create ${type === "job" ? "Job" : "Task"}`}
        className="mt-4"
      />
    </section>
  );
};

export default EarnFiCreateForm;