import { createClient } from "../../../utils/supabase/server";
import Task from "../components/Task";
import CreateTaskButton from "../components/CreateTaskButton";
import LogoutButton from "../components/LogoutButton";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const name = data?.user?.email || "Guest";
  const id = data?.user?.id;

  if (name === "Guest") {
    redirect("/");
  }

  // Propagate Tasks from Database
  const tasks = await supabase.from("Tasks").select("*").eq("user_id", id);
  tasks.data?.map((task) => console.log(task.title));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4 sm:p-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 shadow-lg">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Welcome back, {name.split("@")[0]}
            </h1>
            <p className="text-gray-400">
              Manage your tasks and stay productive
            </p>
          </div>
          <CreateTaskButton />
        </div>

        {/* All Tasks */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-6">All Tasks</h2>
          <div className="space-y-4">
            {tasks.data?.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                name={task.title}
                isComplete={task.status}
              />
            ))}
          </div>
        </div>
      </div>
      <LogoutButton />
    </div>
  );
}
