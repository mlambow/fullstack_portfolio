'use client'

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { label: 'About', href: '/#about'},
    { label: 'Skills', href: '/#skills'},
    { label: 'Projects', href: '/#projects'},
    { label: 'Contact', href: '/#contact'}
]

export const Header = () => {
    const pathname = usePathname()
    return (
        <header className='w-full py-6 mb-10 z-10 fixed'>
            <div className='max-w-6xl mx-auto flex items-center justify-between'>
                <Link href='/' className='text-lg font-semibold'>Wandile Mlambo</Link>
                <nav className='hidden md:flex space-x-8 text-base text-neutral-600'>
                    {links.map(({label, href}) => (
                        <Link 
                            key={label}
                            href={href}
                            className={cn(pathname === href && `font-semibold`)}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    )
}
