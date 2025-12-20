import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { ReactNode } from "react";


export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black">

      {/* HEADER (search bar + title) */}
      <div className="bg-[#F8F8F8] h-[20vh] flex items-center shadow-lg mb-2">
        
        {/* Title */}
        <div>
          <h1 className="text-4xl ml-10 font-bold">
            <span className="text-[#FF6767]">Dash</span>board
          </h1>
        </div>

        {/* Search button area */}
        <div className="ml-auto mr-10">
          
        </div>
      </div>

      {/* NAVIGATION + MAIN */}
      <div className="flex gap-4 min-h-[80vh] bg-[#F5F8FF]">

        {/* SIDEBAR Navi */}
        <div className="w-1/6 p-4 bg-[#FF6767] mt-[6vh] rounded-lg flex flex-col gap-4 text-white font-semibold">
          <Link className="hover:underline" href="/dashboard">Dashboard</Link>
          <Link className="hover:underline" href="/dashboard/tasks">Completed</Link>
          <Link className="hover:underline" href="/dashboard/mytask">My Task</Link>

          <LogoutButton />
        </div>

        {/* MAIN CONTENT */}
        <div className="w-4/5 mt-[8vh] ml-[8vh] mr-[8vh]">
          {children}
        </div>

      </div>
    </div>
  );
}
