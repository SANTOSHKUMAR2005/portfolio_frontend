import { motion } from "motion/react";
import React from "react";
import { FaGraduationCap } from "react-icons/fa";

const educationData = [
    {
        degree: "B.Tech — Electronics & Communication Engineering",
        institution: "National Institute of Technology, Patna",
        year: "Ongoing",
        current: true,
    },
    {
        degree: "JEE Preparation",
        institution: "Self-driven learning",
        year: "2023",
    },
    {
        degree: "Senior Secondary — Class XII",
        institution: "Diamond Inter College, Rampur Bhagan, Ayodhya",
        year: "2022",
    },
    {
        degree: "Secondary — Class X",
        institution: "Diamond Inter College, Rampur Bhagan, Ayodhya",
        year: "2020",
    },
];

const EducationTimeline = () => (
    <section id="education" className="section-shell border-y border-white/5 bg-slate-950/30">
        <div className="section-heading">
            <p>My academic path</p>
            <h2>
                Education <span>Journey</span>
            </h2>
        </div>

        <div className="mx-auto max-w-4xl">
            <div className="relative ml-3 border-l border-background-secondary/30 pl-8 sm:ml-8 sm:pl-12">
                {educationData.map((item, index) => (
                    <motion.div
                        key={item.degree}
                        initial={{ opacity: 0, x: 25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: index * 0.08 }}
                        className="relative mb-8 last:mb-0"
                    >
                        <div className="absolute left-[-2.1rem] top-5 flex h-9 w-9 items-center justify-center rounded-full border border-background-secondary/40 bg-slate-950 text-background-secondary shadow-lg shadow-background-secondary/10 sm:left-[-3.1rem]">
                            <FaGraduationCap size={15} />
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/2.5 p-5 transition hover:border-background-secondary/30 hover:bg-white/4 sm:p-6">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <h3 className="font-bold text-white">{item.degree}</h3>
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${item.current
                                        ? "bg-background-secondary/10 text-background-secondary"
                                        : "bg-white/5 text-slate-400"
                                        }`}
                                >
                                    {item.year}
                                </span>
                            </div>
                            <p className="mt-2 text-sm leading-6 text-slate-400">
                                {item.institution}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export default EducationTimeline;
