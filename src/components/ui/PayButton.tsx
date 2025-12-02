import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "../../App";
import { classMap, Loading, LoadingBar } from "../Tools/Misc";
import { useMisc } from "@/context/MiscContext";
import { useOffCanvas } from "../../context/OffCanvasContext";


export default function PayButton({data}:{data?:object}) {
  const [invoiceUrl, setInvoiceUrl] = useState(null);
  const {getTrends} = useMisc();  
  const [loading, setLoading] = useState(false);
  const {setShowOffCanvas} = useOffCanvas()
  const [payInfo, setPayInfo] = useState<any>({
    amount: "",
    ...data
  })


  const startPolling = (orderId: string) => {
    const poll = setInterval(async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/payment/status/${orderId}`);

        if (res.data.status === "confirmed" || res.data.status === "finished") {
          clearInterval(poll);

          // close iframe
          setInvoiceUrl(null);
          setLoading(true);

          // register vote
          await axios.post(`${apiUrl}/api/trendbet/vote`, {
            order_id: orderId
          });

          setLoading(false);

          setShowOffCanvas(false)

          toast.success("Your vote has been counted!");

          getTrends();
        }

      } catch (e) {
        console.log("Polling error", e);
      }
    }, 5000); // every 5 seconds
  };


  const handlePay = async () => {
    if (!payInfo.amount) return toast.error('Please provide an amount!');

    if (payInfo.amount < 2) return toast.error('Minumum vote is $2!');

    try {
      setLoading(true);
      const res = await axios.post(
        `${apiUrl}/api/payment/create-invoice`,
        payInfo
      );

      const url = res.data?.invoice_url;
      if (!url) {
        toast.error("No Payment URL. Please try again");
        return;
      }

      const formatUrl = new URL(url);
      const iid = formatUrl.searchParams.get('iid')
      const newUrl:any = `https://nowpayments.io/embeds/payment-widget?iid=${iid}`
      setInvoiceUrl(newUrl);

      setTimeout(() => {
        startPolling(res.data.order_id);
      }, 1000);

    } catch (err) {
      console.log(err);
      toast.error("Payment failed to initialize.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-1 overflow-x-scroll">

      {!invoiceUrl && (
        <>
          <input
            type="number"
            value={payInfo.amount}
            onChange={(e) => {
              setPayInfo(prev => ({ ...prev, amount: e.target.value }));
            }}
            placeholder="Enter amount"
            className={`${classMap.input()}`}
          />

          <button
            onClick={handlePay}
            disabled={loading}
            className={`${classMap.button()}`}
          >
            {loading ? <LoadingBar/> : "Pay"}
          </button>
        </>
      )}

      {loading && (
        <Loading/>
      )}

      {invoiceUrl && (
      <>
        <div className="flex flex-row items-end">
          <button className={`${classMap.button()} btn-sm`}
          onClick={() => {
            setInvoiceUrl(null)
          }} 
          >Cancel</button>
        </div>
        <iframe
          src={invoiceUrl}
          width="100%"
          height="500px"
          style={{ overflowY: "scroll", marginTop: "20px" }}
        />
      </>
      )}
    </div>
  );

}