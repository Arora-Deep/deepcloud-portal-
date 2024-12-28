import React, { useState } from 'react';
import { Users, Monitor, HardDrive, Network, ExternalLink } from 'lucide-react';
import { Service, DaaSDetails } from '../../types';
import ConsoleModal from '../modals/ConsoleModal';

interface DaaSResourcesProps {
  service: Service;
}

const DaaSResources: React.FC<DaaSResourcesProps> = ({ service }) => {
  const [showConsole, setShowConsole] = useState(false);
  const details = service.details as DaaSDetails;

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Desktop Resources</h3>
          <button 
            onClick={() => setShowConsole(true)}
            className="btn btn-primary flex items-center"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Launch Desktop
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-purple-600" />
              <div>
                <div className="text-sm text-gray-600">Active Users</div>
                <div className="text-lg font-semibold">{details.users} Users</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Monitor className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-sm text-gray-600">Applications</div>
                <div className="text-lg font-semibold">{details.applications.length}</div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <HardDrive className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-sm text-gray-600">Storage</div>
                <div className="text-lg font-semibold">{details.storage} GB</div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Network className="w-5 h-5 text-orange-600" />
              <div>
                <div className="text-sm text-gray-600">Network Usage</div>
                <div className="text-lg font-semibold">{service.usage.bandwidth} GB</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Installed Applications</h4>
          <div className="flex flex-wrap gap-2">
            {details.applications.map((app) => (
              <span key={app} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                {app}
              </span>
            ))}
          </div>
        </div>
      </div>

      <ConsoleModal
        isOpen={showConsole}
        onClose={() => setShowConsole(false)}
        title={`Desktop - ${service.name}`}
        type="daas"
        ip={service.id} // Using ID as a placeholder for the desktop URL
      />
    </>
  );
};

export default DaaSResources;