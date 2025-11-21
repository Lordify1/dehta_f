import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import SaleTimer from './components/PrivateSalePage/SaleTimer';
import { ethers } from 'ethers';
import { classMap } from '@/components/Tools/Misc';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { appUrl, saleWallet } from '@/app';
import axios from 'axios';

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

  // Optional wallet connection
  const connectWallet = async () => {
    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletAddress(accounts[0]);
    } catch {
      toast.error("Wallet connection failed");
    }
  };

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

    localStorage.setItem(`faeces_tx_${id}`, JSON.stringify(record));

    const res = await axios.post(`${appUrl}/api/private-sale/verify`, record);

    toast.success(res.data.message ?? "Request received. Awaiting confirmation.");
  } catch (err) {
    console.log(err)
    err.response.data?.message && toast.error(err.response.data?.message);
    // toast.error("Something went sideways. Try again.");
  }

  setSending(false);
};


  const cancelTx = () => {
    const keys = Object.keys(localStorage).filter(k => k.startsWith("faeces_tx_"));
    keys.forEach(key => localStorage.removeItem(key));
    toast.error("Previous pending transaction removed.");
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(WALLET_ADDRESS);
    toast.success("Wallet address copied!");
  };

  return (
    <Layout showNavs={false}>
      <Helmet><title>Faeces Token Private Sale</title></Helmet>

      <section className="text-primary py-20 px-6 sm:px-16 ogbg">
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6">

          <SaleTimer />

          <h2 className="sm:text-3xl font-extrabold text-center tracking-tight text-secondary drop-shadow-lg">
            OG Private Sale Party!!
          </h2>

          <p className="text-center text-lg text-primary max-w-xl mx-auto mt-2">
            Secure your <span className="font-semibold text-[var(--owner)]">$FAECES</span> tokens.
          </p>

          {/* Wallet connect */}
          {/* {!walletAddress && (
            <appkit-button
              label="Connect Wallet (Optional)"
              // onClick={connectWallet}
              class="my-4"
            />
          )} */}

          {walletAddress && (
            <p className="text-center text-sm break-words">
              Connected: {walletAddress}
            </p>
          )}

          <div className="flex flex-col items-center justify-between bg-background p-3 border border-secondary text-center rounded-2xl">
            <p className='font-mono break-all'><h3>Contract Address:</h3>
            0x57299E7A2c1544429Bcf9FdAad5b364D20EEF797</p>
            <p>1 $FCS = $0.007</p>
          </div>

          {/* payment block */}
          <div className="flex flex-col bg-accent border border-[var(--primary)] p-6 rounded-lg shadow-lg max-w-3xl mx-auto mt-4 space-y-3 w-full overflow-hidden">

            <h3 className="font-semibold text-xl text-primary">Send BASE to</h3>

            <div className="flex items-center justify-between bg-background p-3 rounded-2xl border border-secondary w-full">
              <span className="font-mono break-all pr-2 flex-1">{WALLET_ADDRESS}</span>
              <button onClick={copyAddress} className={classMap.button("","","","","right")}>
                Copy
              </button>
            </div>

            {/* BIG NOTICE */}
            <p className="text-xs text-[var(--muted-foreground)] mt-4 leading-relaxed">
              • Send BASE to the address above.<br/>
              • Copy your transaction hash (TX HASH).<br/>
              • Paste it below and submit.<br/>
              • Then chill while we verify on-chain.<br/>
              We’ll notify you if confirmed or still pending. If something breaks, you can cancel and submit again.
            </p>

            <p className="text-sm text-[var(--muted-foreground)]">
              Minimum $30, Maximum $750
            </p>

            {/* wallet input only if not connected */}
            {!walletAddress && (
              <>
                <label className={classMap.label()}>Your wallet</label>
                <input
                  type="text"
                  placeholder="Enter wallet address"
                  value={manualWallet}
                  onChange={e => setManualWallet(e.target.value)}
                  className={classMap.input()}
                />
              </>
            )}

            {/* Amount */}
            <label className={classMap.label()}>Amount (USD)</label>
            <input
              type="number"
              min={30}
              max={750}
              value={usdAmount}
              onChange={(e) => handleUsdChange(e.target.value)}
              className={classMap.input()}
              required
            />

            {tokenAmount > 0 && (
              <p className="mt-1 text-sm">
                You will receive about{" "}
                <span className="font-bold text-primary">
                  {tokenAmount.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })} $FAECES
                </span>
              </p>
            )}

            {/* tx hash always required */}
            <label className={classMap.label()}>Transaction Hash</label>
            <input
              type="text"
              value={txnHash}
              placeholder="Paste tx hash"
              onChange={(e) => setTxnHash(e.target.value)}
              className={classMap.input()}
              required
            />

            <button
              disabled={sending}
              onClick={sendRequest}
              className={`${classMap.button("","","","","right")} mt-4`}
            >
              {sending ? "Submitting..." : "I've Sent It"}
            </button>

            {/* <button
              onClick={cancelTx}
              className={`text-xs underline mt-2`}
            >
              Cancel old transaction
            </button> */}

            <p className="text-xs text-[var(--muted-foreground)] mt-2">
              After submitting, we verify the transaction and deliver tokens.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivateSalePage;