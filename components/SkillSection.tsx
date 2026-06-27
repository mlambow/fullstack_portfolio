interface SkillSectionProps {
    title: string;
    className?: string;
    children: React.ReactNode;
}

export default function SkillSection({title, className = "", children}: SkillSectionProps) {
    return (
        <div className={`space-y-4 ${className}`}>
            <h3 className="text-xs font-mono tracking-wider uppercase text-muted-foreground pb-2 border-b border-red-700">
                {title}
            </h3>

            <ul className="space-y-1.5 font-light text-sm text-foreground/90">
                {children}
            </ul>
        </div>
    );
}