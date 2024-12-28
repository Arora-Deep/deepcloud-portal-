import axios from 'axios';

export interface StorageTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  capacity: number;
  features: string[];
}

export const storageTemplates: StorageTemplate[] = [
  {
    id: 'backup-storage',
    name: 'Backup Storage',
    description: 'Reliable storage for backups and archives',
    type: 'backup',
    capacity: 1000,
    features: ['Versioning', 'Encryption', 'Auto-backup']
  },
  {
    id: 'media-storage',
    name: 'Media Storage',
    description: 'High-performance storage for media files',
    type: 'media',
    capacity: 2000,
    features: ['CDN Integration', 'Media Processing', 'Streaming']
  },
  {
    id: 'document-storage',
    name: 'Document Storage',
    description: 'Secure storage for business documents',
    type: 'document',
    capacity: 500,
    features: ['File Sharing', 'Collaboration', 'Audit Logs']
  }
];

class StorageAPI {
  private baseUrl: string;
  private token: string;

  constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  async createBucket(params: {
    name: string;
    template: string;
    capacity: number;
  }) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/buckets`,
        params,
        {
          headers: { Authorization: `Bearer ${this.token}` }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Storage API Error:', error);
      throw error;
    }
  }

  async getBucketStatus(id: string) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/buckets/${id}/status`,
        {
          headers: { Authorization: `Bearer ${this.token}` }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Storage API Error:', error);
      throw error;
    }
  }
}

export const storageAPI = new StorageAPI(
  import.meta.env.VITE_STORAGE_API_URL || '',
  import.meta.env.VITE_STORAGE_API_TOKEN || ''
);