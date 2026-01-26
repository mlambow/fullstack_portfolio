
export const Skills = () => {
  return (
    <section id="skills" className="pb-26">
        <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-light mb-2">Skills</h3>
            <p className="text-lg md:text-xl font-light mb-6">My skill set reflects hands-on experience building, maintaining and scaling real-world web applications.</p>

            <div className="flex flex-col max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div>
                        <h3 className="text-xl font-light">Frontend</h3>
                        <ul className="list-disc pl-5 md:pl-4 font-light">
                            <li>JavaScript (ES6+)</li>
                            <li>React</li>
                            <li>HTML5 & CSS3</li>
                            <li>Tailwind CSS</li>
                            <li>Responsive & Accessible UI Design</li>
                        </ul>
                    </div>

                    <div className="mt-4 md:mt-0">
                        <h3 className="text-xl font-light">Backend</h3>
                        <ul className="list-disc pl-5 md:pl-4 font-light">
                            <li>Python</li>
                            <li>Fast API</li>
                            <li>Django</li>
                            <li>RESTful API Design</li>
                            <li>Authentication & Authorization</li>
                        </ul>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-0 md:mt-6 py-4">
                    <div>
                        <h3 className="text-xl font-light">Databases</h3>
                        <ul className="list-disc pl-5 md:pl-4 font-light">
                            <li>PostgreSQL</li>
                            <li>MongoDB</li>
                            <li>Firebase</li>
                            <li>Database Modeling & Query Optimization</li>
                        </ul>
                    </div>

                    <div className="mt-4 md:mt-0">
                    <h3 className="text-xl font-light">DevOps & Automation</h3>
                        <ul className="list-disc pl-5 md:pl-4 font-light">
                            <li>Docker</li>
                            <li>GitHub Actions</li>
                            <li>CI/CD Pipelines</li>
                            <li>Jenkins (Basics)</li>
                        </ul>
                    </div>

                    <div className="mt-4 md:mt-0">
                    <h3 className="text-xl font-light">Tools & Collaboration</h3>
                        <ul className="list-disc pl-5 md:pl-4 font-light">
                            <li>Git & GitHub</li>
                            <li>Code Reviews</li>
                            <li>Debugging & Testing</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
