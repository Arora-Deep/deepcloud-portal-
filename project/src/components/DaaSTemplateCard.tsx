import React from 'react';
import { Monitor, Cpu, HardDrive, Package } from 'lucide-react';
import { DaaSTemplate } from '../lib/daas';
import { formatBytes } from '../lib/utils';

interface DaaSTemplateCardProps {
  template: DaaSTemplate;
  onSelect: (template: DaaSTemplate) => void;
  isDeploying?: boolean;
}

const DaaSTemplateCard: React.FC<DaaSTemplateCardProps> = ({ 
  template, 
  onSelect,
  isDeploying 
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{template.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{template.description}</p>
        </div>
        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
          {template.type}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-gray-400" />
          <span className="text-sm">{template.resources.cpu} Cores</span>
        </div>
        <div className="flex items-center space-x-2">
          <Monitor className="w-4 h-4 text-gray-400" />
          <span className="text-sm">{formatBytes(template.resources.memory * 1024 * 1024)} RAM</span>
        </div>
        <div className="flex items-center space-x-2">
          <HardDrive className="w-4 h-4 text-gray-400" />
          <span className="text-sm">{template.resources.storage} GB</span>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium mb-2">Included Applications</h4>
        <div className="flex flex-wrap gap-2">
          {template.applications.map((app) => (
            <span key={app} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
              {app}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={() => onSelect(template)}
        disabled={isDeploying}
        className="w-full btn btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isDeploying ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Deploying...
          </>
        ) : (
          <>
            <Package className="w-4 h-4 mr-2" />
            Deploy Desktop
          </>
        )}
      </button>
    </div>
  );
};

export default DaaSTemplateCard;