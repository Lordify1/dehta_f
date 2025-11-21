import React, { useState } from "react";
import SendRequest from "@/components/Tools/SendRequest";
import { advisorName, advisorUrl, appName } from "@/app";
import { classMap, guestCheck } from "@/components/Tools/Misc";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useUser } from "@/context/UserContext";



export default function Login() {
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
        <title>Login - {appName}</title>
        <meta name="description" content="Login to your dashboard" />
      </Helmet>
      <div className="min-h-screen bg-background text-primary flex flex-col items-center justify-center px-4 py-8 herobg">
        <h1 className="text-3xl font-bold mb-6">Welcome back 👋</h1>
        <p className="text-primary mb-6">Login to your dashboard</p>

        <form className="w-full max-w-md space-y-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className={`${classMap.input}`}
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className={`${classMap.input}`}
          />

          <SendRequest
            url="/login"
            method="post"
            data={form}
            className="w-full"
            redirect={true}
            onResponse={() => {}}
            text="Login"
          />
        </form>

        <p className="text-primary mt-6">
          <Link to={`${advisorUrl}/register`} className="underline text-[var(--ceo)]">
            Register
          </Link> {" "} | {" "}
          <Link to={`${advisorUrl}/reset-password`} className="underline text-[var(--ceo)]">
              Forgot Password
            </Link>
        </p>
      </div>
    </>
  );
}




