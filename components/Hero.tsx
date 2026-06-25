import Link from "next/link";

export const Hero = () => {
    return (
        <section id="home" className="pt-32 mb-24 bg-background text-foreground transition-colors duration-200">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 gap-16 items-center overflow-auto md:mt-12">
                <div>

                    {/* THE SINGLE ACCENT HIGHLIGHT: Used exactly once to signal intent cleanly */}
                    <div
                        className="inline-flex items-center gap-2 mb-6 text-xs font-mono tracking-widest uppercase text-muted-foreground">
                        <span className="relative flex h-2 w-2">
                            <span
                                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        {'// production_node: active'}
                    </div>

                    {/* STARK MONOCHROME TYPOGRAPHY */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground leading-tight">
                        FullStack Software Developer
                    </h1>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-normal tracking-tight text-foreground/80 mt-1 mb-4">
                        Building scalable web applications with React & Python
                    </h2>

                    <p className="text-sm md:text-lg text-foreground/70 max-w-xl mb-4 font-light leading-relaxed tracking-wide">
                        3+ years of experience developing production-ready applications using React, FastAPI, and
                        Django.
                        Comfortable across frontend, backend, and databases — and continuously leveling up in DevOps &
                        CI/CD.
                    </p>

                    {/* MINIMALIST LOWERCASE TAG ARRAY */}
                    <div
                        className="flex w-full flex-wrap justify-start gap-x-4 gap-y-2 mb-6 text-xs font-mono text-muted-foreground/80">
                        <span>[react]</span>
                        <span>[fastapi]</span>
                        <span>[django]</span>
                        <span>[tailwind_css]</span>
                        <span>[css & bootstrap]</span>
                        <span>[mongodb]</span>
                        <span>[postgres]</span>
                        <span>[docker]</span>
                        <span>[ci_cd]</span>
                    </div>

                    {/* SOLID, CLEAN BUTTON INTERACTIONS */}
                    <div className="flex space-x-6 items-center">
                        <Link
                            href="#contact"
                            className="px-6 py-3 font-normal bg-black text-white rounded-full hover:bg-white hover:border hover:border-black hover:text-black transition-colors duration-200 text-xs md:text-sm"
                        >
                            Contact Me
                        </Link>
                        <Link
                            href="#projects"
                            className="group px-6 py-2.5 text-xs md:text-sm font-normal tracking-tight border border-muted-foreground rounded-full text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1"
                        >
                            View Projects
                            <span
                                className="inline-block transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};