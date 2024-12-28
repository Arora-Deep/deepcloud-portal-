import axios from 'axios';

interface ProxmoxConfig {
  host: string;
  token: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  os: string;
  resources: {
    cores: number;
    memory: number;
    storage: number;
  };
}

export const templates: Template[] = [
  {
    id: 'ubuntu-22-04',
    name: 'Ubuntu 22.04 LTS',
    description: 'Latest Ubuntu LTS release with basic server configuration',
    os: 'ubuntu',
    resources: {
      cores: 2,
      memory: 2048,
      storage: 32
    }
  },
  {
    id: 'centos-9-stream',
    name: 'CentOS Stream 9',
    description: 'CentOS Stream 9 with minimal installation',
    os: 'centos',
    resources: {
      cores: 2,
      memory: 2048,
      storage: 32
    }
  },
  {
    id: 'debian-12',
    name: 'Debian 12',
    description: 'Debian 12 (Bookworm) with standard system utilities',
    os: 'debian',
    resources: {
      cores: 2,
      memory: 2048,
      storage: 32
    }
  }
];

class ProxmoxAPI {
  private config: ProxmoxConfig;

  constructor(config: ProxmoxConfig) {
    this.config = config;
  }

  private async request(method: string, path: string, data?: any) {
    try {
      const response = await axios({
        method,
        url: `${this.config.host}/api2/json${path}`,
        headers: {
          'Authorization': `PVEAPIToken=${this.config.token}`
        },
        data
      });
      return response.data;
    } catch (error) {
      console.error('Proxmox API Error:', error);
      throw error;
    }
  }

  async createVM(params: {
    name: string;
    template: string;
    cores: number;
    memory: number;
    storage: number;
  }) {
    return this.request('POST', '/nodes/proxmox/qemu', {
      name: params.name,
      template: params.template,
      cores: params.cores,
      memory: params.memory,
      storage: params.storage
    });
  }

  async updateVM(vmid: string, resources: {
    cpu?: number;
    memory?: number;
  }) {
    return this.request('PUT', `/nodes/proxmox/qemu/${vmid}/config`, {
      cores: resources.cpu,
      memory: resources.memory
    });
  }

  async getVMStatus(vmid: string) {
    return this.request('GET', `/nodes/proxmox/qemu/${vmid}/status/current`);
  }

  async startVM(vmid: string) {
    return this.request('POST', `/nodes/proxmox/qemu/${vmid}/status/start`);
  }

  async stopVM(vmid: string) {
    return this.request('POST', `/nodes/proxmox/qemu/${vmid}/status/stop`);
  }

  async deleteVM(vmid: string) {
    return this.request('DELETE', `/nodes/proxmox/qemu/${vmid}`);
  }
}

export const proxmoxAPI = new ProxmoxAPI({
  host: import.meta.env.VITE_PROXMOX_HOST || '',
  token: import.meta.env.VITE_PROXMOX_TOKEN || ''
});