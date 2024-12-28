import React from 'react';
import { Database, CheckCircle } from 'lucide-react';
import { StorageTemplate } from '../lib/storage';

interface StorageTemplateCardProps {
  template: StorageTemplate;
  onSelect: (template: StorageTemplate) => void;
}

const StorageTemplateCard: React.FC<StorageTemplateCardProps> = ({ template, onSelect }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{template.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{template.description}</p>
        </div>
        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
          {template.type}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Database className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium">{template.capacity} GB Storage</span>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium mb-2">Features</h4>
        <div className="space-y-2">
          {template.features.map((feature) => (
            <div key={feature} className="flex items-center space-x-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => onSelect(template)}
        className="w-full btn btn-primary flex items-center justify-center"
      >
        <Database className="w-4 h-4 mr-2" />
        Create Bucket
      </button>
    </div>
  );
};

export default StorageTemplateCard;