import axios from 'axios';

export interface DaaSTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  resources: {
    cpu: number;
    memory: number;
    storage: number;
  };
  applications: string[];
}

export const daasTemplates: DaaSTemplate[] = [
  {
    id: 'dev-desktop',
    name: 'Development Desktop',
    description: 'Preconfigured development environment with popular tools',
    type: 'development',
    resources: {
      cpu: 4,
      memory: 8192,
      storage: 100
    },
    applications: ['VS Code', 'Docker', 'Git', 'Node.js', 'Chrome']
  },
  {
    id: 'design-desktop',
    name: 'Design Desktop',
    description: 'Optimized for graphic design and creative work',
    type: 'design',
    resources: {
      cpu: 6,
      memory: 16384,
      storage: 200
    },
    applications: ['Figma', 'GIMP', 'Inkscape', 'Blender']
  },
  {
    id: 'office-desktop',
    name: 'Office Desktop',
    description: 'Standard office applications and productivity tools',
    type: 'office',
    resources: {
      cpu: 2,
      memory: 4096,
      storage: 50
    },
    applications: ['LibreOffice', 'Thunderbird', 'Firefox', 'Slack']
  }
];

export interface DaaSInstance {
  id: string;
  name: string;
  template: string;
  status: 'creating' | 'running' | 'stopped' | 'failed';
  ip?: string;
  createdAt: string;
  users: number;
  resources: {
    cpu: number;
    memory: number;
    storage: number;
  };
  applications: string[];
}

class DaaSAPI {
  private instances: DaaSInstance[] = [];

  async createDesktop(params: {
    name: string;
    template: string;
    users: number;
  }): Promise<DaaSInstance> {
    const template = daasTemplates.find(t => t.id === params.template);
    if (!template) {
      throw new Error('Template not found');
    }

    const instance: DaaSInstance = {
      id: `daas-${Date.now()}`,
      name: params.name,
      template: template.id,
      status: 'creating',
      createdAt: new Date().toISOString(),
      users: params.users,
      resources: template.resources,
      applications: template.applications
    };

    // Simulate async creation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    instance.status = 'running';
    instance.ip = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    
    this.instances.push(instance);
    return instance;
  }

  async getDesktops(): Promise<DaaSInstance[]> {
    return this.instances;
  }

  async getDesktop(id: string): Promise<DaaSInstance | undefined> {
    return this.instances.find(instance => instance.id === id);
  }

  async deleteDesktop(id: string): Promise<void> {
    const index = this.instances.findIndex(instance => instance.id === id);
    if (index !== -1) {
      this.instances.splice(index, 1);
    }
  }
}

export const daasAPI = new DaaSAPI();