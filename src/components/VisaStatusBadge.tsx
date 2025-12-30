import { CheckCircle, Clock, XCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type VisaStatus = "Pending" | "Approved" | "Rejected" | "Expired";

interface VisaStatusBadgeProps {
  status: VisaStatus;
  size?: "sm" | "md" | "lg";
}

const statusConfig: Record<VisaStatus, {
  label: string;
  icon: typeof CheckCircle;
  className: string;
}> = {
  Approved: {
    label: "Approuvé",
    icon: CheckCircle,
    className: "gov-badge-approved",
  },
  Pending: {
    label: "En attente",
    icon: Clock,
    className: "gov-badge-pending",
  },
  Rejected: {
    label: "Refusé",
    icon: XCircle,
    className: "gov-badge-rejected",
  },
  Expired: {
    label: "Expiré",
    icon: AlertTriangle,
    className: "gov-badge-expired",
  },
};

const sizeClasses = {
  sm: "px-2 py-1 text-xs gap-1",
  md: "px-3 py-1.5 text-sm gap-1.5",
  lg: "px-4 py-2 text-base gap-2",
};

const iconSizes = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

export function VisaStatusBadge({ status, size = "md" }: VisaStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded",
        config.className,
        sizeClasses[size]
      )}
    >
      <Icon className={iconSizes[size]} />
      {config.label}
    </span>
  );
}