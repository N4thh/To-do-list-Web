import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import TaskBox from "@/components/TaskBox";
import AddTask from "@/components/AddTask";
import StatusCircle from "@/components/StatusCircle";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  // Lấy task của user
  const tasks = await prisma.task.findMany({
    where: { userId: user.id },
    orderBy: {
      type: { name: "asc" }
    },
  });

  // Count
  const totalTask = await prisma.task.findMany({
    where: { userId: user.id },
  });

  const countTaskCompleted = await prisma.task.count({
    where: {
      userId: user.id,
      status: "DONE",
    },
  });

  const countTaskInprogress = await prisma.task.count({
    where: {
      userId: user.id,
      status: "IN_PROGRESS",
    },
  });

  const countTaskNotstarted = await prisma.task.count({
    where: {
      userId: user.id,
      status: "NOT_STARTED",
    },
  });

  // Percent
  const total = totalTask.length || 1;
  const percentCompletedTask = Number(((countTaskCompleted / total) * 100).toFixed(1));
  const percentInprogressTask = Number(((countTaskInprogress / total) * 100).toFixed(1));
  const percentNotstartedTask = Number(((countTaskNotstarted / total) * 100).toFixed(1));

  return (
    <div>
      {/* Main Content */}
      <h1 className="p-4 text-4xl font-bold">
        Welcome back, {user.username}
      </h1>

      <div className="border p-4">
        <div className="p-4 border rounded-lg shadow-md border-gray-100">

          <div className="flex p-2">
            <h1 className="text-[#FF6767] text-xl">To-Do</h1>

            {/* Add task */}
            <AddTask />
          </div>

          {/* Status Section */}
          <div className="flex">
            <div className="flex w-3/5 rounded-lg items-center justify-center gap-20 bg-[#F5F8FF] shadow-md">
              <StatusCircle percent={percentCompletedTask} label="Completed" color="#05A301" />
              <StatusCircle percent={percentInprogressTask} label="In Progress" color="#0225FF" />
              <StatusCircle percent={percentNotstartedTask} label="Not Started" color="#F21E1E" />
            </div>

            <div className="w-2/5 rounded-lg flex justify-center items-center bg-[#F5F8FF] shadow-md">
              Status Bar: Completed {countTaskCompleted}/{totalTask.length}
            </div>
          </div>

          {/* Task List */}
          <div>
            {tasks.filter(task => task.status !== "DONE").length === 0 ? (
              <p className="mt-[5vh] p-4">Not task yet</p>
            ) : (
              tasks
                .filter(task => task.status !== "DONE")
                .map(task => <TaskBox key={task.id} {...task} />)
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
