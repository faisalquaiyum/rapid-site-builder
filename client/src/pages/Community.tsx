import { useEffect, useState } from "react";
import type { Project } from "../types";
import { Loader2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { toast } from "sonner";
import api from "@/configs/axios";

const Community = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const { data } = await api.get("/api/project/published");
      setProjects(data.projects);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section className="min-h-screen text-white bg-gray-900 bg-[radial-gradient(60%_60%_at_50%_0%,#0f172a_0%,#111827_35%,#0b1020_100%)]">
      <main className="min-h-screen px-4 py-10 md:px-16 lg:px-24 xl:px-32">
        {loading ? (
          <div className="flex min-h-[70vh] items-center justify-center">
            <Loader2Icon className="size-7 animate-spin text-blue-300" />
          </div>
        ) : projects.length > 0 ? (
          <div>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">
              <div>
                <h1 className="text-3xl md:text-4xl font-semibold">
                  Published Projects
                </h1>
              </div>
            </div>

            {/* Render projects grid/list here */}
            <div className="flex flex-wrap gap-3.5">
              {projects.map((project) => (
                <Link
                  to={`/view/${project.id}`}
                  target="_blank"
                  key={project.id}
                  className="w-72 max-sm:mx-auto cursor-pointer bg-gray-900/60 border border-gray-700 rounded-lg overflow-hidden group  group-hover:border-indigo-800/80 transition-all duration-300"
                >
                  {/* Desktop-like Mini Preview */}
                  <div className="relative w-full h-40 bg-gray-900 overflow-hidden border-b border-gray-800">
                    {project.current_code ? (
                      <iframe
                        srcDoc={project.current_code}
                        className="absolute top-0 left-0 w-[1200px] h-[800px] origin-top-left pointer-events-none"
                        sandbox="allow-scripts allow-same-origin"
                        style={{ transform: "scale(0.25)" }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <p>No Preview</p>
                      </div>
                    )}
                  </div>

                  {/* Add your project content title/info here if needed */}
                  <div className="p-4 text-white bg-linear-180 from-transparent group-hover:from-indigo-950 to-transparent transition-colors">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium line-clamp-2">
                        {project.name}
                      </h2>
                      <button className="px-2.5 py-0.5 mt-1 ml-2 text-xs bg-gray-800 border border-gray-700 rounded-full">
                        Website
                      </button>
                    </div>
                    <p className="text-gray-400 mt-1 text-sm line-clamp-2">
                      {project.initial_prompt}
                    </p>

                    <div className="flex justify-between items-center mt-6">
                      <span className="text-xs text-gray-500">
                        {new Date(project.createdAt).toLocaleString()}
                      </span>
                      <div className="flex gap-3 text-white text-sm">
                        <button className="flex items-center gap-2 rounded-md px-3 py-1.5 bg-white/10 transition-colors hover:bg-white/15">
                          <span className="flex size-4.5 shrink-0 items-center justify-center rounded-full bg-gray-200 text-black font-semibold">
                            {project.user?.name?.slice(0, 1)}
                          </span>
                          <span>{project.user?.name}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-2xl md:text-3xl font-semibold">
              No projects yet
            </h1>
            <p className="text-slate-300">
              Create your first project to get started.
            </p>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-emerald-950 bg-blue-400 shadow-lg shadow-black/30 transition hover:-translate-y-0.5 hover:bg-blue-300"
            >
              Create Project
            </button>
          </div>
        )}
      </main>
      <Footer />
    </section>
  );
};

export default Community;
