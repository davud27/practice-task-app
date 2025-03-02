"use client";
import { createClient } from "../../../utils/supabase/client";
import { useState } from "react";

export default function CreateTask() {
  const [title, setTitle] = useState("");

  async function handleSubmit() {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user?.id) {
      const { data, error } = await supabase
        .from("Tasks")
        .insert([{ title, status: false, user_id: user.id }]);

      if (error) throw error;
      setTitle(""); // Reset input after successful submission
      alert("uploaded");
      return data;
    }
  }

  return (
    <form
      className="mt-4 sm:mt-0 px-6 py-3 bg-gray-800/50 backdrop-blur-lg rounded-lg 
            shadow-lg flex items-center gap-4 border border-gray-700"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task name..."
        className="bg-transparent text-white placeholder-gray-400 focus:outline-none flex-1"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 
              transform hover:scale-105 transition-all duration-200 
              shadow-lg hover:shadow-blue-500/25 flex items-center gap-2"
      >
        Add Task
      </button>
    </form>
  );
}
