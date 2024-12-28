import React from 'react';
import { ArrowRight, Activity, Power, HardDrive } from 'lucide-react';
import { Service, VPSDetails, DaaSDetails, StorageDetails } from '../types';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const getServiceIcon = () => {
    switch (service.type) {
      case 'vps':
        return <Power className="w-5 h-5 text-blue-600" />;
      case 'daas':
        return <Activity className="w-5 h-5 text-purple-600" />;
      case 'storage':
        return <HardDrive className="w-5 h-5 text-green-600" />;
      default:
        return null;
    }
  };

  const getServiceDetails = () => {
    switch (service.type) {
      case 'vps':
        const vpsDetails = service.details as VPSDetails;
        return `${vpsDetails.cpu} CPU • ${vpsDetails.ram}GB RAM • ${vpsDetails.storage}GB Storage`;
      case 'daas':
        const daasDetails = service.details as DaaSDetails;
        return `${daasDetails.users} Users • ${daasDetails.storage}GB Storage`;
      case 'storage':
        const storageDetails = service.details as StorageDetails;
        return `${storageDetails.usedSpace}/${storageDetails.totalSpace}GB Used • ${storageDetails.buckets} Buckets`;
      default:
        return '';
    }
  };

  const getServicePath = () => {
    switch (service.type) {
      case 'vps':
        return '/vps';
      case 'daas':
        return '/daas';
      case 'storage':
        return '/storage';
      default:
        return '/';
    }
  };

  const getServiceGradient = () => {
    switch (service.type) {
      case 'vps':
        return 'from-blue-50 to-blue-100/20';
      case 'daas':
        return 'from-purple-50 to-purple-100/20';
      case 'storage':
        return 'from-green-50 to-green-100/20';
      default:
        return 'from-gray-50 to-gray-100/20';
    }
  };

  return (
    <div className={`p-6 rounded-xl border border-gray-100/50 shadow-sm hover:shadow-md transition-all duration-200 bg-gradient-to-br ${getServiceGradient()}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-2 rounded-lg bg-white shadow-sm">
            {getServiceIcon()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{service.name}</h3>
            <p className="text-sm text-gray-600 mt-0.5">{getServiceDetails()}</p>
          </div>
        </div>
        <Link
          to={getServicePath()}
          className="flex items-center text-blue-600 hover:text-blue-700 font-medium group"
        >
          <span className="mr-2">Manage</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;