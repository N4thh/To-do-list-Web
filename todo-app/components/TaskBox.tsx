"use client";

import { Task } from "@prisma/client";

const TaskBox = ({ title, description, priority, status }: Task) => {
  return (
    <div className="flex border rounded-lg p-2 w-[50vh] gap-1.5 mt-4">
      {/* click button */}
      <div className="w-1/20 h-[2vh] border">

      </div>
      {/* task */}
      <div>
        <div className="flex flex-col ml-[1vh]  ">
            <h3 className="font-bold text-2xl ">{title}</h3>
            {description && 
            <p className="text-[#747474] text-lg">{description}</p>}
            <div className="mt-[1.5vh] text-xs ">
              <span>Priority: {priority}</span> | 
              <span> Status: {status}</span>
            </div>
         </div>  
      </div>

    </div>
  );
};

export default TaskBox;
