import { useState } from 'react';
import { ProjectImage, projectStageLabels } from '@/data/mockData';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Download, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: ProjectImage[];
  className?: string;
}

export function ImageGallery({ images, className }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);

  if (images.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No images uploaded yet
      </div>
    );
  }

  return (
    <>
      <div className={cn('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4', className)}>
        {images.map((image) => (
          <div
            key={image.id}
            className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer bg-muted"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image.url}
              alt={image.caption || 'Project image'}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            {image.stage && (
              <span className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 text-white text-xs rounded">
                {projectStageLabels[image.stage]}
              </span>
            )}
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage.url}
                alt={selectedImage.caption || 'Project image'}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <div className="flex items-center justify-between text-white">
                  <div>
                    {selectedImage.caption && (
                      <p className="font-medium">{selectedImage.caption}</p>
                    )}
                    <p className="text-sm text-white/70">{selectedImage.uploadedAt}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/20">
                    <Download className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
