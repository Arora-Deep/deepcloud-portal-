import React from 'react';
import { BarChart3, ArrowUpRight, ArrowDownRight, DollarSign, HardDriveIcon, Users } from 'lucide-react';
import StatCard from '../components/stats/StatCard';
import ServicesList from '../components/services/ServicesList';
import { User, Service } from '../types';

const mockUser: User = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  company: 'Acme Inc',
  services: [],
  billing: {
    balance: 150.00,
    dueDate: '2024-04-01',
    method: 'Credit Card'
  }
};

const mockServices: Service[] = [
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
    id: 'daas-1',
    name: 'Development Desktop',
    type: 'daas',
    status: 'active',
    details: {
      desktopType: 'Development',
      users: 5,
      applications: ['VS Code', 'Docker', 'Chrome'],
      storage: 200
    },
    usage: {
      storage: 150,
      bandwidth: 400,
      lastUpdated: '2024-03-14T10:00:00Z'
    },
    cost: {
      monthly: 49.99,
      current: 37.50
    }
  },
  {
    id: 'storage-1',
    name: 'Backup Storage',
    type: 'storage',
    status: 'active',
    details: {
      totalSpace: 1000,
      usedSpace: 750,
      buckets: 5
    },
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

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {mockUser.name}!</h1>
        <p className="text-gray-600 mt-1">Here's what's happening with your services</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Active Services"
          value={mockServices.length}
          trend={{ value: "+2 from last month", positive: true }}
          icon={BarChart3}
        />
        <StatCard
          title="Total Users"
          value={12}
          trend={{ value: "+3 new users", positive: true }}
          icon={Users}
        />
        <StatCard
          title="Storage Used"
          value="975 GB"
          trend={{ value: "75% of total", positive: false }}
          icon={HardDriveIcon}
        />
        <StatCard
          title="Monthly Cost"
          value="$99.97"
          trend={{ value: "Next billing Apr 1" }}
          icon={DollarSign}
        />
      </div>

      <div className="grid gap-6">
        <ServicesList services={mockServices} />
      </div>
    </div>
  );
};

export default Dashboard;