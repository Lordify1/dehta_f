import React, { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import SendRequest from "@/components/Tools/SendRequest";
import { IoMailUnreadOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { sendPostRequest } from "@/components/Tools/Misc";

export default function VerifyEmail({ user, message }: any) {
  const [notify, setMessage] = useState<string | null>(message);
  const [timer, setTimer] = useState<number>(0);
  const COOLDOWN = 180; // 3 minutes in seconds
  const STORAGE_KEY = "verify_email_timer_expiry";

  // ✅ Show toast when component mounts
  useEffect(() => {
    sendPostRequest('/email/verification-notification', [])
    .then((res) => {
      setMessage(res),
    console.log(res),
    toast.success(res)
    })
    .catch((err) => console.log(err))

    if(notify) toast.success(notify)
  }, [notify]);

  // ✅ Restore timer from localStorage if it exists
  useEffect(() => {
    const savedExpiry = localStorage.getItem(STORAGE_KEY);
    if (savedExpiry) {
      const expiryTime = parseInt(savedExpiry, 10);
      const currentTime = Math.floor(Date.now() / 1000);
      const remaining = expiryTime - currentTime;

      if (remaining > 0) {
        setTimer(remaining);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // ✅ Countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            localStorage.removeItem(STORAGE_KEY);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // ✅ Handle resend & save new expiry time
  const handleResend = (res: any) => {
    setMessage("Verification link sent again! Check your inbox ✨");
    const expiryTime = Math.floor(Date.now() / 1000) + COOLDOWN;
    localStorage.setItem(STORAGE_KEY, expiryTime.toString());
    setTimer(COOLDOWN);
  };

  return (
    <>
      <Head title="Verify Email" />
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#0f0f0f] text-white px-4">
        <div className="max-w-lg w-full bg-[#1c1c1c] p-8 rounded-xl shadow-lg text-center space-y-6">
          <div className="flex justify-center text-center">
            <IoMailUnreadOutline className="text-6xl font-bold text-[#00FFD1]" />
          </div>
          <h1 className="text-3xl font-bold text-[#00FFD1]">Email Verification</h1>
          {user?.email_verified_at ? (
            <div>
              <p className="text-green-400">✅ Your email is already verified.</p>
              <a
                href="/dashboard"
                className="mt-4 inline-block bg-[#00FFD1] text-black font-semibold px-5 py-2 rounded hover:bg-[#00ccaa]"
              >
                Go to Dashboard
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              <p>
                A verification link has been sent to your email:
                <strong className="block mt-1">{user?.email}</strong>
              </p>

              <p className="text-sm text-gray-400">
                Didn’t receive the email? Click below to resend.
              </p>

              {/* Show button only if timer is 0 */}
              <div className="grid grid cols-1 justify-center items-center">
                {timer === 0 ? (
                <SendRequest
                  url="/email/verification-notification"
                  method="post"
                  text="Resend Email"
                  onResponse={handleResend}
                />
              ) : (
                <button
                  className="w-full bg-gray-100/2 text-gray-400 font-semibold px-5 py-2 rounded cursor-not-allowed"
                  disabled
                >
                  Resend in {timer}s
                </button>
              )}
              </div>

              {/* {notify && <p className="text-sm text-green-400">{notify}</p>} */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
