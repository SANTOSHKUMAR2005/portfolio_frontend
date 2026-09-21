import React from "react";
import { motion } from "motion/react";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import ProfilePic from "../assets/santosh.png";

const strengths = [
    "REST API development with Spring Boot",
    "Authentication and authorization with Spring Security & JWT",
    "React-based responsive interfaces",
    "MySQL database design and JPA",
    "Clean code, DSA and problem solving",
    "Deployment and cloud-ready applications",
    "AI/ML and Generative AI solutions with LLMs, LangChain, and vector databases",
];

const About = () => (
    <section id="about" className="section-shell">
        <div className="section-heading">
            <p>Get to know me</p>
            <h2>
                About <span>Me</span>
            </h2>
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <motion.div
                initial={{ opacity: 0, x: -35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                className="flex justify-center"
            >
                <div className="relative">
                    <div className="absolute -inset-5 rounded-4xl border border-background-secondary/20 rotate-3" />
                    <div className="relative h-96 w-[20rem] overflow-hidden rounded-4xl border border-white/10 bg-slate-900 shadow-2xl sm:h-112 sm:w-92">
                        <img
                            src={ProfilePic}
                            alt="Santosh Kumar"
                            className="h-full w-full object-cover object-top"
                        />
                    </div>
                    <div className="absolute -bottom-5 -left-5 rounded-2xl border border-white/10 bg-slate-900/95 px-5 py-4 shadow-xl">
                        <p className="text-xs uppercase tracking-widest text-slate-500">
                            Education
                        </p>
                        <p className="mt-1 font-bold text-white">B.Tech • NIT Patna</p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
            >
                <p className="text-lg font-semibold leading-8 text-white sm:text-xl">
                    I&apos;m a Software Developer who enjoys turning ideas into
                    dependable web products.
                </p>

                <p className="mt-5 leading-8 text-slate-400">
                    I&apos;m currently pursuing B.Tech in Electronics and Communication
                    Engineering at NIT Patna. My strongest area is backend development
                    with Java and Spring Boot, while React helps me build responsive and
                    intuitive frontends.
                </p>

                <p className="mt-4 leading-8 text-slate-400">
                    I focus on practical engineering: secure APIs, well-structured
                    databases, maintainable components and applications that can be
                    deployed and used in real-world scenarios. Alongside my full-stack expertise, I develop AI/ML and Generative AI solutions. I have hands-on experience integrating large language models, LangChain, and vector databases to build smarter, data-driven applications.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {strengths.map((item) => (
                        <div
                            key={item}
                            className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/2.5 p-3"
                        >
                            <FaCheckCircle className="mt-1 shrink-0 text-sm text-background-secondary" />
                            <span className="text-sm leading-6 text-slate-300">{item}</span>
                        </div>
                    ))}
                </div>

                <a
                    href="#contact"
                    className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-background-secondary transition hover:gap-3"
                >
                    Let&apos;s work together <FaArrowRight />
                </a>
            </motion.div>
        </div>
    </section>
);

export default About;
