import Link from "next/link"
import { Badge } from "./ui/badge"

export const Hero = () => {
  return (
    <section id="home" className="pt-32">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 gap-16 items-center overflow-auto md:mt-12">

            <div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight">
                    FullStack Software Developer<br/> 
                </h2>
                <h3 className="text-xl md:text-3xl lg:text-4xl font-light tracking-tight mb-2">
                    Building scalable web applications with React & Python
                </h3>

                <p className="text-sm md:text-lg text-neutral-600 max-w-xl mb-8 font-thin">
                    3+ years of experience developing production-ready applications using React, FastAPI and Django. Comfortable across frontend, backend and databases — and continuously leveling up in DevOps & CI/CD.
                </p>

                {/* <-----BADGES-------> */}
                <div className="flex w-full flex-wrap justify-start gap-2 mb-6">
                    <Badge className="font-light">React</Badge>
                    <Badge variant="secondary" className="font-thin">FastAPI</Badge>
                    <Badge variant="outline" className="font-thin">Tailwind CSS</Badge>
                    <Badge variant="secondary" className="font-thin">Django</Badge>
                    <Badge className="font-thin">MongoDB</Badge>
                    <Badge variant="secondary" className="font-thin">Postgres</Badge>
                    <Badge variant="outline" className="font-thin">CI/CD</Badge>
                    <Badge variant="secondary" className="font-thin">Docker</Badge>
                </div>

                {/* <-----BUTTONS-------> */}
                <div className="flex space-x-4">
                    <Link href="#contact" 
                        className="px-6 py-2 font-light text-white bg-neutral-900 border border-neutral-900 rounded-4xl hover:bg-white hover:text-neutral-900 transition text-xs md:text-sm lg:text-base">
                        Contact Me
                    </Link>
                    <Link href="#projects" 
                        className="px-6 py-2 font-light border border-neutral-300 rounded-4xl hover:border-neutral-400 hover:bg-neutral-300 transition text-xs md:text-md lg:text-base">
                        View Projects
                    </Link>
                </div>
            </div>
        </div>
    </section>
  )
}
