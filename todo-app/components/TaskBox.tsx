"use client";

import { Task } from "@prisma/client";
import EditTask from "./EditTask";

const TaskBox = (task: Task) => {

  const { title, description, priority, status } = task;

  return (
    <div className="border rounded-lg p-2 w-[50vh] gap-1.5 mt-4">
      <div className="flex justify-between">
        
        <div className="flex">
          {/* circle */}
          <div
            className={`w-5 h-5 border-2 rounded-full 
              ${status === "IN_PROGRESS" ? "border-[#0225FF]" :
                status === "TODO" ? "border-[#F21E1E]" :
                "border-[#05A301]"}`}
          ></div>
          {/* Info */}
          <div className="flex flex-col ml-[1vh]">
            <h3 className="font-bold text-2xl">{title}</h3>

            {description && (
              <p className="text-[#747474] text-lg">{description}</p>
            )}

            <div className="mt-[1.5vh] text-xs ">
              <span>
                Priority:
                <span
                  className={`${
                    priority === "MEDIUM"   ? "text-[#0225FF]"
                      : priority === "HIGH" ? "text-[#F21E1E]"
                      : "text-[#05A301]"
                  }`}
                >
                  {priority}
                </span>
              </span>

              <span className="ml-[1vh]">
                Status:
                <span
                  className={`${
                    status === "IN_PROGRESS" ? "text-[#0225FF]"
                      : status === "TODO"    ? "text-[#F21E1E]"
                      : "text-[#05A301]"
                  }`}
                >
                  {status}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Edit button */}
        <div>
          <EditTask task={task} />
        </div>

      </div>
    </div>
  );
};

export default TaskBox;
