// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { DashboardLayout } from '@/components/DashboardLayout';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { useAuth } from '@/context/AuthContext';
// import { useProjects } from '@/context/ProjectContext';
// import { projectTypeLabels, ProjectType } from '@/data/mockData';
// import { Upload, X, Send, Image } from 'lucide-react';
// import { toast } from 'sonner';

// export default function CreateProject() {
//   const { user } = useAuth();
//   const { createProject } = useProjects();
//   const navigate = useNavigate();

//   const [title, setTitle] = useState('');
//   const [type, setType] = useState<ProjectType>('kitchen');
//   const [description, setDescription] = useState('');
//   const [mockImages, setMockImages] = useState<string[]>([]);

//   const handleAddMockImage = () => {
//     // Simulate adding an image with a placeholder
//     const placeholders = [
//       'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
//       'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
//       'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
//     ];
//     const newImage = placeholders[mockImages.length % placeholders.length];
//     setMockImages([...mockImages, newImage]);
//   };

//   const handleRemoveImage = (index: number) => {
//     setMockImages(mockImages.filter((_, i) => i !== index));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!user) return;

//     const project = createProject({
//       title,
//       type,
//       description,
//       clientId: user.id,
//       clientName: user.name,
//       referenceImages: mockImages.map((url, i) => ({
//         id: `img-${Date.now()}-${i}`,
//         url,
//         uploadedAt: new Date().toISOString().split('T')[0],
//       })),
//     });

//     toast.success('Project request submitted!', {
//       description: 'Our team will review your request shortly.',
//     });

//     navigate('/dashboard');
//   };

