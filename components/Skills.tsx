import SkillSection from "@/components/SkillSection";
import skills from "@/config/skills";

export const Skills = () => {
    return (
        <section id="skills" className="pt-8 pb-12 transition-colors duration-200">
            <div className="max-w-6xl mx-auto px-4">
                {/* Section Header */}
                <div className="pb-1">
                  <span
                      className="text-xs font-mono font-normal uppercase tracking-widest text-muted-foreground block mb-2">
                    {"// Technical Competency"}
                  </span>
                    <h2 className="md:text-3xl text-xl font-normal tracking-tight text-foreground">
                        Capabilities & Stack
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground font-light max-w-xl mt-1.5 leading-relaxed">
                        Hands-on proficiency architecture building, maintaining, and scaling decentralized or
                        cloud-hosted web utilities.
                    </p>
                </div>

                {/* The Grid Workspace */}
                <div className="py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-5">
                    {skills.map((section) => (
                        <SkillSection key={section.title} title={section.title}>
                            {section.items.map((item) => (
                                <li
                                    key={item.label}
                                    className={item.muted ? "text-foreground font-thin text-xs md:text-sm" : ""}
                                >
                                    {item.label}

                                    {item.tag && (
                                        <span className="ml-3 text-[10px] text-muted-foreground/80 font-mono">
                                            {item.tag}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </SkillSection>
                    ))}
                </div>
            </div>
        </section>
    );
};