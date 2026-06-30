'use client'

import {cn} from "@/lib/utils"
import Link from "next/link"
import {useActiveSection} from "@/lib/hooks/useActiveSession"
import React from "react";
import {Menu, X} from "lucide-react";

const links = [
    {label: "About", href: "#about", id: "about"},
    {label: "Skills", href: "#skills", id: "skills"},
    {label: "Projects", href: "#projects", id: "projects"},
    {label: "Contact", href: "#contact", id: "contact"},
]

export const Header = () => {
    const activeSection = useActiveSection()
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur">
            <div
                className="max-w-6xl uppercase font-mono tracking-widest text-foreground mx-auto flex items-center justify-between py-6 px-4">
                <Link href="/#home" className="text-sm sm:text-base lg:text-lg">
                    Wandile Mlambo
                </Link>

                {/*Desktop view*/}
                <nav className="hidden md:flex space-x-8 text-sm sm:text-base">
                    {links.map(({label, href, id}) => (
                        <Link
                            key={id}
                            href={href}
                            className={cn(
                                "text-neutral-500 transition-colors duration-150 font-medium",
                                activeSection === id ?
                                    "text-neutral-900 font-semibold" : ""
                            )}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                {/*Mobile View*/}
                <nav className="md:hidden">
                    {/* Hamburger Toggle Action Button */}
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Navigation Menu"
                        className="flex items-center justify-center p-2 text-foreground focus:outline-none transition-colors cursor-pointer"
                    >
                        {isOpen ? (
                            <X className="transition-transform duration-200" size={22} strokeWidth={1.5}
                            />
                        ) : (
                            <Menu className="transition-transform duration-200" size={22} strokeWidth={1.5}
                            />
                        )}
                    </button>

                    {isOpen && (<div
                        className={`md:hidden overflow-hidden transition-all duration-300 ${
                            isOpen ? "max-h-96 border-t border-border" : "max-h-0"
                        }`}
                    >
                        <ul className="flex flex-col py-2">
                            {links.map(({href, id, label}) => (
                                <li key={id}>
                                    <a
                                        href={href}
                                        onClick={() => setIsOpen(false)}
                                        className="block px-4 py-3 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>)}
                </nav>
            </div>
        </header>
    )
}
