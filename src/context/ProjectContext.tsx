import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Project, Message, ProjectStatus, ProjectStage, mockProjects, ProjectType } from '@/data/mockData';

interface ProjectContextType {
  projects: Project[];
  getProjectById: (id: string) => Project | undefined;
  getProjectsByClientId: (clientId: string) => Project[];
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'updates' | 'messages' | 'status' | 'stage'>) => Project;
  updateProjectStatus: (projectId: string, status: ProjectStatus) => void;
  updateProjectStage: (projectId: string, stage: ProjectStage) => void;
  addMessage: (projectId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
  addProjectUpdate: (projectId: string, stage: ProjectStage, note: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(mockProjects);

  const getProjectById = (id: string) => projects.find(p => p.id === id);

  const getProjectsByClientId = (clientId: string) => 
    projects.filter(p => p.clientId === clientId);

  const createProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'updates' | 'messages' | 'status' | 'stage'>) => {
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
      status: 'pending',
      stage: 'planning',
      updates: [],
      messages: [],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setProjects(prev => [newProject, ...prev]);
    return newProject;
  };

  const updateProjectStatus = (projectId: string, status: ProjectStatus) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId 
        ? { ...p, status, updatedAt: new Date().toISOString().split('T')[0] }
        : p
    ));
  };

  const updateProjectStage = (projectId: string, stage: ProjectStage) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId 
        ? { ...p, stage, status: stage === 'completed' ? 'completed' : 'in_progress', updatedAt: new Date().toISOString().split('T')[0] }
        : p
    ));
  };

  const addMessage = (projectId: string, messageData: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...messageData,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setProjects(prev => prev.map(p => 
      p.id === projectId 
        ? { ...p, messages: [...p.messages, newMessage] }
        : p
    ));
  };

  const addProjectUpdate = (projectId: string, stage: ProjectStage, note: string) => {
    const update = {
      id: `upd-${Date.now()}`,
      stage,
      note,
      images: [],
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProjects(prev => prev.map(p => 
      p.id === projectId 
        ? { ...p, updates: [...p.updates, update], stage }
        : p
    ));
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      getProjectById,
      getProjectsByClientId,
      createProject,
      updateProjectStatus,
      updateProjectStage,
      addMessage,
      addProjectUpdate,
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
}
