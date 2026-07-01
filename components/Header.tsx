'use client'

import {cn} from "@/lib/utils"
import Link from "next/link"
import {useActiveSection} from "@/lib/hooks/useActiveSection"
import React from "react";
import {Briefcase, LucideMail, Menu, UserIcon, X, Zap} from "lucide-react";

const links = [
    {label: "About", href: "#about", id: "about", icon: UserIcon},
    {label: "Skills", href: "#skills", id: "skills", icon: Zap},
    {label: "Projects", href: "#projects", id: "projects", icon: Briefcase},
    {label: "Contact", href: "#contact", id: "contact", icon: LucideMail},
]

export const Header = () => {
    const activeSection = useActiveSection()
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur">
            <div
                className="max-w-6xl uppercase font-mono tracking-widest text-foreground mx-auto flex items-center justify-between py-6 px-4 relative">
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
                            <span>{label}</span>
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

                    {isOpen && (
                        <>
                            <div
                                onClick={() => setIsOpen(false)}
                                className="fixed right-0 z-50 w-full h-140 flex flex-col items-center justify-center backdrop-blur-xl p-4 animate-[fadeIn_0.2s_ease-out] rounded-b-2xl bg-background"
                            >
                                {/* Modal Card Content */}
                                <ul className="flex flex-col space-y-1">
                                    {links.map(({label, href, id, icon: Icon}) => (
                                        <li key={id}>
                                            <Link
                                                href={href}
                                                onClick={() => setIsOpen(false)}
                                                className={cn(
                                                    "flex items-center space-x-4 w-full px-4 py-3 rounded-xl text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-150 font-medium text-sm",
                                                    activeSection === id && "bg-neutral-50 dark:bg-neutral-800 text-neutral-900 font-semibold"
                                                )}
                                            >
                                                <Icon size={18} className="text-neutral-400"/>
                                                <span>{label}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}
