import { useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderPlus,
  FolderOpen,
  MessageSquare,
  Settings,
  LogOut,
  Users,
  CheckCircle,
  Clock,
  HardHat,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const clientNavItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'New Project', url: '/create-project', icon: FolderPlus },
  { title: 'My Projects', url: '/projects', icon: FolderOpen },
];

const adminNavItems = [
  { title: 'Dashboard', url: '/admin', icon: LayoutDashboard },
  { title: 'Pending Requests', url: '/admin/pending', icon: Clock },
  { title: 'Active Projects', url: '/admin/active', icon: HardHat },
  { title: 'Completed', url: '/admin/completed', icon: CheckCircle },
  { title: 'Messages', url: '/admin/messages', icon: MessageSquare },
  { title: 'All Clients', url: '/admin/clients', icon: Users },
];

export function AppSidebar() {
  const location = useLocation();
  const { user, logout, switchRole } = useAuth();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const isAdmin = user?.role === 'admin';
  const navItems = isAdmin ? adminNavItems : clientNavItems;

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <Link to={isAdmin ? '/admin' : '/dashboard'} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
            <HardHat className="w-5 h-5 text-accent-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-display text-lg font-semibold text-sidebar-foreground">
                BuildCraft
              </h1>
              <p className="text-xs text-sidebar-foreground/60">Client Portal</p>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-xs uppercase tracking-wider px-2">
            {isAdmin ? 'Admin' : 'Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        'w-full transition-colors',
                        isActive && 'bg-sidebar-accent text-sidebar-accent-foreground'
                      )}
                    >
                      <Link to={item.url} className="flex items-center gap-3">
                        <item.icon className={cn('w-4 h-4', isActive && 'text-accent')} />
                        {!isCollapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-sidebar-accent flex items-center justify-center">
              <span className="text-sm font-medium text-sidebar-accent-foreground">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user?.name}
              </p>
              <p className="text-xs text-sidebar-foreground/60 truncate">
                {user?.email}
              </p>
            </div>
          </div>
        )}
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => switchRole(isAdmin ? 'client' : 'admin')}
          >
            <Users className="w-4 h-4 mr-2" />
            {!isCollapsed && `Switch to ${isAdmin ? 'Client' : 'Admin'}`}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-sidebar-foreground/70 hover:text-destructive hover:bg-destructive/10"
            onClick={logout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            {!isCollapsed && 'Sign Out'}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
