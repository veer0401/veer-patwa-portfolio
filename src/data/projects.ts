import type { Project } from '../types';
import projectsData from './projects.json';

// Single Source of Truth: Projects mapped directly from projects.json
export const projects: Project[] = projectsData.projects.map((p) => ({
  id: p.id,
  name: p.name,
  fileName:
    p.id === 'inventory-medical-pos'
      ? 'InventoryMedicalPOS.java'
      : p.id === 'criminal-record-management-system'
      ? 'CriminalRecordManagement.cs'
      : 'JavaShoppingApp.java',
  status: p.status,
  description: p.description,
  stack: p.technologies,
  features: p.features,
  metrics: {
    phase: p.status,
    classification: p.type,
  },
  sourceUrl: p.links.github || '#',
  liveUrl: p.links.live || '#',
  architecture: [
    { id: 'client', label: 'Client / UI', type: 'client', connections: ['api'] },
    { id: 'api', label: 'Service Layer', type: 'service', connections: ['db'] },
    { id: 'db', label: 'Data Store', type: 'database', connections: [] },
  ],
}));
