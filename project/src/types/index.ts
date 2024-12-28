export interface Service {
  id: string;
  name: string;
  type: 'vps' | 'daas' | 'storage';
  status: 'active' | 'suspended' | 'pending';
  details: VPSDetails | DaaSDetails | StorageDetails;
  usage: Usage;
  cost: {
    monthly: number;
    current: number;
  };
}

export interface VPSDetails {
  cpu: number;
  ram: number;
  storage: number;
  ip: string;
  os: string;
}

export interface DaaSDetails {
  desktopType: string;
  users: number;
  applications: string[];
  storage: number;
}

export interface StorageDetails {
  totalSpace: number;
  usedSpace: number;
  buckets: number;
}

export interface Usage {
  cpu?: number;
  ram?: number;
  storage: number;
  bandwidth: number;
  lastUpdated: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  company?: string;
  services: Service[];
  billing: {
    balance: number;
    dueDate: string;
    method: string;
  };
}

export interface Template {
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