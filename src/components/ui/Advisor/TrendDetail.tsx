import { useState } from "react";
import { classMap } from "@/components/Tools/Misc";

const TrendDetail = ({ data }: { data: any }) => {
  const trend = data[0];
  const options = trend.options;

  // selected option
  const [selected, setSelected] = useState<any>(null);

  // amount input
  const [amount, setAmount] = useState("");

  // calculate percentages if votes exist
  const totalVotes = trend.votes?.length || 0;

  const getPercentage = (optionId: number) => {
    if (totalVotes === 0) return 0;
    const count = trend.votes.filter((v: any) => v.option_id === optionId).length;
    return Math.round((count / totalVotes) * 100);
  };

  return (
    <div className="flex flex-col">
    <section className={`w-full p-5 rounded-xl ${classMap.section} flex flex-col gap-5`}>
      
      {/* Title */}
      <h1 className={classMap.heading}>
        {trend.title}
      </h1>

      {/* Body */}
      <p className="text-[var(--primary)] opacity-80">
        {trend.body}
      </p>

      {/* Options */}
      <div className="flex flex-col gap-3 w-full">
        {options.map((opt: any, index: number) => {
          const percent = getPercentage(opt.id);

          return (
            <div
              key={opt.id}
              onClick={() => setSelected(opt)}
              className={`cursor-pointer p-4 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:border-[var(--owner)] transition 
              ${selected?.id === opt.id ? "border-[var(--owner)] shadow-md" : ""}`}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-[var(--primary)]">{opt.option_text}</span>
                <span className="text-[var(--owner)] text-sm">{percent}%</span>
              </div>

              {/* Percentage Bar */}
              <div className="w-full h-2 bg-[var(--muted)] rounded-full mt-2">
                <div
                  className="h-full bg-[var(--owner)] rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Voting Amount Input */}
      {selected && (
        <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--owner)] mt-4 flex flex-col gap-3">
          <h3 className="font-semibold text-[var(--owner)]">
            Place Vote On: {selected.option_text}
          </h3>

          <input
            type="number"
            placeholder="Enter amount..."
            className={classMap.input()}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button
            className={classMap.button("bg-[var(--owner)]", "", "text-white")}
            onClick={() => console.log("Pay with Web3: ", selected.id, amount)}
          >
            Vote & Pay
          </button>
        </div>
      )}
    </section>
    </div>
  );
};

export default TrendDetail;
