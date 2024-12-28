import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Service, Template } from '../types';
import { templates, proxmoxAPI } from '../lib/proxmox';
import TemplateCard from '../components/TemplateCard';
import VPSSelector from '../components/vps/VPSSelector';
import VPSResources from '../components/vps/VPSResources';
import VPSMetrics from '../components/vps/VPSMetrics';
import toast from 'react-hot-toast';

const mockVPSServices: Service[] = [
  {
    id: 'vps-1',
    name: 'Production VPS',
    type: 'vps',
    status: 'active',
    details: {
      cpu: 4,
      ram: 8,
      storage: 100,
      ip: '192.168.1.1',
      os: 'Ubuntu 22.04'
    },
    usage: {
      cpu: 45,
      ram: 60,
      storage: 75,
      bandwidth: 250,
      lastUpdated: '2024-03-14T10:00:00Z'
    },
    cost: {
      monthly: 29.99,
      current: 22.50
    }
  },
  {
    id: 'vps-2',
    name: 'Development VPS',
    type: 'vps',
    status: 'active',
    details: {
      cpu: 2,
      ram: 4,
      storage: 50,
      ip: '192.168.1.2',
      os: 'Ubuntu 22.04'
    },
    usage: {
      cpu: 30,
      ram: 45,
      storage: 60,
      bandwidth: 150,
      lastUpdated: '2024-03-14T10:00:00Z'
    },
    cost: {
      monthly: 19.99,
      current: 15.50
    }
  }
];

const VPS = () => {
  const [showTemplates, setShowTemplates] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [selectedVPS, setSelectedVPS] = useState(mockVPSServices[0].id);

  const handleTemplateSelect = async (template: Template) => {
    try {
      setIsDeploying(true);
      await proxmoxAPI.createVM({
        name: `vps-${Date.now()}`,
        template: template.id,
        cores: template.resources.cores,
        memory: template.resources.memory,
        storage: template.resources.storage
      });
      toast.success('VPS deployment started successfully!');
      setShowTemplates(false);
    } catch (error) {
      toast.error('Failed to deploy VPS. Please try again.');
      console.error('Deployment error:', error);
    } finally {
      setIsDeploying(false);
    }
  };

  const selectedService = mockVPSServices.find(service => service.id === selectedVPS);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Virtual Private Servers</h1>
          <p className="text-gray-600 mt-1">Manage your VPS instances</p>
        </div>
        <button 
          className="btn btn-primary flex items-center"
          onClick={() => setShowTemplates(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          New VPS
        </button>
      </div>

      <VPSSelector
        services={mockVPSServices}
        selectedId={selectedVPS}
        onSelect={setSelectedVPS}
      />

      {selectedService && (
        <>
          <VPSResources service={selectedService} />
          <VPSMetrics service={selectedService} />
        </>
      )}

      {showTemplates && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Choose a Template</h2>
              <button 
                onClick={() => setShowTemplates(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onSelect={handleTemplateSelect}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VPS;