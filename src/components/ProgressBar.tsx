import { cn } from '@/lib/utils';
import { ProjectStage, stageOrder, projectStageLabels } from '@/data/mockData';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStage: ProjectStage;
  className?: string;
}

export function ProgressBar({ currentStage, className }: ProgressBarProps) {
  const currentIndex = stageOrder.indexOf(currentStage);

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between">
        {stageOrder.map((stage, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isPending = index > currentIndex;

          return (
            <div key={stage} className="flex flex-col items-center flex-1">
              <div className="flex items-center w-full">
                {index > 0 && (
                  <div
                    className={cn(
                      'h-0.5 flex-1 transition-colors duration-300',
                      isCompleted ? 'bg-accent' : 'bg-border'
                    )}
                  />
                )}
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 border-2',
                    isCompleted && 'bg-accent border-accent text-accent-foreground',
                    isCurrent && 'bg-accent/10 border-accent text-accent',
                    isPending && 'bg-muted border-border text-muted-foreground'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < stageOrder.length - 1 && (
                  <div
                    className={cn(
                      'h-0.5 flex-1 transition-colors duration-300',
                      isCompleted ? 'bg-accent' : 'bg-border'
                    )}
                  />
                )}
              </div>
              <span
                className={cn(
                  'mt-2 text-xs font-medium text-center',
                  isCurrent ? 'text-accent' : 'text-muted-foreground'
                )}
              >
                {projectStageLabels[stage]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
