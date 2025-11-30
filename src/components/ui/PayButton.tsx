import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "../../App";
import { classMap } from "../Tools/Misc";

export default function PayButton() {
  const [amount, setAmount] = useState("");
  const [invoiceUrl, setInvoiceUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    if (!amount) return toast.error('Please provide an amount!');

    try {
      setLoading(true);
      const res = await axios.post(
        `${apiUrl}/api/payment/create-invoice`,
        { amount }
      );

      const url = res.data?.invoice_url;
      if (!url) {
        toast.error("No invoice URL returned.");
        return;
      }

      setInvoiceUrl(url);
    } catch (err) {
      console.log(err);
      toast.error("Payment failed to initialize.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-1 overflow-hidden">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        className={`${classMap.input()}`}
      />

      <button
        onClick={handlePay}
        disabled={loading}
        className={`${classMap.button()}`}
      >
        {loading ? "Loading..." : "Pay"}
      </button>

      {invoiceUrl && (
        <iframe
          src={invoiceUrl}
          width="400"
          height="740"
          frameBorder="0"
          scrolling="no"
          style={{ overflowY: "scroll", marginTop: "20px" }}
        >
          Can't load payment widget
        </iframe>
      )}

    </div>
  );
}