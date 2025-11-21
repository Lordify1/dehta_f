import React, { useState } from "react";
import SendRequest from "@/components/Tools/SendRequest";
import { advisorName, advisorUrl, appName } from "@/app";
import { classMap, guestCheck } from "@/components/Tools/Misc";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useUser } from "@/context/UserContext";



export default function ForgotPassword() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const auth = useUser();

  // guestCheck(auth)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password - {appName}</title>
        <meta name="description" content="Forgot Password" />
      </Helmet>
      <div className="min-h-screen bg-background text-primary flex flex-col items-center justify-center px-4 py-8 herobg">
        <h1 className="text-3xl font-bold mb-6">Forgot Password</h1>
        <p className="text-primary">Provide your Email to get your verification Code</p>

        <form className="w-full max-w-md space-y-3">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className={`${classMap.input}`}
          />

          <SendRequest
            url="/forgot-password"
            method="post"
            data={form}
            className="w-full"
            redirect={true}
            onResponse={() => {}}
            text="Get Code"
          />
        </form>

        <p className="text-primary opacity-60 mt-6">
          Don't have an account?{" "}
          <Link to={`${advisorUrl}/register`} className="underline text-[var(--ceo)]">
            Register
          </Link>
        </p>
      </div>
    </>
  );
}