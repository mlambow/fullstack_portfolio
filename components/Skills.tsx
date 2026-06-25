export const Skills = () => {
    return (
        <section id="skills" className="pt-8 pb-12 transition-colors duration-200">
            <div className="max-w-6xl mx-auto px-4">
                {/* Section Header */}
                <div className="pb-1">
                  <span className="text-xs font-mono font-normal uppercase tracking-widest text-muted-foreground block mb-2">
                    {"// Technical Competency"}
                  </span>
                    <h2 className="md:text-3xl text-xl font-normal tracking-tight text-foreground">
                        Capabilities & Stack
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground font-light max-w-xl mt-1.5 leading-relaxed">
                        Hands-on proficiency architecture building, maintaining, and scaling decentralized or cloud-hosted web utilities.
                    </p>
                </div>

                {/* The Grid Workspace */}
                <div className="py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4">

                    {/* 1. FRONTEND BUILD LAYERS */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-mono tracking-wider uppercase text-muted-foreground pb-2 border-b border-red-700">
                            01 / Frontend Core
                        </h3>
                        <ul className="space-y-1.5 font-light text-sm  text-foreground/90">
                            <li className="flex items-center gap-2">React <span className="text-[10px] text-muted-foreground/50">[next.js]</span></li>
                            <li>JavaScript <span className="text-[10px] text-muted-foreground/50 font-mono">[ES6+]</span></li>
                            <li>Tailwind CSS</li>
                            <li>CSS & Bootstrap</li>
                            <li className="text-muted-foreground font-thin text-xs md:text-sm">Responsive & Accessible UI Systems</li>
                        </ul>
                    </div>

                    {/* 2. BACKEND LAYERS */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-mono tracking-wider uppercase text-muted-foreground pb-2 border-b border-red-700">
                            02 / Backend Engines
                        </h3>
                        <ul className="space-y-1.5 font-light text-sm text-foreground/90">
                            <li>Python</li>
                            <li>FastAPI</li>
                            <li>Django Framework</li>
                            <li className="text-muted-foreground font-thin text-xs md:text-sm">RESTful API Design & Architecture</li>
                            <li className="text-muted-foreground font-thin text-xs md:text-sm">RBAC Authentication Models</li>
                        </ul>
                    </div>

                    {/* 3. PERSISTENCE LAYER */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-mono tracking-wider uppercase text-muted-foreground pb-2 border-b border-red-700">
                            03 / Database Storage
                        </h3>
                        <ul className="space-y-1.5 font-light text-sm text-foreground/90">
                            <li>PostgreSQL</li>
                            <li>MongoDB</li>
                            <li>Firebase Storage</li>
                            <li className="text-muted-foreground font-thin text-xs md:text-sm">Data Modeling & Index Optimization</li>
                        </ul>
                    </div>

                    {/* 4. ENVIRONMENT & RUNTIMES */}
                    <div className="space-y-4 mt-4">
                        <h3 className="text-xs font-mono tracking-wider uppercase text-muted-foreground pb-2 border-b border-red-700">
                            04 / DevOps & Pipelines
                        </h3>
                        <ul className="space-y-1.5 font-light text-sm text-foreground/90">
                            <li>Docker <span className="text-[10px] text-muted-foreground/60 font-mono">[containers]</span></li>
                            <li>GitHub Actions</li>
                            <li>CI/CD Automation</li>
                            <li className="text-muted-foreground/50 text-xs md:text-sm">Jenkins Systems (Fundamentals)</li>
                        </ul>
                    </div>

                    {/* 5. PIPELINES & WORKFLOWS */}
                    <div className="space-y-4 md:col-span-2 lg:col-span-1 mt-4">
                        <h3 className="text-xs font-mono tracking-wider uppercase text-muted-foreground pb-2 border-b border-red-700">
                            05 / Workflows
                        </h3>
                        <ul className="space-y-1.5 font-light text-sm text-foreground/90">
                            <li>Git Version Control</li>
                            <li className="text-muted-foreground font-thin text-xs md:text-sm">Asynchronous Code Review Process</li>
                            <li className="text-muted-foreground font-thin text-xs md:text-sm">Unit Testing & System Debugging</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};