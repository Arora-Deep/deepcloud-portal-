import React from 'react';
import { Server, Cpu, HardDrive } from 'lucide-react';
import { Template } from '../types';

interface TemplateCardProps {
  template: Template;
  onSelect: (template: Template) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onSelect }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{template.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{template.description}</p>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
          {template.os}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-gray-400" />
          <span className="text-sm">{template.resources.cores} Cores</span>
        </div>
        <div className="flex items-center space-x-2">
          <HardDrive className="w-4 h-4 text-gray-400" />
          <span className="text-sm">{template.resources.storage} GB</span>
        </div>
      </div>

      <button
        onClick={() => onSelect(template)}
        className="w-full btn btn-primary flex items-center justify-center"
      >
        <Server className="w-4 h-4 mr-2" />
        Deploy with this template
      </button>
    </div>
  );
};

export default TemplateCard;