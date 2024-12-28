import React, { useState } from 'react';
import { HardDrive, Upload, Download, Plus, FolderOpen, X } from 'lucide-react';
import { Service, StorageDetails } from '../types';
import { storageTemplates, storageAPI } from '../lib/storage';
import StorageTemplateCard from '../components/StorageTemplateCard';
import toast from 'react-hot-toast';

const mockStorageServices: Service[] = [
  {
    id: 'storage-1',
    name: 'Backup Storage',
    type: 'storage',
    status: 'active',
    details: {
      totalSpace: 1000,
      usedSpace: 750,
      buckets: 5
    } as StorageDetails,
    usage: {
      storage: 750,
      bandwidth: 1000,
      lastUpdated: '2024-03-14T10:00:00Z'
    },
    cost: {
      monthly: 19.99,
      current: 15.00
    }
  }
];

const Storage = () => {
  const [showTemplates, setShowTemplates] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleTemplateSelect = async (template: any) => {
    try {
      setIsCreating(true);
      await storageAPI.createBucket({
        name: `bucket-${Date.now()}`,
        template: template.id,
        capacity: template.capacity
      });
      toast.success('Storage bucket created successfully!');
      setShowTemplates(false);
    } catch (error) {
      toast.error('Failed to create storage bucket. Please try again.');
      console.error('Creation error:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cloud Storage</h1>
          <p className="text-gray-600 mt-1">Manage your storage buckets and files</p>
        </div>
        <button 
          className="btn btn-primary flex items-center"
          onClick={() => setShowTemplates(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Bucket
        </button>
      </div>

      {showTemplates && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Choose a Storage Template</h2>
              <button 
                onClick={() => setShowTemplates(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {storageTemplates.map((template) => (
                <StorageTemplateCard
                  key={template.id}
                  template={template}
                  onSelect={handleTemplateSelect}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6">
        {mockStorageServices.map((storage) => (
          <div key={storage.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-semibold">{storage.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="bg-green-500 w-2 h-2 rounded-full" />
                  <span className="text-sm text-gray-600">Active</span>
                  <span className="text-sm text-gray-400">
                    • {(storage.details as StorageDetails).buckets} buckets
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="btn btn-secondary flex items-center">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </button>
                <button className="btn btn-secondary flex items-center">
                  <FolderOpen className="w-4 h-4 mr-2" />
                  Browse
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <HardDrive className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-600">Storage Usage</div>
                    <div className="text-lg font-semibold">
                      {(storage.details as StorageDetails).usedSpace} / {(storage.details as StorageDetails).totalSpace} GB
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {((storage.details as StorageDetails).usedSpace / (storage.details as StorageDetails).totalSpace * 100).toFixed(1)}% used
                </div>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 rounded-full h-2" 
                  style={{ 
                    width: `${((storage.details as StorageDetails).usedSpace / (storage.details as StorageDetails).totalSpace * 100)}%` 
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-100 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Activity</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Upload className="w-4 h-4 text-gray-400" />
                      <span>backup-2024-03-14.zip</span>
                    </div>
                    <span className="text-gray-500">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Download className="w-4 h-4 text-gray-400" />
                      <span>project-assets.tar</span>
                    </div>
                    <span className="text-gray-500">5 hours ago</span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-100 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Bucket Statistics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Files</span>
                    <span className="font-medium">1,234</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Bandwidth Usage</span>
                    <span className="font-medium">{storage.usage.bandwidth} GB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Backup</span>
                    <span className="font-medium">2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Storage;