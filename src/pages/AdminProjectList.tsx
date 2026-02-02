import { useParams } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ProjectCard } from '@/components/ProjectCard';
import { useProjects } from '@/context/ProjectContext';
import { Clock, HardHat, CheckCircle, FolderOpen } from 'lucide-react';

const filterConfig = {
  pending: {
    title: 'Pending Requests',
    description: 'Projects awaiting your approval',
    icon: Clock,
    filter: (p: any) => p.status === 'pending',
  },
  active: {
    title: 'Active Projects',
    description: 'Projects currently in progress',
    icon: HardHat,
    filter: (p: any) => p.status === 'in_progress' || p.status === 'accepted',
  },
  completed: {
    title: 'Completed Projects',
    description: 'Successfully finished projects',
    icon: CheckCircle,
    filter: (p: any) => p.status === 'completed',
  },
};

export default function AdminProjectList() {
  const { filter = 'active' } = useParams<{ filter?: string }>();
  const { projects } = useProjects();

  const config = filterConfig[filter as keyof typeof filterConfig] || filterConfig.active;
  const filteredProjects = projects.filter(config.filter);
  const Icon = config.icon;

  return (
    <DashboardLayout title={config.title}>
      <div className="animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold">{config.title}</h2>
            <p className="text-sm text-muted-foreground">{config.description}</p>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-xl border border-border/50">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">No projects here</h3>
            <p className="text-muted-foreground">
              {filter === 'pending' && 'All project requests have been reviewed'}
              {filter === 'active' && 'No active projects at the moment'}
              {filter === 'completed' && 'No completed projects yet'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} showClient />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
