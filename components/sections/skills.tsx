"use client";

import { motion } from "framer-motion";
import {
    SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss, SiVite, SiNodedotjs,
    SiPostgresql, SiGraphql, SiDocker, SiAmazon, SiGit, SiFigma, SiPython, SiGo, SiRust
} from "react-icons/si";

const skills = [
    { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
    { name: "CSS3", icon: SiCss3, color: "#1572B6" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Vite", icon: SiVite, color: "#646CFF" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "AWS", icon: SiAmazon, color: "#FF9900" },
    { name: "Git", icon: SiGit, color: "#F05032" },
    { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "Go", icon: SiGo, color: "#00ADD8" },
    { name: "Rust", icon: SiRust, color: "#000000" },
];

const duplicatedSkills = [...skills, ...skills];

export default function Skills() {
    return (
        <section className=" max-w-sm mx-auto md:max-w-4xl">
            <div className="relative w-full max-w-full"
                style={{
                    maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                    WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
                }}
            >
                {/* Animated Carousel */}
                <motion.div
                    className="flex gap-6 py-6 w-max"
                    animate={{
                        x: [0, -1620],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                >
                    {duplicatedSkills.map((skill, index) => (
                        <motion.div
                            key={index}
                            className="flex-shrink-0 group"
                            whileHover={{ scale: 1.1, y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="relative">
                                {/* Glow Effect */}
                                <div
                                    className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                                    style={{ backgroundColor: skill.color }}
                                />

                                {/* Card */}
                                <div className="relative h-24 w-24 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg flex flex-col items-center justify-center gap-2 transition-all duration-300 group-hover:border-transparent">
                                    <skill.icon
                                        className="h-10 w-10 transition-transform duration-300 group-hover:scale-110"
                                        style={{ color: skill.color }}
                                    />
                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                        {skill.name}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Second Row - Reverse Direction */}
            <div className="relative w-full py-6 max-w-full"
                style={{
                    maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                    WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
                }}
            >
                <motion.div
                    className="flex gap-6 w-max"
                    animate={{
                        x: [-1620, 0],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                >
                    {duplicatedSkills.map((skill, index) => (
                        <motion.div
                            key={`reverse-${index}`}
                            className="flex-shrink-0 group"
                            whileHover={{ scale: 1.1, y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="relative">
                                <div
                                    className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                                    style={{ backgroundColor: skill.color }}
                                />

                                <div className="relative h-24 w-24 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg flex flex-col items-center justify-center gap-2 transition-all duration-300 group-hover:border-transparent">
                                    <skill.icon
                                        className="h-10 w-10 transition-transform duration-300 group-hover:scale-110"
                                        style={{ color: skill.color }}
                                    />
                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                        {skill.name}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}