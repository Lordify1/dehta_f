import React, { useEffect, useState } from "react";
import SendRequest from "@/components/Tools/SendRequest";
import { advisorName, advisorUrl, appName } from "@/app";
import { centerFocus, guestCheck, inputClass, classMap } from "@/components/Tools/Misc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useUser } from "@/context/UserContext";
import Layout from "../../components/Layout";



const inputFields = [
  { label: "Name", name: "name", type: "text", placeholder: "Full Name", roles: ["founder", "investor"] },
  { label: "Username", name: "username", type: "text", placeholder: "Username", roles: ["founder", "investor"] },
  { label: "Email Address", name: "email", type: "email", placeholder: "Email", roles: ["founder", "investor"] },
  { label: "Password", name: "password", type: "password", placeholder: "Password", roles: ["founder", "investor"] },
  { label: "Referral Id", name: "referral", type: "text", placeholder: "Referral ID", roles: ["founder", "investor"] }
];

export default function Register() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const referralFromQuery = params.get("ref") || "";

  const [role, setRole] = useState<"founder" | "investor" | null>(null);
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "",
    platform: "advisor",
    project: "",
    referral: "",
  });

  // guestCheck(auth)

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (selectedRole: "founder" | "investor") => {
    setRole(selectedRole);
    setForm((prev) => ({ ...prev, role: selectedRole }));
  };

  useEffect(() => {
    setForm((prev) => ({...prev, referral: referralFromQuery}))
  },[role])

  return (
    <>
      <Helmet>
        <title>Register - {appName}</title>
      </Helmet>
      <Layout showNavs={false}>
      <div className={`${centerFocus()} bg-background herobg ${role &&  `mt-20 lg:mt-10`}`}>
        <h1 className="text-2xl md:text-3xl text-center font-bold mb-6">Join {!role ? ' as ...' : (role === 'investor' ? ' as an Investor' : ' as a Founder')}</h1>
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => handleRoleSelect("founder")}
            className={`${classMap.button(`${role === 'founder' ? 'bg-(--color-muted)' : ''}`, '', '', '', 'left')}`}
          >
            I'm a Founder
          </button>
          <button
            onClick={() => handleRoleSelect("investor")}
            className={`${classMap.button(`${role === 'investor' ? 'bg-(--color-muted)' : ''}`, '', '', '','right')}`}
          >
            I'm an Investor
          </button>
        </div>

        {role && (
          <form className="w-full max-w-md space-y-4">
            {inputFields
              .filter((field) => field.roles.includes(role))
              .map((field) => {
                if (field.name === "password") {
                  return (
                    <div key={field.name}>
                      <label htmlFor="password" className={`${classMap.label()}`}>Password</label>
                      <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className={`${classMap.input()}`}
                        required
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--owner)]"
                        onClick={() => setShowPassword((v) => !v)}
                        tabIndex={-1}
                      >
                        {showPassword ? <FaEyeSlash/> : <FaEye className="text-[var(--owner)]"/>}
                      </button>
                      </div>
                    </div>
                  );
                }
                return (
                  <div className="flex flex-col">
                  <label htmlFor={field.name} className={`${classMap.label()}`}>{field.label}</label>
                  <input
                    key={field.name}
                    type={field.type}
                    name={field.name}
                    value={form[field.name as keyof typeof form]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className={`${classMap.input()}`}
                    required
                  />
                  </div>
                );
              })}

            <SendRequest
              url="/register"
              method="post"
              data={form}
              className="w-full"
              redirect={true}
              onResponse={() => {}}
              text="Register"
            />
          </form>
        )}

        <p className="text-primary mt-6">
          Already have an account?{" "}
          <Link to={`/login`} className="underline text-[var(--owner)]">
            Login
          </Link>
        </p>
      </div>
      </Layout>
    </>
  );
}
