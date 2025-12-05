
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import TaskBox from "@/components/TaskBox";
import AddTask from "@/components/AddTask";
import StatusCircle from "@/components/StatusCircle";

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
  

  //count status bar
  const totalTask = await prisma.task.findMany({
    where : {userId : user.id,}
  });
  const countTaskCompleted = await prisma.task.count ({
    where: {
      userId: user.id,
      status : "DONE"}
  });
  const countTaskInprogress = await prisma.task.count ({
    where  : {
      userId: user.id,
      status : "IN_PROGRESS"}
  });
  const countTaskNotstarted = await prisma.task.count ({
    where  : {
      userId: user.id,
      status : "TODO"}
  });

  //percent status
  const percentCompletedTask = Number(((countTaskCompleted / totalTask.length) * 100).toFixed(1));
  const percentInprogressTask = Number(((countTaskInprogress / totalTask.length) * 100).toFixed(1));
  const percentNotstartedTask = Number(((countTaskNotstarted / totalTask.length) * 100).toFixed(1));

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
      <div className="flex gap-4 min-h-[80vh] bg-[#F5F8FF]">
        {/* Navi */}
        <div className="w-1/6 p-2 rounded-lg bg-[#FF6767] mt-[6vh]">

        </div>
        {/* Main content */}
        <div className="w-4/5 mt-[8vh] ml-[8vh] mr-[8vh] ">
          <h1 className="p-4 text-4xl font-bold">
              Welcome back, {user.username}
          </h1>
          <div className=" border p-4 ">
            <div className=" p-4 border rounded-lg shadow-md border-gray-100">

              <div className="flex p-2">
                <h1 className="text-[#FF6767]  text-xl">To-Do</h1>
                {/* add task */}        
                <AddTask />
              </div>

              {/* status bar x Count task completed */}
              <div className="flex">
                  <div className="flex w-3/5  rounded-lg items-center justify-center gap-20 bg-[#F5F8FF] shadow-md">
                    <StatusCircle percent={percentCompletedTask} label="Completed" color="#05A301"/>
                    <StatusCircle percent={percentInprogressTask} label="In Progress" color="#0225FF" />
                    <StatusCircle percent={percentNotstartedTask} label="Not Started" color="#F21E1E" />
                  </div>

                  <div className="w-2/5  rounded-lg justify-center items-center flex bg-[#F5F8FF] shadow-md"> 
                    Status Bar: Completed {countTaskCompleted}/{totalTask.length}
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
    </div>
  );
}
