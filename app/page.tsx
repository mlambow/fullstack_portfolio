import {About} from "@/components/About";
import {Hero} from "@/components/Hero";
import {Skills} from "@/components/Skills";
import {Projects} from "@/components/Projects"
import {Header} from "@/components/Header";
import {Contact} from "@/components/Contact";
import portfolioProjects from "@/config/projects";

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
