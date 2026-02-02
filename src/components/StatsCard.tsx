import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

export function StatsCard({ title, value, icon, trend, trendUp, className }: StatsCardProps) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-display font-bold text-foreground">{value}</p>
            {trend && (
              <p className={cn(
                'text-xs font-medium',
                trendUp ? 'text-success' : 'text-muted-foreground'
              )}>
                {trend}
              </p>
            )}
          </div>
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
            <div className="text-accent">{icon}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
