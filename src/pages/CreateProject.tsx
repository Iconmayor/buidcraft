import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useProjects } from '@/context/ProjectContext';
import { projectTypeLabels, ProjectType } from '@/data/mockData';
import { Upload, X, Send, Image } from 'lucide-react';
import { toast } from 'sonner';

export default function CreateProject() {
  const { user } = useAuth();
  const { createProject } = useProjects();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [type, setType] = useState<ProjectType>('kitchen');
  const [description, setDescription] = useState('');
  const [mockImages, setMockImages] = useState<string[]>([]);

  const handleAddMockImage = () => {
    // Simulate adding an image with a placeholder
    const placeholders = [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
    ];
    const newImage = placeholders[mockImages.length % placeholders.length];
    setMockImages([...mockImages, newImage]);
  };

  const handleRemoveImage = (index: number) => {
    setMockImages(mockImages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    const project = createProject({
      title,
      type,
      description,
      clientId: user.id,
      clientName: user.name,
      referenceImages: mockImages.map((url, i) => ({
        id: `img-${Date.now()}-${i}`,
        url,
        uploadedAt: new Date().toISOString().split('T')[0],
      })),
    });

    toast.success('Project request submitted!', {
      description: 'Our team will review your request shortly.',
    });

    navigate('/dashboard');
  };

  return (
    <DashboardLayout title="New Project Request">
      <div className="max-w-2xl mx-auto animate-fade-in">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-display text-2xl">Create Project Request</CardTitle>
            <CardDescription>
              Tell us about your project and upload reference images to help us understand your vision.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Modern Kitchen Renovation"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Project Type</Label>
                <Select value={type} onValueChange={(v) => setType(v as ProjectType)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(projectTypeLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project requirements, desired style, materials, timeline, etc."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-4">
                <Label>Reference Images</Label>
                <div className="grid grid-cols-3 gap-4">
                  {mockImages.map((url, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-muted group">
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddMockImage}
                    className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-accent hover:bg-accent/5 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-accent"
                  >
                    <Upload className="w-6 h-6" />
                    <span className="text-xs font-medium">Add Image</span>
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Upload reference images to help us understand your desired style and vision.
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" variant="gold" className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Request
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
