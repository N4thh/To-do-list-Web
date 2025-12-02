
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import TaskBox from "@/components/TaskBox";
import AddTask from "@/components/AddTask";

export default async function Dashboard() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  // Lấy task của user
  const task = await prisma.task.findMany({
    where: { userId: user.id },
    orderBy: {
      type: "asc",
    },
  });

  return (
    <div className="min-h-screen bg-white text-black">
      {/* search bar */}
      <div className=" bg-[#F8F8F8] h-[20vh] flex items-center shadow-lg mb-2"> 
          {/* Dashboard */}
          <div>
            <h1 className="text-4xl ml-10 font-bold">
              <span className="text-[#FF6767]">Dash</span>board
            </h1>
          </div>
          {/* search button */}
          <div>
            
          </div>
          {/* last icon */}
          <div>

          </div>
      </div>

      {/* Navigator bar x Main content */}
      <div className="flex gap-4 h-[80vh] p-4 bg-[#F5F8FF]">
        {/* Navi */}
        <div className="w-1/5 p-2 rounded-lg bg-[#FF6767]">

        </div>
        {/* Main content */}
        <div className=" border w-4/5 p-4">
            <h1 className="p-4 text-4xl">
              Welcome back, {user.username}
            </h1>
          <div className=" p-4 h-[90%] border rounded-lg shadow-md border-gray-100">

            <div className="flex p-2">
              <h1 className="text-[#FF6767]  text-xl">To-Do</h1>
              {/* add task */}        
              <AddTask />
            </div>

            {/* status bar x Count task completed */}
            <div className=" h-[30%] border rounded-lg">
              <div>

              </div>

              <div>
                
              </div>   
            </div>

            {/* task */}
            <div>
                {task.length === 0 ? 
              (<p>Not task yet</p>) : 
              (task.map((task) => <TaskBox key = {task.id} {... task}/>))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
