import { cn } from "@/lib/utils";

interface ChronoRavenProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const ChronoRaven = ({ className, size = "md" }: ChronoRavenProps) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn(sizeClasses[size], className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Abstract geometric raven - minimal, symbolic */}
      <path
        d="M16 4L28 16L24 20L16 12L8 20L4 16L16 4Z"
        fill="currentColor"
        fillOpacity="0.9"
      />
      <path
        d="M16 12L24 20L20 28H12L8 20L16 12Z"
        fill="currentColor"
        fillOpacity="0.6"
      />
      <circle
        cx="16"
        cy="16"
        r="2"
        fill="currentColor"
        fillOpacity="0.3"
      />
    </svg>
  );
};
