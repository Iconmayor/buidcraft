import { useParams, Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ProgressBar } from '@/components/ProgressBar';
import { StatusBadge } from '@/components/StatusBadge';
import { MessageThread } from '@/components/MessageThread';
import { ImageGallery } from '@/components/ImageGallery';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/AuthContext';
import { useProjects } from '@/context/ProjectContext';
import { projectTypeLabels, projectStageLabels, stageOrder, ProjectStage } from '@/data/mockData';
import { ArrowLeft, Calendar, User, MessageSquare, Image, FileText, Check, X, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { getProjectById, updateProjectStatus, updateProjectStage, addMessage, addProjectUpdate } = useProjects();
  const [updateNote, setUpdateNote] = useState('');
  const [selectedStage, setSelectedStage] = useState<ProjectStage | ''>('');

  const project = getProjectById(id || '');
  const isAdmin = user?.role === 'admin';

  if (!project) {
    return (
      <DashboardLayout title="Project Not Found">
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">This project doesn't exist or you don't have access.</p>
          <Link to={isAdmin ? '/admin' : '/dashboard'}>
            <Button variant="outline">Go Back</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const handleSendMessage = (content: string) => {
    if (!user) return;
    addMessage(project.id, {
      projectId: project.id,
      senderId: user.id,
      senderName: user.name,
      senderRole: user.role,
      content,
    });
  };

  const handleAcceptProject = () => {
    updateProjectStatus(project.id, 'accepted');
    toast.success('Project accepted!');
  };

  const handleRejectProject = () => {
    updateProjectStatus(project.id, 'pending');
    toast.info('Project declined');
  };

  const handleAddUpdate = () => {
    if (!selectedStage || !updateNote.trim()) return;
    addProjectUpdate(project.id, selectedStage, updateNote);
    updateProjectStage(project.id, selectedStage);
    setUpdateNote('');
    setSelectedStage('');
    toast.success('Progress update added');
  };

  const allImages = [
    ...project.referenceImages,
    ...project.updates.flatMap(u => u.images),
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <Link
              to={isAdmin ? '/admin' : '/dashboard'}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {isAdmin ? 'Admin' : 'Dashboard'}
            </Link>
            <div className="flex items-start gap-3">
              <h1 className="font-display text-2xl lg:text-3xl font-bold">{project.title}</h1>
              <StatusBadge status={project.status} />
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {project.clientName}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Created {project.createdAt}
              </span>
              <span className="px-2 py-0.5 bg-secondary rounded-full text-xs font-medium">
                {projectTypeLabels[project.type]}
              </span>
            </div>
          </div>

          {/* Admin Actions */}
          {isAdmin && project.status === 'pending' && (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleRejectProject}>
                <X className="w-4 h-4 mr-2" />
                Decline
              </Button>
              <Button variant="gold" onClick={handleAcceptProject}>
                <Check className="w-4 h-4 mr-2" />
                Accept Project
              </Button>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {project.status !== 'pending' && (
          <Card>
            <CardContent className="pt-6">
              <ProgressBar currentStage={project.stage} />
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="details" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Details
                </TabsTrigger>
                <TabsTrigger value="photos" className="flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  Photos ({allImages.length})
                </TabsTrigger>
                <TabsTrigger value="messages" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Messages ({project.messages.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-wrap">{project.description}</p>
                  </CardContent>
                </Card>

                {/* Updates Timeline */}
                {project.updates.length > 0 && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Progress Updates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {project.updates.map((update, index) => (
                          <div key={update.id} className="relative pl-6 pb-6 last:pb-0">
                            {index < project.updates.length - 1 && (
                              <div className="absolute left-[9px] top-6 bottom-0 w-0.5 bg-border" />
                            )}
                            <div className="absolute left-0 top-1 w-[18px] h-[18px] rounded-full bg-accent flex items-center justify-center">
                              <Check className="w-3 h-3 text-accent-foreground" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">{projectStageLabels[update.stage]}</span>
                                <span className="text-xs text-muted-foreground">{update.createdAt}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">{update.note}</p>
                              {update.images.length > 0 && (
                                <div className="mt-3 grid grid-cols-3 gap-2">
                                  {update.images.map(img => (
                                    <img
                                      key={img.id}
                                      src={img.url}
                                      alt=""
                                      className="rounded-lg aspect-video object-cover"
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Admin: Add Update */}
                {isAdmin && project.status !== 'pending' && project.status !== 'completed' && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Add Progress Update</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Select value={selectedStage} onValueChange={(v) => setSelectedStage(v as ProjectStage)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                        <SelectContent>
                          {stageOrder.map(stage => (
                            <SelectItem key={stage} value={stage}>
                              {projectStageLabels[stage]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Textarea
                        placeholder="Describe the progress update..."
                        value={updateNote}
                        onChange={(e) => setUpdateNote(e.target.value)}
                        rows={3}
                      />
                      <Button
                        onClick={handleAddUpdate}
                        disabled={!selectedStage || !updateNote.trim()}
                        variant="gold"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Update
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="photos" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Photos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ImageGallery images={allImages} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="messages" className="mt-6">
                <Card className="h-[500px] flex flex-col">
                  <CardHeader className="border-b">
                    <CardTitle>Project Messages</CardTitle>
                  </CardHeader>
                  <div className="flex-1 overflow-hidden">
                    <MessageThread
                      messages={project.messages}
                      projectId={project.id}
                      onSendMessage={handleSendMessage}
                    />
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Project Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-sm text-muted-foreground">Status</span>
                  <div className="mt-1">
                    <StatusBadge status={project.status} />
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Current Stage</span>
                  <p className="font-medium">{projectStageLabels[project.stage]}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Type</span>
                  <p className="font-medium">{projectTypeLabels[project.type]}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Client</span>
                  <p className="font-medium">{project.clientName}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Last Updated</span>
                  <p className="font-medium">{project.updatedAt}</p>
                </div>
              </CardContent>
            </Card>

            {/* Reference Images Preview */}
            {project.referenceImages.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Reference Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {project.referenceImages.slice(0, 4).map((img) => (
                      <img
                        key={img.id}
                        src={img.url}
                        alt=""
                        className="rounded-lg aspect-square object-cover"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
