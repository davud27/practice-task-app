import Link from "next/link";
import { createClient } from "../../utils/supabase/server";
import LogoutButton from "./components/LogoutButton";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const name = data?.user?.email || "Guest";
  const isLoggedIn = name !== "Guest";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 sm:p-12">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              Welcome to TaskManager
            </h1>
            <p className="text-lg sm:text-xl text-gray-300">
              {isLoggedIn
                ? `Logged in as ${name}`
                : "Get started with your tasks today"}
            </p>
          </div>

          <p className="text-md sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Organize your tasks efficiently and boost your productivity with our
            intuitive task management system
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {!isLoggedIn ? (
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-lg 
                hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 
                shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2"
              >
                <span>Login / Signup</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link
                  href="/private"
                  className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-lg 
                  hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 
                  shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2"
                >
                  <span>Your Dashboard</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
                <LogoutButton />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 text-gray-400 text-sm flex items-center gap-2">
        <span>Built with</span>
        <svg
          className="w-5 h-5 text-blue-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L1 21h22L12 2z" />
        </svg>
        <span>Next.js and Supabase</span>
      </div>
    </div>
  );
}
