import React, { useState } from "react";
import { Loader2Icon } from "lucide-react";

export default function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmitHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading || input.trim().length === 0) {
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const isDisabled = loading || input.trim().length === 0;

  return (
    <section className="bg-gray-900">
      <main className="flex flex-col items-center justify-between pt-30 md:pt-20 text-sm text-white text-center min-h-[785px] max-md:px-4 bg-[radial-gradient(60%_60%_at_50%_0%,#0f172a_0%,#111827_35%,#0b1020_100%)]">
        {/* Hero Content */}
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-4xl md:text-[40px] font-medium">
            What do you want to create?
          </h1>

          <p className="mt-6 text-base">
            Create something amazing with one simple message.
          </p>

          {/* Input Box */}
          <form
            className="max-w-xl w-full mt-4 overflow-hidden rounded-2xl bg-white/10 backdrop-blur-xl ring-1 ring-white/15 focus-within:ring-2 focus-within:ring-white/40"
            onSubmit={onSubmitHandler}
          >
            <textarea
              rows={4}
              placeholder="Tell us about your idea"
              className="w-full p-4 pb-0 bg-transparent outline-none resize-none text-left placeholder:text-slate-300"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />

            <div className="flex items-center justify-end px-4 pb-4">
              <button
                type="submit"
                disabled={isDisabled}
                aria-busy={loading}
                aria-label="Send"
                className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-lg shadow-black/30 transition ${
                  isDisabled
                    ? "cursor-not-allowed bg-white/20 text-white/60"
                    : "bg-blue-400 text-emerald-950 hover:-translate-y-0.5 hover:bg-blue-300"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2Icon className="size-4 animate-spin" />
                    Creating
                  </>
                ) : (
                  <>
                    Create with AI
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m13 6 6 6-6 6" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Suggestions */}
          <div className="grid grid-cols-2 gap-4 mt-8 text-slate-400 max-w-2xl">
            <p className="cursor-pointer hover:text-white transition">
              Create a blog post website?
            </p>
            <p className="cursor-pointer hover:text-white transition">
              I need to create my portfolio website?
            </p>

            <div className="w-full h-px bg-gray-400/50" />
            <div className="w-full h-px bg-gray-400/50" />

            <p className="cursor-pointer hover:text-white transition">
              Can you create a landing page for me for my business?
            </p>
            <p className="cursor-pointer hover:text-white transition">
              I want to create an e-commerce website?
            </p>
          </div>
        </div>
      </main>
    </section>
  );
}
