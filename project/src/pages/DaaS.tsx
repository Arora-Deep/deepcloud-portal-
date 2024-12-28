import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { Service } from '../types';
import { daasTemplates, daasAPI, DaaSInstance } from '../lib/daas';
import DaaSTemplateCard from '../components/DaaSTemplateCard';
import DaaSSelector from '../components/daas/DaaSSelector';
import DaaSResources from '../components/daas/DaaSResources';
import DaaSMetrics from '../components/daas/DaaSMetrics';
import toast from 'react-hot-toast';

const DaaS = () => {
  const [showTemplates, setShowTemplates] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [instances, setInstances] = useState<DaaSInstance[]>([]);
  const [selectedInstance, setSelectedInstance] = useState<string | null>(null);

  useEffect(() => {
    loadInstances();
  }, []);

  const loadInstances = async () => {
    try {
      const desktops = await daasAPI.getDesktops();
      setInstances(desktops);
      if (desktops.length > 0 && !selectedInstance) {
        setSelectedInstance(desktops[0].id);
      }
    } catch (error) {
      console.error('Failed to load instances:', error);
      toast.error('Failed to load desktop instances');
    }
  };

  const handleTemplateSelect = async (template: any) => {
    try {
      setIsDeploying(true);
      const instance = await daasAPI.createDesktop({
        name: `${template.name}-${Date.now()}`,
        template: template.id,
        users: 5
      });
      
      await loadInstances();
      setSelectedInstance(instance.id);
      toast.success('Desktop deployed successfully!');
      setShowTemplates(false);
    } catch (error) {
      console.error('Deployment error:', error);
      toast.error('Failed to deploy desktop. Please try again.');
    } finally {
      setIsDeploying(false);
    }
  };

  // Convert DaaSInstance to Service format for existing components
  const selectedService: Service | undefined = selectedInstance && instances.find(i => i.id === selectedInstance) 
    ? {
        id: selectedInstance,
        name: instances.find(i => i.id === selectedInstance)!.name,
        type: 'daas',
        status: 'active',
        details: {
          desktopType: instances.find(i => i.id === selectedInstance)!.template,
          users: instances.find(i => i.id === selectedInstance)!.users,
          applications: instances.find(i => i.id === selectedInstance)!.applications,
          storage: instances.find(i => i.id === selectedInstance)!.resources.storage
        },
        usage: {
          storage: Math.floor(Math.random() * 100),
          bandwidth: Math.floor(Math.random() * 1000),
          lastUpdated: new Date().toISOString()
        },
        cost: {
          monthly: 49.99,
          current: 37.50
        }
      }
    : undefined;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Desktop as a Service</h1>
          <p className="text-gray-600 mt-1">Access your virtual desktops</p>
        </div>
        <button 
          className="btn btn-primary flex items-center"
          onClick={() => setShowTemplates(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Desktop
        </button>
      </div>

      {instances.length > 0 ? (
        <>
          <DaaSSelector
            services={instances.map(instance => ({
              id: instance.id,
              name: instance.name,
              type: 'daas',
              status: 'active',
              details: {
                desktopType: instance.template,
                users: instance.users,
                applications: instance.applications,
                storage: instance.resources.storage
              }
            }))}
            selectedId={selectedInstance || ''}
            onSelect={setSelectedInstance}
          />

          {selectedService && (
            <>
              <DaaSResources service={selectedService} />
              <DaaSMetrics service={selectedService} />
            </>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No desktop instances found. Create one to get started.</p>
        </div>
      )}

      {showTemplates && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Choose a Desktop Template</h2>
              <button 
                onClick={() => setShowTemplates(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {daasTemplates.map((template) => (
                <DaaSTemplateCard
                  key={template.id}
                  template={template}
                  onSelect={handleTemplateSelect}
                  isDeploying={isDeploying}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DaaS;