import { cn } from '@/lib/utils';
import { ProjectStatus, projectStatusLabels } from '@/data/mockData';

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

const statusStyles: Record<ProjectStatus, string> = {
  pending: 'bg-warning/10 text-warning border-warning/20',
  accepted: 'bg-info/10 text-info border-info/20',
  in_progress: 'bg-accent/10 text-accent border-accent/20',
  completed: 'bg-success/10 text-success border-success/20',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border',
        statusStyles[status],
        className
      )}
    >
      {projectStatusLabels[status]}
    </span>
  );
}
