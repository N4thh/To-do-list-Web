// /dashboard/tasks/page.tsx

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import TaskBox from "@/components/TaskBox";

export default async function CompletedTaskPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  // Lấy task DONE của user
  const completedTasks = await prisma.task.findMany({
    where: {
      userId: user.id,
      status: "DONE",
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <div>
      {/* Title */}
      <h1 className="p-4 text-4xl font-bold text-[#05A301]">
        Completed Tasks
      </h1>

      <div className="border p-4">
        <div className="p-4 border rounded-lg shadow-md border-gray-100 bg-white">

          {/* Count */}
          <p className="mb-4 text-gray-600">
            You have completed <span className="font-semibold">{completedTasks.length}</span> tasks 
          </p>

          {/* Task List */}
          {completedTasks.length === 0 ? (
            <p className="p-4 text-gray-500">No completed tasks yet</p>
          ) : (
            completedTasks.map(task => (
              <TaskBox key={task.id} {...task} />
            ))
          )}

        </div>
      </div>
    </div>
  );
}
