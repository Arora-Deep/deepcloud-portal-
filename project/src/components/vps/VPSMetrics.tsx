import React from 'react';
import { Cpu, Server, Database, Network } from 'lucide-react';
import { Service } from '../../types';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface VPSMetricsProps {
  service: Service;
}

const VPSMetrics: React.FC<VPSMetricsProps> = ({ service }) => {
  const mockTimeData = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  const mockCPUData = Array.from({ length: 24 }, () => Math.floor(Math.random() * 100));
  const mockRAMData = Array.from({ length: 24 }, () => Math.floor(Math.random() * 100));

  const chartData = {
    labels: mockTimeData,
    datasets: [
      {
        label: 'CPU Usage',
        data: mockCPUData,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'RAM Usage',
        data: mockRAMData,
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Cpu className="w-5 h-5 text-blue-600" />
            <div>
              <div className="text-sm text-gray-600">CPU Usage</div>
              <div className="text-lg font-semibold">{service.usage.cpu}%</div>
            </div>
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 rounded-full h-2" 
              style={{ width: `${service.usage.cpu}%` }}
            />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Server className="w-5 h-5 text-purple-600" />
            <div>
              <div className="text-sm text-gray-600">Memory Usage</div>
              <div className="text-lg font-semibold">{service.usage.ram}%</div>
            </div>
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 rounded-full h-2" 
              style={{ width: `${service.usage.ram}%` }}
            />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Database className="w-5 h-5 text-green-600" />
            <div>
              <div className="text-sm text-gray-600">Storage Usage</div>
              <div className="text-lg font-semibold">{service.usage.storage}%</div>
            </div>
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 rounded-full h-2" 
              style={{ width: `${service.usage.storage}%` }}
            />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Network className="w-5 h-5 text-orange-600" />
            <div>
              <div className="text-sm text-gray-600">Network</div>
              <div className="text-lg font-semibold">{service.usage.bandwidth} GB</div>
            </div>
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-600 rounded-full h-2" 
              style={{ width: "45%" }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold mb-4">24-Hour Performance</h3>
        <div className="h-[300px]">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default VPSMetrics;