import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockUsers, User } from '@/data/mockData';
import { useProjects } from '@/context/ProjectContext';
import { Search, Mail, Phone, MoreVertical, FolderOpen } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

export default function AdminUsers() {
  const { projects } = useProjects();
  const [searchQuery, setSearchQuery] = useState('');

  // Get only client users
  const clients = mockUsers.filter(u => u.role === 'client');

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getClientStats = (clientId: string) => {
    const clientProjects = projects.filter(p => p.clientId === clientId);
    return {
      total: clientProjects.length,
      active: clientProjects.filter(p => p.status === 'in_progress' || p.status === 'accepted').length,
      completed: clientProjects.filter(p => p.status === 'completed').length,
      pending: clientProjects.filter(p => p.status === 'pending').length,
    };
  };

  return (
    <DashboardLayout title="Manage Users">
      <div className="space-y-6 animate-fade-in">
        {/* Search */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search clients by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Badge variant="secondary" className="text-sm">
            {filteredClients.length} clients
          </Badge>
        </div>

        {/* Client List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => {
            const stats = getClientStats(client.id);
            return (
              <Card key={client.id} className="group hover:border-accent/50 transition-colors">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-lg font-semibold text-accent">
                        {client.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-base font-semibold">{client.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{client.email}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Mail className="w-4 h-4 mr-2" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Phone className="w-4 h-4 mr-2" />
                        Call Client
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 py-4 border-t border-b">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{stats.total}</p>
                      <p className="text-xs text-muted-foreground">Total</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-accent">{stats.active}</p>
                      <p className="text-xs text-muted-foreground">Active</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-accent">{stats.completed}</p>
                      <p className="text-xs text-muted-foreground">Done</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link to={`/admin/active?client=${client.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        <FolderOpen className="w-4 h-4 mr-2" />
                        View Projects
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12 bg-card rounded-xl border border-border/50">
            <p className="text-muted-foreground">No clients found matching your search.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
