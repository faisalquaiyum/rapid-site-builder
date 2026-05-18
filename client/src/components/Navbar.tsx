import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { authClient } from "@/lib/auth-client";
import { UserButton } from "@daveyplate/better-auth-ui";
import api from "@/configs/axios";
import { toast } from "sonner";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [credits, setCredits] = useState(0);
  const { data: session } = authClient.useSession();

  const getCredits = async () => {
    try {
      const { data } = await api.get("/api/user/credits");

      setCredits(data.credits);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (session?.user) {
      getCredits();
    }
  }, [session?.user]);

  return (
    <header
      className="relative text-white bg-gray-900"
      style={{
        backgroundImage:
          "radial-gradient(60% 60% at 50% 0%, #0f172a 0%, #111827 35%, #0b1020 100%)",
      }}
    >
      <nav className="relative z-10 flex items-center justify-between border-b border-white/10 py-5 px-6 md:px-16 lg:px-24 xl:px-32">
        {/* Logo */}
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="h-5 sm:h-7" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link to="/" className="hover:text-blue-300 transition">
            Home
          </Link>
          <Link to="/projects" className="hover:text-blue-300 transition">
            Projects
          </Link>
          <Link to="/community" className="hover:text-blue-300 transition">
            Community
          </Link>
          <Link to="/pricing" className="hover:text-blue-300 transition">
            Pricing
          </Link>
        </div>

        {/* Desktop Button */}
        <div className="hidden md:flex items-center gap-3">
          {!session?.user ? (
            <button
              onClick={() => navigate("/auth/signin")}
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-emerald-950 bg-blue-400 shadow-lg shadow-black/30 transition hover:-translate-y-0.5 hover:bg-blue-300"
            >
              Get started
            </button>
          ) : (
            <>
              <button className="bg-white/10 px-5 py-1.5 text-xs sm:text-sm border text-gray-200 rounded-full">
                Credits : <span className="text-indigo-300">{credits}</span>
              </button>

              <UserButton size="icon" />
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={28} />
        </button>

        {/* Mobile Menu */}
        <div
          className={`
            fixed inset-0 z-50 flex flex-col items-center justify-center gap-8
            bg-slate-950/90 backdrop-blur-xl ring-1 ring-white/10 transition-all duration-300 md:hidden
            ${menuOpen ? "w-full opacity-100" : "w-0 opacity-0 overflow-hidden"}
          `}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-medium text-white/90 hover:text-blue-300 transition"
          >
            Home
          </Link>
          <Link
            to="/projects"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-medium text-white/90 hover:text-blue-300 transition"
          >
            Projects
          </Link>
          <Link
            to="/community"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-medium text-white/90 hover:text-blue-300 transition"
          >
            Community
          </Link>
          <Link
            to="/pricing"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-medium text-white/90 hover:text-blue-300 transition"
          >
            Pricing
          </Link>
        </div>
      </nav>
    </header>
  );
}
