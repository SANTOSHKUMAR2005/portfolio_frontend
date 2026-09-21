import React, { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { FaExternalLinkAlt, FaGithub, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { useData } from "../context/ContextAPI";
import { Backend_BASE_URL } from "../api/apiConfig";
import Spin from "../components/Spin"
import DeleteConfirmationPopUp from "../components/DeleteConfirmationPopUp";

const Projects = ({ btn1, btn2 }) => {
  const {
    allProjects,
    setAllProjects,
    setprojectInputData,
    isAPICalling,
    setisAPICalling,
    confirmation,
    setconfirmation,
    showDeletePopUp,
    setshowDeletePopUp,
    isDeleting,
    setIsDeleting,
    isAddingProject,
  } = useData();

  const [deleteProjectId, setdeleteProjectId] = useState(null);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const getAllProjects = async () => {
    setisAPICalling(true);
    try {
      const response = await fetch(`${Backend_BASE_URL}/api/projects/get-all-projects`);
      const data = await response.json();

      if (response.ok) {
        setAllProjects(data.data);
      } else {
        console.log(data.detail || "Unable to load projects");
      }
    } catch (error) {
      console.error("Project API error:", error);
      // toast.error("Unable to load projects. Please check your connection.");
    } finally {
      setisAPICalling(false);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, [isDeleting, isAddingProject]);

  const categories = useMemo(() => {
    const values =
      allProjects?.flatMap((project) => project.techstack || []) || [];
    return ["All", ...new Set(values)];
  }, [allProjects]);

  const visibleProjects = useMemo(() => {
    if (!allProjects) return [];

    const normalized = query.trim().toLowerCase();

    return allProjects.filter((project) => {
      const matchesFilter =
        filter === "All" || (project.techstack || []).includes(filter);

      const matchesSearch =
        !normalized ||
        project.title?.toLowerCase().includes(normalized) ||
        project.description?.toLowerCase().includes(normalized) ||
        (project.techstack || []).some((tech) =>
          tech.toLowerCase().includes(normalized)
        );

      return matchesFilter && matchesSearch;
    });
  }, [allProjects, filter, query]);

  const deleteProjectIdHandler = (id) => {
    setshowDeletePopUp(true);
    setdeleteProjectId(id);
  };

  const deleteConfirmationProjectMainHandler = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(
        `${Backend_BASE_URL}/api/admin/delete-project/${deleteProjectId}`,
        { method: "DELETE" }
      );
      const data = await response.json();

      if (response.ok) {
        setAllProjects(
          allProjects.filter((project) => project.id !== deleteProjectId)
        );
        toast.success("Project deleted successfully");
      } else {
        toast.error(data.detail || "Project deletion failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting the project");
    } finally {
      setshowDeletePopUp(false);
      setdeleteProjectId(null);
      setconfirmation(null);
      setIsDeleting(false);
    }
  };

  const cancelConfirmationMainHandler = () => {
    setshowDeletePopUp(false);
    setdeleteProjectId(null);
    setconfirmation(null);
  };

  useEffect(() => {
    if (confirmation === "Yes") deleteConfirmationProjectMainHandler();
    if (confirmation === "Cancel") cancelConfirmationMainHandler();
  }, [confirmation]);

  const editProjectDetailsHandler = (id) => {
    const project = allProjects?.find((item) => item.id === id);

    if (!project) {
      toast.info("Project details could not be found.");
      return;
    }

    setprojectInputData({
      title: project.title,
      description: project.description,
      techstack: project.techstack.join(","),
      githubUrl: project.githubUrl,
      liveLink: project.liveLink,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isAPICalling) {
    return (
      <section id="projects" className="section-shell">
        <div className="section-heading">
          <p>Selected work</p>
          <h2>
            Featured <span>Projects</span>
          </h2>
        </div>
        <div className="flex justify-center py-20">
          <Spin w="10" />
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section-shell">
      <div className="section-heading">
        <p>Things I&apos;ve built</p>
        <h2>
          Featured <span>Projects</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl normal-case tracking-normal text-slate-400">
          A selection of applications where I&apos;ve worked across frontend,
          backend, APIs and databases.
        </p>
      </div>

      <div className="mx-auto mb-8 flex max-w-7xl flex-col gap-4">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects or technologies..."
            className="w-full rounded-2xl border border-white/10 bg-white/3 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-background-secondary/50"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition ${filter === category
                ? "border-background-secondary bg-background-secondary text-white"
                : "border-white/10 bg-white/2.5 text-slate-400 hover:border-white/20 hover:text-white"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {visibleProjects.length ? (
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: index * 0.06 }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/2.5 transition duration-300 hover:-translate-y-1 hover:border-background-secondary/30 hover:bg-white/4"
            >
              <div className="relative h-52 overflow-hidden bg-slate-900">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
              </div>

              <div className="flex h-full flex-col p-6">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <p className="mt-3 line-clamp-4 text-sm leading-7 text-slate-400">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {(project.techstack || []).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-background-secondary/20 bg-background-secondary/5 px-2.5 py-1 text-xs font-medium text-background-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
                    >
                      <FaGithub /> GitHub
                    </a>
                  )}

                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-background-secondary py-2.5 text-sm font-bold text-white transition hover:brightness-110"
                    >
                      <FaExternalLinkAlt size={12} /> Live Demo
                    </a>
                  )}
                </div>

                {btn1 && btn2 && (
                  <div className="mt-4 flex gap-3 border-t border-white/10 pt-4">
                    <button
                      onClick={() => editProjectDetailsHandler(project.id)}
                      className="flex-1 rounded-xl border border-background-secondary/20 bg-background-secondary/5 py-2 text-sm font-semibold text-background-secondary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProjectIdHandler(project.id)}
                      className="flex-1 rounded-xl border border-red-500/20 bg-red-500/5 py-2 text-sm font-semibold text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/2.5 p-10 text-center">
          <p className="font-semibold text-white">No matching projects</p>
          <p className="mt-2 text-sm text-slate-500">
            Try another keyword or select a different technology.
          </p>
        </div>
      )}

      {showDeletePopUp && <DeleteConfirmationPopUp message="Project" />}
    </section>
  );
};

export default Projects;
