import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ProjectCard } from '@/components/ProjectCard';
import { StatsCard } from '@/components/StatsCard';
import { Button } from '@/components/ui/button';
import { useProjects } from '@/context/ProjectContext';
import { Clock, HardHat, CheckCircle, Users, ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
  const { projects } = useProjects();

  const pendingProjects = projects.filter(p => p.status === 'pending');
  const activeProjects = projects.filter(p => p.status === 'in_progress' || p.status === 'accepted');
  const completedProjects = projects.filter(p => p.status === 'completed');
  const uniqueClients = new Set(projects.map(p => p.clientId)).size;

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="space-y-8 animate-fade-in">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Pending Requests"
            value={pendingProjects.length}
            icon={<Clock className="w-6 h-6" />}
            trend={pendingProjects.length > 0 ? 'Needs attention' : 'All caught up'}
            trendUp={pendingProjects.length === 0}
          />
          <StatsCard
            title="Active Projects"
            value={activeProjects.length}
            icon={<HardHat className="w-6 h-6" />}
          />
          <StatsCard
            title="Completed"
            value={completedProjects.length}
            icon={<CheckCircle className="w-6 h-6" />}
            trend="+2 this month"
            trendUp
          />
          <StatsCard
            title="Total Clients"
            value={uniqueClients}
            icon={<Users className="w-6 h-6" />}
          />
        </div>

        {/* Pending Requests */}
        {pendingProjects.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-semibold">Pending Requests</h2>
                <p className="text-sm text-muted-foreground">Projects awaiting your approval</p>
              </div>
              <Link to="/admin/pending">
                <Button variant="outline" size="sm">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingProjects.slice(0, 3).map((project) => (
                <ProjectCard key={project.id} project={project} showClient />
              ))}
            </div>
          </div>
        )}

        {/* Active Projects */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-semibold">Active Projects</h2>
              <p className="text-sm text-muted-foreground">Currently in progress</p>
            </div>
            <Link to="/admin/active">
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          {activeProjects.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-xl border border-border/50">
              <p className="text-muted-foreground">No active projects at the moment</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeProjects.slice(0, 6).map((project) => (
                <ProjectCard key={project.id} project={project} showClient />
              ))}
            </div>
          )}
        </div>

        {/* Recently Completed */}
        {completedProjects.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-semibold">Recently Completed</h2>
                <p className="text-sm text-muted-foreground">Successfully finished projects</p>
              </div>
              <Link to="/admin/completed">
                <Button variant="outline" size="sm">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedProjects.slice(0, 3).map((project) => (
                <ProjectCard key={project.id} project={project} showClient />
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
