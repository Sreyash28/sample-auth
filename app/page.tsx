"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/user/logout");
      router.push("/login");
      console.log(res);
      toast.success(res.data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.error || "An error occurred");
    }
  };
  return (
    <div className="text-black">
      This is home
      <button
        onClick={handleLogout}
        className="bg-red-500 py-1 px-5 rounded-lg  m-10 font-semibold"
      >
        Logout
      </button>
    </div>
  );
}