//   return (
//     <DashboardLayout title="New Project Request">
//       <div className="max-w-2xl mx-auto animate-fade-in">
//         <Card className="border-border/50">
//           <CardHeader>
//             <CardTitle className="font-display text-2xl">Create Project Request</CardTitle>
//             <CardDescription>
//               Tell us about your project and upload reference images to help us understand your vision.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="title">Project Title</Label>
//                 <Input
//                   id="title"
//                   placeholder="e.g., Modern Kitchen Renovation"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="type">Project Type</Label>
//                 <Select value={type} onValueChange={(v) => setType(v as ProjectType)}>
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {Object.entries(projectTypeLabels).map(([value, label]) => (
//                       <SelectItem key={value} value={value}>
//                         {label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="description">Project Description</Label>
//                 <Textarea
//                   id="description"
//                   placeholder="Describe your project requirements, desired style, materials, timeline, etc."
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   rows={5}
//                   required
//                 />
//               </div>

//               <div className="space-y-4">
//                 <Label>Reference Images</Label>
//                 <div className="grid grid-cols-3 gap-4">
//                   {mockImages.map((url, index) => (
//                     <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-muted group">
//                       <img src={url} alt="" className="w-full h-full object-cover" />
//                       <button
//                         type="button"
//                         onClick={() => handleRemoveImage(index)}
//                         className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={handleAddMockImage}
//                     className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-accent hover:bg-accent/5 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-accent"
//                   >
//                     <Upload className="w-6 h-6" />
//                     <span className="text-xs font-medium">Add Image</span>
//                   </button>
//                 </div>
//                 <p className="text-xs text-muted-foreground">
//                   Upload reference images to help us understand your desired style and vision.
//                 </p>
//               </div>

//               <div className="flex gap-4 pt-4">
//                 <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1">
//                   Cancel
//                 </Button>
//                 <Button type="submit" variant="gold" className="flex-1">
//                   <Send className="w-4 h-4 mr-2" />
//                   Submit Request
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </DashboardLayout>
//   );
// }

import { useState, useRef, ChangeEvent } from 'react';
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
import { Upload, X, Send, Image, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface UploadedImage {
  id: string;
  file: File;
  previewUrl: string;
  uploadedAt: string;
  uploadProgress: number;
}

export default function CreateProject() {
  const { user } = useAuth();
  const { createProject } = useProjects();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [type, setType] = useState<ProjectType>('kitchen');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages: UploadedImage[] = [];
    
    // Validate each file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Invalid file type', {
          description: `${file.name} is not an image file. Please upload only images.`,
        });
        continue;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File too large', {
          description: `${file.name} exceeds 5MB limit. Please choose a smaller image.`,
        });
        continue;
      }

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      
      newImages.push({
        id: `img-${Date.now()}-${i}`,
        file,
        previewUrl,
        uploadedAt: new Date().toISOString(),
        uploadProgress: 0,
      });
    }

    // Add new images to state
    setImages(prev => [...prev, ...newImages]);

    // Simulate upload progress (in real app, you would upload to your server)
    if (newImages.length > 0) {
      setIsUploading(true);
      
      newImages.forEach((img, index) => {
        // Simulate progress updates
        const interval = setInterval(() => {
          setImages(prev => prev.map(item => {
            if (item.id === img.id) {
              const newProgress = Math.min(item.uploadProgress + 20, 100);
              return { ...item, uploadProgress: newProgress };
            }
            return item;
          }));
        }, 100);

        // Complete upload simulation
        setTimeout(() => {
          clearInterval(interval);
          setImages(prev => prev.map(item => {
            if (item.id === img.id) {
              return { ...item, uploadProgress: 100 };
            }
            return item;
          }));
          
          // Check if all uploads are complete
          if (index === newImages.length - 1) {
            setTimeout(() => setIsUploading(false), 500);
          }
        }, 500);
      });

      toast.success(`${newImages.length} image${newImages.length > 1 ? 's' : ''} added`, {
        description: 'Images will be uploaded in the background.',
      });
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (id: string) => {
    const imageToRemove = images.find(img => img.id === id);
    if (imageToRemove) {
      // Revoke object URL to prevent memory leaks
      URL.revokeObjectURL(imageToRemove.previewUrl);
    }
    setImages(images.filter(img => img.id !== id));
  };

  const handleAddImageClick = () => {
    fileInputRef.current?.click();
  };

  const simulateServerUpload = async (images: UploadedImage[]) => {
    // In a real application, you would upload to your server here
    // This is a simulation that returns mock URLs
    return images.map(img => ({
      id: img.id,
      url: `https://example.com/uploads/${img.id}-${img.file.name}`,
      uploadedAt: img.uploadedAt,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Authentication required', {
        description: 'Please log in to create a project.',
      });
      return;
    }

    if (title.trim() === '') {
      toast.error('Title required', {
        description: 'Please provide a project title.',
      });
      return;
    }

    try {
      setIsUploading(true);
      
      // Upload images to server (simulated)
      const uploadedImages = await simulateServerUpload(images);
      
      // Create project
      const project = createProject({
        title,
        type,
        description,
        clientId: user.id,
        clientName: user.name,
        referenceImages: uploadedImages,
      });

      toast.success('Project request submitted!', {
        description: 'Our team will review your request shortly.',
      });

      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to create project', {
        description: 'Please try again. If the problem persists, contact support.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Cleanup object URLs on unmount
  useState(() => {
    return () => {
      images.forEach(img => URL.revokeObjectURL(img.previewUrl));
    };
  });

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
                  disabled={isUploading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Project Type</Label>
                <Select 
                  value={type} 
                  onValueChange={(v) => setType(v as ProjectType)}
                  disabled={isUploading}
                >
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
                  disabled={isUploading}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Reference Images</Label>
                  <span className="text-xs text-muted-foreground">
                    {images.length} image{images.length !== 1 ? 's' : ''} selected
                  </span>
                </div>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
                
                <div className="grid grid-cols-3 gap-4">
                  {images.map((img) => (
                    <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden bg-muted group">
                      <img 
                        src={img.previewUrl} 
                        alt={`Reference ${img.id}`} 
                        className="w-full h-full object-cover"
                        onLoad={() => URL.revokeObjectURL(img.previewUrl)}
                      />
                      {/* Upload Progress Overlay */}
                      {img.uploadProgress < 100 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="text-white text-center">
                            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                            <div className="w-16 h-1 bg-white/30 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-white transition-all duration-300"
                                style={{ width: `${img.uploadProgress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(img.id)}
                        disabled={isUploading}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={handleAddImageClick}
                    disabled={isUploading}
                    className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-accent hover:bg-accent/5 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUploading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <Upload className="w-6 h-6" />
                        <span className="text-xs font-medium">Upload Image</span>
                        <span className="text-xs text-muted-foreground">Max 5MB</span>
                      </>
                    )}
                  </button>
                </div>
                
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Upload images from your device to show your desired style and vision.</p>
                  <p>Supported formats: JPG, PNG, WebP. Maximum file size: 5MB per image.</p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate(-1)} 
                  className="flex-1"
                  disabled={isUploading}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="gold" 
                  className="flex-1"
                  disabled={isUploading || !title.trim() || !description.trim()}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Request
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}