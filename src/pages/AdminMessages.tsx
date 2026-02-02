import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useProjects } from '@/context/ProjectContext';
import { Search, MessageSquare, ArrowRight, User, Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminMessages() {
  const { projects } = useProjects();
  const [searchQuery, setSearchQuery] = useState('');

  // Get all projects with messages, sorted by most recent message
  const projectsWithMessages = projects
    .filter(p => p.messages.length > 0)
    .map(p => ({
      ...p,
      lastMessage: p.messages[p.messages.length - 1],
      unreadCount: p.messages.filter(m => m.senderRole === 'client').length, // Mock unread
    }))
    .sort((a, b) => new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime());

  const filteredProjects = projectsWithMessages.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalMessages = projects.reduce((sum, p) => sum + p.messages.length, 0);

  return (
    <DashboardLayout title="Messages">
      <div className="space-y-6 animate-fade-in">
        {/* Stats Bar */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-accent" />
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{totalMessages}</span> total messages
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{projectsWithMessages.length}</span> active conversations
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Conversations List */}
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group hover:border-accent/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold truncate">{project.title}</h3>
                        <Badge variant="outline" className="shrink-0">
                          {project.messages.length} messages
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {project.clientName}
                      </p>
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-medium text-muted-foreground shrink-0">
                          {project.lastMessage.senderRole === 'client' ? 'Client:' : 'You:'}
                        </span>
                        <p className="text-sm text-muted-foreground truncate">
                          {project.lastMessage.content}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {format(new Date(project.lastMessage.timestamp), 'MMM d, h:mm a')}
                    </div>
                    <Link to={`/project/${project.id}`}>
                      <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        View
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 bg-card rounded-xl border border-border/50">
            <MessageSquare className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">
              {searchQuery ? 'No conversations matching your search.' : 'No messages yet.'}
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
