import { useState } from "react";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";

type TabType = "created" | "accepted" | "completed";

interface IOU {
  id: string;
  description: string;
  skillPoints: number;
  deadline: string;
  status: "active" | "pending" | "completed" | "overdue";
}

const mockCreatedIOUs: IOU[] = [
  { id: "1", description: "Design landing page mockups", skillPoints: 150, deadline: "Dec 20", status: "active" },
  { id: "2", description: "Write technical documentation", skillPoints: 80, deadline: "Dec 18", status: "pending" },
];

const mockAcceptedIOUs: IOU[] = [
  { id: "3", description: "Build authentication system", skillPoints: 200, deadline: "Dec 22", status: "active" },
  { id: "4", description: "Create social media assets", skillPoints: 100, deadline: "Dec 15", status: "overdue" },
];

const mockCompletedIOUs: IOU[] = [
  { id: "5", description: "Database schema design", skillPoints: 180, deadline: "Dec 10", status: "completed" },
  { id: "6", description: "API integration", skillPoints: 220, deadline: "Dec 8", status: "completed" },
];

const statusConfig = {
  active: { label: "Active", className: "text-primary" },
  pending: { label: "Pending", className: "text-warning" },
  completed: { label: "Completed", className: "text-success" },
  overdue: { label: "Overdue", className: "text-destructive" },
};

const MyIOUs = () => {
  const [activeTab, setActiveTab] = useState<TabType>("created");

  const tabs = [
    { id: "created" as const, label: "Created", count: mockCreatedIOUs.length },
    { id: "accepted" as const, label: "Accepted", count: mockAcceptedIOUs.length },
    { id: "completed" as const, label: "Completed", count: mockCompletedIOUs.length },
  ];

  const getCurrentIOUs = () => {
    switch (activeTab) {
      case "created":
        return mockCreatedIOUs;
      case "accepted":
        return mockAcceptedIOUs;
      case "completed":
        return mockCompletedIOUs;
    }
  };

  const getStatusIcon = (status: IOU["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "overdue":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen gradient-subtle">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-2xl font-semibold text-foreground mb-2 opacity-0 animate-fade-in-up">
          My IOUs
        </h1>
        <p className="text-muted-foreground mb-10 opacity-0 animate-fade-in-up animate-delay-100">
          Manage your work promises and track their status.
        </p>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-border/30 mb-8 opacity-0 animate-fade-in-up animate-delay-200" style={{ animationFillMode: 'forwards' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-medium transition-colors duration-100 border-b-2 -mb-px ${
                activeTab === tab.id
                  ? "text-foreground border-foreground"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              {tab.label}
              <span className="ml-2 text-muted-foreground">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* IOU List */}
        <div className="space-y-1 opacity-0 animate-fade-in-up animate-delay-300" style={{ animationFillMode: 'forwards' }}>
          {getCurrentIOUs().map((iou) => (
            <div
              key={iou.id}
              className="group flex items-center justify-between py-4 px-4 -mx-4 rounded-lg transition-colors duration-100 hover:bg-muted/30"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {getStatusIcon(iou.status)}
                <span className="text-foreground truncate">{iou.description}</span>
              </div>

              <div className="flex items-center gap-8 text-sm">
                <span className="text-foreground font-medium tabular-nums">
                  {iou.skillPoints} SP
                </span>
                <span className="text-muted-foreground w-16">{iou.deadline}</span>
                <span className={`w-20 ${statusConfig[iou.status].className}`}>
                  {statusConfig[iou.status].label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {getCurrentIOUs().length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No IOUs in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyIOUs;
