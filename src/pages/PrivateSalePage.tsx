import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import SaleTimer from './components/PrivateSalePage/SaleTimer';
import { classMap } from '@/components/Tools/Misc';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { appUrl, saleWallet } from '@/app';
import axios from 'axios';
import { PresaleBtn } from '../components/Tools/Misc';
import { apiUrl } from '../App';

const TOKEN_PRICE = 0.007;    // USD per token
const WALLET_ADDRESS = saleWallet;
const BASE_USD = 1;           // placeholder until live rate

const PrivateSalePage: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [manualWallet, setManualWallet] = useState<string>("");
  const [usdAmount, setUsdAmount] = useState("");
  const [tokenAmount, setTokenAmount] = useState(0);
  const [sending, setSending] = useState(false);
  const [txnHash, setTxnHash] = useState("");

  // Token preview based on USD
  const handleUsdChange = (v: string) => {
    setUsdAmount(v);
    const parsed = parseFloat(v);
    setTokenAmount(parsed ? parsed / TOKEN_PRICE : 0);
  };

  // Prevent duplicates
  const isDuplicateTx = (from: string) => {
    const keys = Object.keys(localStorage).filter(k => k.startsWith("faeces_tx_"));
    for (const key of keys) {
      const tx = JSON.parse(localStorage.getItem(key) || "{}");
      if (tx?.from === from && tx?.status === "pending") return true;
    }
    return false;
  };

  // const submitTx = async () => {
  //   const from = walletAddress || manualWallet;
  //   if (!from) return toast.error("Enter your wallet address first.");

  //   const parsed = parseFloat(usdAmount);
  //   if (!parsed) return toast.error("Enter a valid amount");
  //   if (parsed < 30) return toast.error("Minimum $30");
  //   if (parsed > 750) return toast.error("Maximum $750");

  //   if (!txnHash.trim()) return toast.error("Paste the transaction hash.");

  //   if (isDuplicateTx(from)) {
  //     return toast.error("You already have a pending transaction on record.");
  //   }

  //   setSending(true);

  //   try {
  //     const id = crypto.randomUUID();

  //     const record = {
  //       // id,
  //       hash: txnHash,
  //       amount_usd: parsed,
  //       token_amount: tokenAmount,
  //       from,
  //       status: "pending",
  //     };

  //     // save locally so the user doesn’t lose it
  //     localStorage.setItem(`faeces_tx_${id}`, JSON.stringify(record));

  //     // notify backend -> backend verifies
  //     const res = await axios.post(`${appUrl}/api/private-sale/verify`, record)

  //     toast.success(res.data.message);

  //     // toast.success("Submitted! We’re verifying your payment. You’ll be updated soon.");
  //   } catch (err) {
  //     console.log(err);
  //     toast.error(err.data.message);
  //   }
  //   setSending(false);
  // };


  // new main action
const sendRequest = async () => {
  const from = manualWallet;

  if(!txnHash || !usdAmount || !from){
    toast.error('All Fields are Requied OG!!');
    return;
  }

  const parsed = parseFloat(usdAmount);
  if (!parsed || parsed < 30 || parsed > 750) {
    toast.error("Enter valid amount between $30 and $750.");
    return;
  }

  if (!txnHash.trim()) {
    toast.error("Paste your transaction hash first.");
    return;
  }

  if (isDuplicateTx(from)) {
    toast.error("You have a pending transaction. Cancel before submitting another.");
    return;
  }

  setSending(true);

  try {
    const id = crypto.randomUUID();

    const record = {
      tx_hash: txnHash,
      usd: parsed,
      token_amount: tokenAmount,
      wallet: from,
    };

    localStorage.setItem(`dehta_tx_${id}`, JSON.stringify(record));

    const res = await axios.post(`${apiUrl}/api/private-sale/verify`, record);

    toast.success(res.data.message ?? "Request received. Awaiting confirmation.");
  } catch (err) {
    console.log(err)
    err.response.data?.message && toast.error(err.response.data?.message);
    // toast.error("Something went sideways. Try again.");
  }

  setSending(false);
};


  const cancelTx = () => {
    const keys = Object.keys(localStorage).filter(k => k.startsWith("dehta_tx_"));
    keys.forEach(key => localStorage.removeItem(key));
    toast.error("Previous pending transaction removed.");
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(WALLET_ADDRESS);
    toast.success("Wallet address copied!");
  };

  return (
    <Layout showNavs={false}>
      <Helmet><title>$Dehta Token Private Sale</title></Helmet>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start justify-items-center p-4 mt-20 text-white">

        {/* Left Hero */}
        <section className="w-full flex lg:justify-end text-center lg:text-right">
          <h2 className="text-5xl font-black drop-shadow-xl leading-tight max-w-xs">
            OG Private Sale Party!!
          </h2>
        </section>

        {/* Center Form */}
        <section className="max-w-5xl w-full flex flex-col items-center space-y-6">

          <p className={classMap.subText}>
            Secure your <span className="font-semibold text-[var(--owner)]">$Dehta</span> tokens before the doors close.
          </p>

          <div className={classMap.glassCard("p-5 w-full text-center")}>
            <h3 className="font-bold text-white">Contract Address</h3>
            <p className="font-mono text-sm break-all">
              0x57299E7A2c1544429Bcf9FdAad5b364D20EEF797
            </p>
            <p className="mt-2 text-white/70 text-sm">1 $DTA = $0.007</p>
          </div>

          <div className={classMap.glassCard("p-6 w-full space-y-5")}>

            <h3 className="font-semibold text-xl text-white">Send BASE to</h3>

            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
              <span className="font-mono text-sm break-all flex-1">
                {WALLET_ADDRESS}
              </span>
              <button onClick={copyAddress} className={classMap.button()}>
                Copy
              </button>
            </div>

            <p className="text-xs text-white/50 leading-relaxed">
              • Send BASE to the address above.<br/>
              • Paste your transaction hash.<br/>
              • Submit and relax while we verify.<br/>
            </p>

            {!walletAddress && (
              <>
                <label className={classMap.label}>Your wallet</label>
                <input
                  type="text"
                  placeholder="Enter wallet address"
                  className={classMap.input()}
                  value={manualWallet}
                  onChange={e => setManualWallet(e.target.value)}
                />
              </>
            )}

            <label className={classMap.label}>Amount (USD)</label>
            <input
              type="number"
              className={classMap.input()}
              value={usdAmount}
              min={30}
              max={750}
              onChange={e => handleUsdChange(e.target.value)}
            />

            {tokenAmount > 0 && (
              <p className="text-sm text-white">
                You’ll receive about
                <span className="font-bold ml-1 text-[var(--owner)]">
                  {tokenAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} $Dehta
                </span>
              </p>
            )}

            <label className={classMap.label}>Transaction Hash</label>
            <input
              type="text"
              value={txnHash}
              placeholder="Paste tx hash"
              onChange={e => setTxnHash(e.target.value)}
              className={classMap.input()}
            />

            <button
              disabled={sending}
              onClick={sendRequest}
              className={classMap.button() + " w-full mt-2"}
            >
              {sending ? "Submitting..." : "I've Sent It"}
            </button>

            <p className="text-xs text-white/50 text-center">
              Tokens are delivered after verification.
            </p>

          </div>
        </section>

        {/* Right Hero Mirror */}
        <section className="w-full flex lg:justify-start text-center lg:text-left">
          <h2 className="text-5xl font-black drop-shadow-xl leading-tight max-w-xs opacity-50">
            OG Private Sale Party!!
          </h2>
        </section>

      </div>
    </Layout>

  );
};

export default PrivateSalePage;