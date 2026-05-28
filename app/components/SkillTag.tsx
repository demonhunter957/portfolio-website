interface SkillTagProps {
  name: string;
}

export function SkillTag({ name }: SkillTagProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-800 bg-surface px-4 py-1.5 text-sm font-medium text-secondary transition-colors duration-300 hover:border-accent/50 hover:text-accent md:hover:scale-105">
      {name}
    </span>
  );
}
