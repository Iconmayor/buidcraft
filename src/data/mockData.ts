export type UserRole = 'client' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface ProjectImage {
  id: string;
  url: string;
  caption?: string;
  stage?: ProjectStage;
  uploadedAt: string;
}

export type ProjectStatus = 'pending' | 'accepted' | 'in_progress' | 'completed';
export type ProjectStage = 'planning' | 'in_progress' | 'finishing' | 'completed';
export type ProjectType =
  | 'kitchen'
  | 'bathroom_makeover'
  | 'office'
  | 'home_extension'
  | 'carpentry'
  | 'home_renovation'
  | 'loft_conversion'
  | 'roofers'
  | 'damp_proofing'
  | 'plaster';

export interface Message {
  id: string;
  projectId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  content: string;
  timestamp: string;
  isUpdate?: boolean;
}

export interface ProjectUpdate {
  id: string;
  stage: ProjectStage;
  note: string;
  images: ProjectImage[];
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  type: ProjectType;
  description: string;
  status: ProjectStatus;
  stage: ProjectStage;
  clientId: string;
  clientName: string;
  referenceImages: ProjectImage[];
  updates: ProjectUpdate[];
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'client-1',
    name: 'Sarah Mitchell',
    email: 'sarah@example.com',
    role: 'client',
  },
  {
    id: 'client-2',
    name: 'Michael Chen',
    email: 'michael@example.com',
    role: 'client',
  },
  {
    id: 'admin-1',
    name: 'James Rodriguez',
    email: 'james@buildcraft.com',
    role: 'admin',
  },
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Modern Kitchen Renovation',
    type: 'kitchen',
    description: 'Complete kitchen renovation with new cabinets, countertops, and appliances. Looking for a modern minimalist design with white and wood tones.',
    status: 'in_progress',
    stage: 'in_progress',
    clientId: 'client-1',
    clientName: 'Sarah Mitchell',
    referenceImages: [
      { id: 'img-1', url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800', caption: 'Design inspiration', uploadedAt: '2024-01-15' },
      { id: 'img-2', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', caption: 'Cabinet style reference', uploadedAt: '2024-01-15' },
    ],
    updates: [
      {
        id: 'upd-1',
        stage: 'planning',
        note: 'Initial planning completed. Materials ordered and delivery scheduled for next week.',
        images: [],
        createdAt: '2026-01-20',
      },
      {
        id: 'upd-2',
        stage: 'in_progress',
        note: 'Demolition complete. Starting cabinet installation today.',
        images: [
          { id: 'prog-1', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800', caption: 'Demolition complete', stage: 'in_progress', uploadedAt: '2024-01-28' },
        ],
        createdAt: '2026-01-28',
      },
    ],
    messages: [
      { id: 'msg-1', projectId: 'proj-1', senderId: 'client-1', senderName: 'Sarah Mitchell', senderRole: 'client', content: 'Hi! Just wanted to check on the timeline for the cabinet installation.', timestamp: '2024-01-25T10:30:00' },
      { id: 'msg-2', projectId: 'proj-1', senderId: 'admin-1', senderName: 'James Rodriguez', senderRole: 'admin', content: 'Hi Sarah! The cabinets arrived yesterday. We\'ll begin installation tomorrow morning.', timestamp: '2024-01-25T14:15:00' },
      { id: 'msg-3', projectId: 'proj-1', senderId: 'client-1', senderName: 'Sarah Mitchell', senderRole: 'client', content: 'That\'s great news! Thank you for the update.', timestamp: '2024-01-25T14:45:00' },
    ],
    createdAt: '2026-01-15',
    updatedAt: '2026-01-28',
  },
  {
    id: 'proj-2',
    title: 'Downtown Restaurant Build-Out',
    type: 'office',
    description: 'New restaurant space requiring full build-out including commercial kitchen, dining area, and bar. Industrial chic aesthetic with exposed brick and modern fixtures.',
    status: 'accepted',
    stage: 'planning',
    clientId: 'client-2',
    clientName: 'Michael Chen',
    referenceImages: [
      { id: 'img-3', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', caption: 'Dining area concept', uploadedAt: '2024-01-20' },
      { id: 'img-4', url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800', caption: 'Bar design inspiration', uploadedAt: '2024-01-20' },
    ],
    updates: [
      {
        id: 'upd-3',
        stage: 'planning',
        note: 'Project approved. Architectural plans being finalized with client.',
        images: [],
        createdAt: '2026-01-22',
      },
    ],
    messages: [
      { id: 'msg-4', projectId: 'proj-2', senderId: 'admin-1', senderName: 'James Rodriguez', senderRole: 'admin', content: 'Welcome to BuildCraft! Your project has been approved. I\'ll be your project manager.', timestamp: '2024-01-21T09:00:00', isUpdate: true },
      { id: 'msg-5', projectId: 'proj-2', senderId: 'client-2', senderName: 'Michael Chen', senderRole: 'client', content: 'Thanks James! When can we schedule a walkthrough?', timestamp: '2024-01-21T11:30:00' },
    ],
    createdAt: '2026-01-20',
    updatedAt: '2026-01-22',
  },
  {
    id: 'proj-3',
    title: 'Master Bathroom Remodel',
    type: 'bathroom_makeover',
    description: 'Luxury master bathroom renovation with walk-in shower, freestanding tub, and double vanity. Prefer marble and gold accents.',
    status: 'pending',
    stage: 'planning',
    clientId: 'client-1',
    clientName: 'Sarah Mitchell',
    referenceImages: [
      { id: 'img-5', url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800', caption: 'Bathroom inspiration', uploadedAt: '2024-01-28' },
    ],
    updates: [],
    messages: [],
    createdAt: '2026-01-28',
    updatedAt: '2026-01-28',
  },
  {
    id: 'proj-4',
    title: 'Home Office Conversion',
    type: 'office',
    description: 'Converting spare bedroom into professional home office. Need built-in shelving, proper lighting, and soundproofing.',
    status: 'completed',
    stage: 'completed',
    clientId: 'client-2',
    clientName: 'Michael Chen',
    referenceImages: [
      { id: 'img-6', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', caption: 'Office design reference', uploadedAt: '2023-11-01' },
    ],
    updates: [
      {
        id: 'upd-4',
        stage: 'completed',
        note: 'Project completed! All finishes applied and final inspection passed.',
        images: [
          { id: 'prog-2', url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800', caption: 'Completed office', stage: 'completed', uploadedAt: '2023-12-15' },
        ],
        createdAt: '2026-01-25',
      },
    ],
    messages: [
      { id: 'msg-6', projectId: 'proj-4', senderId: 'admin-1', senderName: 'James Rodriguez', senderRole: 'admin', content: 'Congratulations! Your home office is complete. Please let us know if you need anything.', timestamp: '2023-12-15T16:00:00', isUpdate: true },
    ],
    createdAt: '2026-01-11',
    updatedAt: '2026-01-15',
  },
];

export const projectTypeLabels: Record<ProjectType, string> = {
  kitchen: 'Kitchen',
  bathroom_makeover: 'Bathroom Makeover',
  office: 'Office',
  home_extension: 'Home Extension',
  carpentry: 'Carpentry',
  home_renovation: 'Home Renovation',
  loft_conversion: 'Loft Conversion',
  plaster: 'Plaster',
  roofers: "Roofers",
  damp_proofing: "Damp Proofing"
};

export const projectStatusLabels: Record<ProjectStatus, string> = {
  pending: 'Pending Approval',
  accepted: 'Accepted',
  in_progress: 'In Progress',
  completed: 'Completed',
};

export const projectStageLabels: Record<ProjectStage, string> = {
  planning: 'Planning',
  in_progress: 'In Progress',
  finishing: 'Finishing',
  completed: 'Completed',
};

export const stageOrder: ProjectStage[] = ['planning', 'in_progress', 'finishing', 'completed'];
