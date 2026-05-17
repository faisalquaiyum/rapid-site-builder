import { useParams } from "react-router-dom";
import { AuthView } from "@daveyplate/better-auth-ui";

export default function AuthPage() {
  const { pathname } = useParams();

  return (
    <section className="min-h-screen text-white bg-gray-900 bg-[radial-gradient(60%_60%_at_50%_0%,#0f172a_0%,#111827_35%,#0b1020_100%)]">
      <main className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-16">
        <div className="dark w-full max-w-md">
          <AuthView
            pathname={pathname}
            classNames={{
              base: "bg-slate-950/70 border border-white/10 ring-1 ring-white/10 shadow-2xl shadow-black/40 backdrop-blur-xl",
              content: "text-white",
              title: "text-white",
              description: "text-slate-300",
              continueWith: "text-slate-300",
              separator: "bg-white/10",
              footer: "text-slate-300",
              footerLink: "text-blue-300 hover:text-blue-200",
              form: {
                input:
                  "bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus-visible:border-blue-400/40 focus-visible:ring-blue-400/30",
                label: "text-slate-200",
                primaryButton: "bg-blue-400 text-emerald-950 hover:bg-blue-300",
                secondaryButton: "bg-white/10 text-white hover:bg-white/15",
                outlineButton: "border-white/15 text-white hover:bg-white/10",
                providerButton: "bg-white/5 text-white hover:bg-white/10",
                checkbox:
                  "border-white/20 data-[state=checked]:border-blue-400 data-[state=checked]:bg-blue-400",
                error: "text-red-300",
                forgotPasswordLink: "text-blue-300 hover:text-blue-200",
              },
            }}
          />
        </div>
      </main>
    </section>
  );
}
