import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ProjectCard } from '@/components/ProjectCard';
import { StatsCard } from '@/components/StatsCard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useProjects } from '@/context/ProjectContext';
import { Plus, FolderOpen, Clock, CheckCircle, HardHat } from 'lucide-react';

export default function ClientDashboard() {
  const { user } = useAuth();
  const { getProjectsByClientId } = useProjects();

  const projects = user ? getProjectsByClientId(user.id) : [];
  const pendingCount = projects.filter(p => p.status === 'pending').length;
  const activeCount = projects.filter(p => p.status === 'in_progress' || p.status === 'accepted').length;
  const completedCount = projects.filter(p => p.status === 'completed').length;

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Welcome back, {user?.name?.split(' ')[0]}
            </h1>
            <p className="text-muted-foreground mt-1">
              Track your projects and stay updated on progress
            </p>
          </div>
          <Link to="/create-project">
            <Button variant="gold" size="lg">
              <Plus className="w-4 h-4 mr-2" />
              New Project Request
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Projects"
            value={projects.length}
            icon={<FolderOpen className="w-6 h-6" />}
          />
          <StatsCard
            title="Pending Approval"
            value={pendingCount}
            icon={<Clock className="w-6 h-6" />}
          />
          <StatsCard
            title="In Progress"
            value={activeCount}
            icon={<HardHat className="w-6 h-6" />}
          />
          <StatsCard
            title="Completed"
            value={completedCount}
            icon={<CheckCircle className="w-6 h-6" />}
          />
        </div>

        {/* Projects */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">Your Projects</h2>
            <Link to="/projects" className="text-sm text-accent hover:text-accent/80 font-medium">
              View all
            </Link>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-xl border border-border/50">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <FolderOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">No projects yet</h3>
              <p className="text-muted-foreground mb-6">
                Start your first project to begin working with us
              </p>
              <Link to="/create-project">
                <Button variant="gold">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Project
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 6).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
