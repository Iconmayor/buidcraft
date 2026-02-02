import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { StatusBadge } from '@/components/StatusBadge';
import { Project, projectTypeLabels } from '@/data/mockData';
import { Calendar, MessageSquare, Image } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  showClient?: boolean;
  className?: string;
}

export function ProjectCard({ project, showClient = false, className }: ProjectCardProps) {
  const unreadMessages = project.messages.length;

  return (
    <Link to={`/project/${project.id}`}>
      <Card className={cn(
        'group hover:shadow-elevated transition-all duration-300 cursor-pointer border-border/50 overflow-hidden',
        className
      )}>
        {project.referenceImages[0] && (
          <div className="h-32 overflow-hidden">
            <img
              src={project.referenceImages[0].url}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1 min-w-0">
              <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-1">
                {project.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {projectTypeLabels[project.type]}
              </p>
            </div>
            <StatusBadge status={project.status} />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {project.description}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {project.updatedAt}
              </span>
              {unreadMessages > 0 && (
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  {unreadMessages}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Image className="w-3.5 h-3.5" />
                {project.referenceImages.length}
              </span>
            </div>
            {showClient && (
              <span className="font-medium">{project.clientName}</span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
