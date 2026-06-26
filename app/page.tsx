import {About} from "@/components/About";
import {Hero} from "@/components/Hero";
import {Skills} from "@/components/Skills";
import {Projects} from "@/components/Projects"
import {Header} from "@/components/Header";
import {Contact} from "@/components/Contact";

const portfolioProjects = [
    {
        id: "p1",
        title: "FlowState Task Engine",
        description: "An enterprise workflow task management system featuring custom role-based access control, strict state-machine validation, and a high-performance workspace interface.",
        tags: ["react", "fastapi", "postgresql", "docker"],
        githubUrl: "https://github.com/yourusername/flowstate-engine",
        liveUrl: "https://flowstate.yourdomain.com",
        isHot: true // Renders the subtle emerald active pulse node
    },
    {
        id: "p2",
        title: "VoxLib PDF Audio Converter",
        description: "A private, 100% offline text-to-speech rendering utility. Built to extract layered document data into cleanly paced audio sequences without internet dependencies or cloud processing telemetry.",
        tags: ["python", "react", "tailwind_css", "local_tts"],
        githubUrl: "https://github.com/yourusername/voxlib-converter",
        isHot: true
    },
    {
        id: "p3",
        title: "Orion Cache Layer",
        description: "A secondary, lightweight analytical middleware built to intercept high-volume web service pools and cache metrics directly into a sharded data container layout.",
        tags: ["django", "postgres", "redis", "ci_cd"],
        githubUrl: "https://github.com/yourusername/orion-cache",
        liveUrl: "https://orion.yourdomain.com",
        isHot: false
    },
    {
        id: "p4",
        title: "Aura Metrics Dashboard",
        description: "A stark, low-telemetry visitor analytics tracking script and ingestion backend designed to run efficiently on resource-constrained containers without tracking user personal cookies.",
        tags: ["react", "fastapi", "mongodb", "docker"],
        githubUrl: "https://github.com/yourusername/aura-metrics",
        isHot: false
    }
];

export default function Home() {
    return (
        <main className='font-mono'>
            <Header/>
            <Hero/>
            <About/>
            <Skills/>
            <Projects projects={portfolioProjects}/>
            <Contact/>
        </main>
    );
}
