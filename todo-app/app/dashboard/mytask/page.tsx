// /dashboard/settings/page.tsx

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import TaskBox from "@/components/TaskBox";

export default async function MyTaskPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  // Lấy TẤT CẢ task của user
  const tasks = await prisma.task.findMany({
    where: {
      userId: user.id,
    },
    orderBy: [
      { status: "asc" }, // NOT_STARTED → IN_PROGRESS → DONE
      { updatedAt: "desc" },
    ],
  });
  
  type TaskType = Awaited<ReturnType<typeof prisma.task.findMany>>[number];

  return (
    <div>
      {/* Title */}
      <h1 className="p-4 text-4xl font-bold text-[#FF6767]">
        My Tasks
      </h1>

      <div className="border p-4">
        <div className="p-4 border rounded-lg shadow-md border-gray-100 bg-white">

          {/* Count */}
          <p className="mb-4 text-gray-600">
            Total tasks: <span className="font-semibold">{tasks.length}</span>
          </p>

          {/* Task List */}
          {tasks.length === 0 ? (
            <p className="p-4 text-gray-500">No task yet</p>
          ) : (
            tasks.map((task: TaskType) => (
              <TaskBox key={task.id} {...task} />
            ))
          )}

        </div>
      </div>
    </div>
  );
}
