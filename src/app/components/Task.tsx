"use client";

import React, { useState } from "react";
import { createClient } from "../../../utils/supabase/client";
import { TrashIcon } from "@heroicons/react/24/outline";
interface TaskProps {
  id: string;
  name: string;
  isComplete: boolean;
}

export default function Task({
  id,
  name,
  isComplete: initialStatus,
}: TaskProps) {
  const [isComplete, setIsComplete] = useState(initialStatus);

  async function toggleStatus() {
    const supabase = createClient();
    const { error } = await supabase
      .from("Tasks")
      .update({ status: !isComplete })
      .eq("id", id);

    if (error) {
      console.error("Error updating task:", error);
      return;
    }

    setIsComplete(!isComplete);
  }

  async function deleteTask() {
    const supabase = createClient();

    const { error } = await supabase.from("Tasks").delete().eq("id", id);
    if (error) {
      console.error("Error deleting task:", error);
      return;
    }
    window.location.reload();
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700/50 hover:border-gray-600 transition-all duration-200">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div
            className={`w-4 h-4 rounded-full ${
              isComplete
                ? "bg-green-500 ring-2 ring-green-500/20"
                : "bg-red-500 ring-2 ring-red-500/20"
            }`}
          />
          <h3 className="text-lg text-gray-100 font-medium">{name}</h3>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleStatus}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isComplete
                ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
            }`}
          >
            {isComplete ? "Completed" : "In Progress"}
          </button>
          <button
            className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
            aria-label="Delete task"
            onClick={deleteTask}
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
