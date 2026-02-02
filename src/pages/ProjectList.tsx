import { DashboardLayout } from '@/components/DashboardLayout';
import { ProjectCard } from '@/components/ProjectCard';
import { useAuth } from '@/context/AuthContext';
import { useProjects } from '@/context/ProjectContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FolderOpen } from 'lucide-react';

export default function ProjectList() {
  const { user } = useAuth();
  const { getProjectsByClientId } = useProjects();

  const projects = user ? getProjectsByClientId(user.id) : [];
  const pendingProjects = projects.filter(p => p.status === 'pending');
  const activeProjects = projects.filter(p => p.status === 'in_progress' || p.status === 'accepted');
  const completedProjects = projects.filter(p => p.status === 'completed');

  const renderProjects = (projectList: typeof projects) => {
    if (projectList.length === 0) {
      return (
        <div className="text-center py-12 bg-card rounded-xl border border-border/50">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
            <FolderOpen className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">No projects in this category</p>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectList.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    );
  };

  return (
    <DashboardLayout title="My Projects">
      <div className="animate-fade-in">
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All ({projects.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingProjects.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeProjects.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedProjects.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {renderProjects(projects)}
          </TabsContent>
          <TabsContent value="pending" className="mt-6">
            {renderProjects(pendingProjects)}
          </TabsContent>
          <TabsContent value="active" className="mt-6">
            {renderProjects(activeProjects)}
          </TabsContent>
          <TabsContent value="completed" className="mt-6">
            {renderProjects(completedProjects)}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
