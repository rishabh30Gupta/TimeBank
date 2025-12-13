interface StatCardProps {
  value: string;
  label: string;
  delay?: number;
}

export const StatCard = ({ value, label, delay = 0 }: StatCardProps) => {
  return (
    <div 
      className="opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="text-3xl font-semibold text-foreground tabular-nums">
        {value}
      </div>
      <div className="text-sm text-muted-foreground mt-1">
        {label}
      </div>
    </div>
  );
};
