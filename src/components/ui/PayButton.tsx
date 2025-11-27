import React, { useState } from "react";

declare global {
  interface Window {
    DePayWidgets: any;
  }
}

const PayWithDePay = ({ amount }: { amount: number }) => {
  const [loading, setLoading] = useState(false);

  const startPayment = async () => {
    try {
      setLoading(true);

      // 1. Create trace using Laravel backend
      const traceRes = await fetch("/api/depay/trace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          blockchain: "base",
          token: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
        }),
      });

      const trace = await traceRes.json();

      console.log("Trace created:", trace);

      // 2. Open DePay Widget
      window.DePayWidgets.Payment({
        trace: trace.id,

        accept: [{
          blockchain: "base",
          amount,
          token: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
          receiver: "0x1cf1b22dafe0d2c3e10979054b7154a6cd81ba3b"
        }],

        succeeded: async (transaction) => {
          console.log("Payment succeeded:", transaction);

          await fetch("/api/depay/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              trace: trace.id,
              status: "succeeded",
              transaction
            }),
          });

          alert("Payment successful!");
        },

        failed: async (transaction) => {
          console.log("Payment failed:", transaction);

          await fetch("/api/depay/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              trace: trace.id,
              status: "failed",
              transaction
            }),
          });

          alert("Payment failed!");
        }
      });

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={startPayment} disabled={loading}>
      {loading ? "Processing..." : `Pay ${amount} ETH`}
    </button>
  );
};

export default PayWithDePay;