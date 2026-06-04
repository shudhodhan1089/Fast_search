import { useEffect } from "react";
import { useNavigate } from "react-router";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function Auth() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate("/", { replace: true });
      }
    });
  }, [navigate]);

  async function login(provider: "google" | "github") {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin + "/",
      },
    });
    if (error) {
      alert("Error while signing in");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-sm rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-center text-2xl font-bold text-slate-900">
          Fast Search
        </h1>
        <p className="mb-6 text-center text-sm text-slate-500">
          Sign in to start searching
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => login("google")}
            className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            Login with Google
          </button>
          <button
            onClick={() => login("github")}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Login with Github
          </button>
        </div>
      </div>
    </div>
  );
}
