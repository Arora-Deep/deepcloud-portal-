import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Service, DaaSDetails } from '../../types';

interface DaaSSelectorProps {
  services: Service[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const DaaSSelector: React.FC<DaaSSelectorProps> = ({ services, selectedId, onSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onSelect(service.id)}
            className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all ${
              selectedId === service.id
                ? 'bg-purple-50 border-purple-200 text-purple-700'
                : 'hover:bg-gray-50 border-transparent'
            } border`}
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">{service.name}</span>
              <span className="text-sm text-gray-500">
                {(service.details as DaaSDetails).desktopType}
              </span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default DaaSSelector;