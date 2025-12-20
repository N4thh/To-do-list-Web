"use client";

import { useState } from "react";

export default function DemoPopup() {
  const [open, setOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    return !localStorage.getItem("demo-popup-seen");
  });

  const handleClose = () => {
    localStorage.setItem("demo-popup-seen", "true");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-2xl border border-gray-200">

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          Demo Account & System Overview
        </h2>

        {/* Demo Account */}
        <div className="mb-4 rounded-md bg-gray-100 p-4 text-gray-900">
          <p className="font-semibold mb-1">Demo Account</p>
          <p>
            Username: <span className="font-mono font-semibold">test</span>
          </p>
          <p>
            Password: <span className="font-mono font-semibold">Test@123</span>
          </p>
        </div>

        {/* Pages */}
        <div className="space-y-2 text-sm text-gray-800">
          <p><b>/login</b>  Login page</p>
          <p><b>/register</b>  Registration page</p>
          <p><b>/dashboard</b>  Main dashboard overview</p>
          <p><b>/dashboard/tasks</b>  Completed tasks (DONE)</p>
          <p><b>/dashboard/mytask</b>  View all tasks</p>

          <hr className="my-2 border-gray-300" />

          <p><b>Sidebar Navigation</b>  Main navigation menu</p>

          <p className="mt-2 font-semibold">Task Components</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><b>TaskBox.tsx</b> Display a single task</li>
            <li><b>AddTask.tsx</b>  Add new task form</li>
            <li><b>EditTask.tsx</b>  Edit existing task</li>
            <li><b>StatusCircle.tsx</b>  Task status percentage (Dashboard)</li>
          </ul>
        </div>

        {/* Button */}
        <div className="mt-6 text-right">
          <button
            onClick={handleClose}
            className="rounded-md bg-[#FF6767] px-4 py-2 text-white font-semibold
                       hover:bg-[#ff4d4d] transition"
          >
            Got it
          </button>
        </div>

      </div>
    </div>
  );
}
