import React, { useState } from 'react';
import { Cpu, Server, HardDrive, Network, Terminal, ExternalLink } from 'lucide-react';
import { Service, VPSDetails } from '../../types';
import ConsoleModal from '../modals/ConsoleModal';

interface VPSResourcesProps {
  service: Service;
}

const VPSResources: React.FC<VPSResourcesProps> = ({ service }) => {
  const [showConsole, setShowConsole] = useState(false);
  const details = service.details as VPSDetails;

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Instance Resources</h3>
          <button 
            onClick={() => setShowConsole(true)}
            className="btn btn-secondary flex items-center"
          >
            <Terminal className="w-4 h-4 mr-2" />
            Open Console
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Cpu className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-sm text-gray-600">CPU Cores</div>
                <div className="text-lg font-semibold">{details.cpu} Cores</div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Server className="w-5 h-5 text-purple-600" />
              <div>
                <div className="text-sm text-gray-600">Memory</div>
                <div className="text-lg font-semibold">{details.ram} GB</div>
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
                <div className="text-sm text-gray-600">IP Address</div>
                <div className="text-lg font-semibold font-mono">{details.ip}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-600">Operating System</span>
              <div className="font-medium">{details.os}</div>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-600">Monthly Cost</span>
              <div className="font-medium">${service.cost.monthly}</div>
            </div>
          </div>
        </div>
      </div>

      <ConsoleModal
        isOpen={showConsole}
        onClose={() => setShowConsole(false)}
        title={`Console - ${service.name}`}
        type="vps"
        ip={details.ip}
      />
    </>
  );
};

export default VPSResources;