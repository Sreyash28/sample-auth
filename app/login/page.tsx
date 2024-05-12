"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [user]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/user/login", user);
      router.push("/");
      console.log(res);
      toast.success(res.data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.error || "An error occurred");
    }
  };
  return (
    <div className="flex bg-gray-800 min-h-screen justify-center items-center">
      <div className="bg-cyan-400 p-8 rounded-lg shadow-md shadow-gray-700">
        <h1 className="text-center font-bold text-2xl text-slate-800">Login</h1>

        <div className="flex flex-col my-4 mx-3">
          <label className="text-slate-900">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email@email.com"
            required
            className="border-1 outline-none border-zinc-500 px-2 py-1 rounded-lg bg-gray-200"
          />
        </div>

        <div className="flex flex-col my-4 mx-3">
          <label className="text-slate-900">Password</label>
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
            required
            className="border-1 outline-none border-zinc-500 px-2 py-1 rounded-lg bg-gray-200"
          />
        </div>

        <button
          onClick={handleSubmit}
          className={`${
            disable
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-green-500"
          } py-1 px-3 rounded-lg w-full my-2 font-semibold`}
        >
          Login
        </button>
        <p className="mt-4 text-md">
          Don't have an account?{" "}
          <Link href={"/signup"} className="text-indigo-900 font-bold">
            SIGNUP
          </Link>{" "}
          here.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
