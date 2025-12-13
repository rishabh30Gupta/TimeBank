import { Button } from "./ui/button";
import { Clock, User } from "lucide-react";

interface IOUCardProps {
  id: string;
  description: string;
  skillPoints: number;
  creator: string;
  reputation: number;
  deadline: string;
  category: "design" | "development" | "writing" | "marketing" | "other";
  onAccept?: () => void;
}

const categoryColors = {
  design: "bg-primary/60",
  development: "bg-success/60",
  writing: "bg-warning/60",
  marketing: "bg-secondary-foreground/60",
  other: "bg-muted-foreground/60",
};

export const IOUCard = ({
  description,
  skillPoints,
  creator,
  reputation,
  deadline,
  category,
  onAccept,
}: IOUCardProps) => {
  return (
    <div className="group bg-card border border-border/40 rounded-lg p-5 transition-all duration-100 hover:border-border/60 hover:bg-muted/30">
      {/* Category indicator */}
      <div className="flex items-start gap-3">
        <div className={`w-1 h-full min-h-[80px] rounded-full ${categoryColors[category]}`} />
        
        <div className="flex-1 min-w-0">
          {/* Description */}
          <p className="text-foreground font-medium leading-relaxed mb-3 line-clamp-2">
            {description}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="font-medium text-foreground tabular-nums">
              {skillPoints} SP
            </span>
            
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              {creator}
              <span className="text-muted-foreground/60">•</span>
              <span className="text-success">{reputation}%</span>
            </span>

            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {deadline}
            </span>
          </div>

          {/* Action */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onAccept}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-100"
          >
            Accept IOU
          </Button>
        </div>
      </div>
    </div>
  );
};
