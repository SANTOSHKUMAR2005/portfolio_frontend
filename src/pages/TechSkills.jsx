import React from "react";
import { motion } from "motion/react";
import { FaGithub, FaGitAlt, FaJava, FaJsSquare, FaPython, FaReact, FaHtml5, FaCss3Alt, FaFileExcel } from "react-icons/fa";
import { SiMysql, SiNumpy, SiOpencv, SiPandas, SiPostman, SiSpringboot, SiSpringsecurity, SiTailwindcss, SiCloudinary, SiScikitlearn, SiKeras, SiLangchain } from "react-icons/si";



const iconMap = { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, SiTailwindcss, FaJava, FaPython, SiSpringboot, SiSpringsecurity, SiMysql, FaGithub, FaGitAlt, FaFileExcel , SiPostman, SiOpencv, SiPandas, SiNumpy, SiCloudinary, SiScikitlearn, SiKeras, SiLangchain };

const TechSkills = () => {
    const groups = [
        {
            name: "Frontend",
            description: "Interfaces that are responsive, accessible and easy to use.",
        },
        {
            name: "Backend",
            description: "APIs and business logic built for security and maintainability.",
        },
        {
            name: "Database",
            description: "Relational data modelling, persistence and query design.",
        },
        {
            name: "AI & Machine Learning",
            description: "Practical Python tools for data and computer vision work.",
        },
        {
            name: "Tools",
            description: "Development, testing and version-control workflow.",
        },
        {
            name: "Cloud",
            description: "Cloud-hosted services and deployment fundamentals.",
        },
    ];

    const techskillsData = [

        // --- FRONTEND ---
        {
            id: 1,
            name: "HTML",
            logo: "FaHtml5",
            description: "Define the skeleton of Application.",
            category: "Frontend"
        },
        {
            id: 2,
            name: "CSS",
            logo: "FaCss3Alt",
            description: "Creative UI Design.",
            category: "Frontend"
        },
        {
            id: 3,
            name: "JavaScript",
            logo: "FaJsSquare",
            description: "Writing core logic for dynamic, responsive, and high-performance web applications.",
            category: "Frontend"
        },
        {
            id: 4,
            name: "React.js",
            logo: "FaReact",
            description: "Building modern, scalable, and interactive component-based user interfaces.",
            category: "Frontend"
        },
        {
            id: 5,
            name: "Tailwind CSS",
            logo: "SiTailwindcss",
            description: "Rapid utility-first styling for mobile-first, responsive web applications.",
            category: "Frontend"
        },

        // --- BACKEND ---
        {
            id: 6,
            name: "Java",
            logo: "FaJava",
            description: "Developing robust, enterprise-grade, and object-oriented backend applications.",
            category: "Backend"
        },
        {
            id: 7,
            name: "Spring Boot",
            logo: "SiSpringboot",
            description: "Designing high-performance RESTful APIs and production-ready microservices.",
            category: "Backend"
        },
        {
            id: 8,
            name: "Spring Security",
            logo: "SiSpringsecurity",
            description: "Implementing authentication, authorization, and robust API protection.",
            category: "Backend"
        },
        {
            id: 9,
            name: "Python",
            logo: "FaPython",
            description: "Writing clean backend scripts, automation tasks, and machine learning models.",
            category: "Backend"
        },


        // --- DATABASE & CLOUD ---
        {
            id: 10,
            name: "MySQL",
            logo: "SiMysql",
            description: "Structuring relational databases, optimizing complex queries, and maintaining data integrity.",
            category: "Database"
        },
        
        {
            id: 11,
            name: "Aiven / Cloud Services",
            logo: "FaCloud",
            description: "Deploying and managing cloud-hosted database instances and backend services.",
            category: "Cloud"
        },
        {
            id: 12,
            name: "Cloudinary",
            logo: "SiCloudinary",
            description: "Storing Blob/Object type file.",
            category: "Cloud"
        },

        // --- AI & MACHINE LEARNING ---
        
        {
            id: 13,
            name: "NumPy",
            logo: "SiNumpy",
            description: "Performing high-performance multi-dimensional array manipulation and mathematical operations.",
            category: "AI & Machine Learning"
        },
        {
            id: 14,
            name: "Pandas",
            logo: "SiPandas",
            description: "Data analysis, structured data parsing, and efficient dataset preparation.",
            category: "AI & Machine Learning"
        },
        {
            id: 15,
            name: "Scikit Learn",
            logo: "SiScikitlearn",
            description: "Making Machine Learning models.",
            category: "AI & Machine Learning"
        },
        {
            id: 16,
            name: "TensorFlow/Keras",
            logo: "SiKeras",
            description: "Making Deep Learning models.",
            category: "AI & Machine Learning"
        },
        {
            id: 17,
            name: "Langchain",
            logo: "SiLangchain",
            description: "Making Generative AI solution.",
            category: "AI & Machine Learning"
        },

        // --- TOOLS & DEPLOYMENT ---
        {
            id: 18,
            name: "Git",
            logo: "FaGitAlt",
            description: "Distributed version control, tracking changes, branching strategies, and collaboration.",
            category: "Tools"
        },
        {
            id: 19,
            name: "GitHub",
            logo: "FaGithub",
            description: "Remote repository hosting, CI/CD integrations, code reviews, and automated deployments.",
            category: "Tools"
        },
        {
            id: 20,
            name: "Postman",
            logo: "SiPostman",
            description: "API testing, endpoint verification, mock server setups, and documentation generation.",
            category: "Tools"
        },
        {
            id: 21,
            name: "MS Excel",
            logo: "FaFileExcel",
            description: "Data analysis.",
            category: "Tools"
        }
    ];

    return (
        <section id="skills" className="section-shell bg-slate-950/30">
            <div className="section-heading">
                <p>What I work with</p>
                <h2>
                    Technical <span>Stack</span>
                </h2>
            </div>

            <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
                {groups.map((group, groupIndex) => {
                    const skills = techskillsData.filter(
                        (skill) => skill.category === group.name
                    );

                    if (!skills.length) return null;

                    return (
                        <motion.div
                            key={group.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ delay: groupIndex * 0.05 }}
                            className="rounded-2xl border border-white/10 bg-white/2.5 p-6"
                        >
                            <div className="mb-5">
                                <h3 className="text-lg font-bold text-white">{group.name}</h3>
                                <p className="mt-1 text-sm leading-6 text-slate-500">
                                    {group.description}
                                </p>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                {skills.map((skill) => {
                                    const Icon = iconMap[skill.logo];
                                    return (
                                        <div
                                            key={skill.id}
                                            className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/40 p-3 transition hover:border-background-secondary/30"
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-xl text-background-secondary">
                                                {Icon ? <Icon /> : <span>•</span>}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-white">
                                                    {skill.name}
                                                </p>
                                                <p className="mt-0.5 text-xs text-slate-500">
                                                    {skill.category}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* <Languages /> */}
        </section>
    );
};

export default TechSkills;
